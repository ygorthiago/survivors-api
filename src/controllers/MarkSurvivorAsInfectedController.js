const db = require('../database/connection');

class MarkSurvivorAsInfected {
  async create (request, response) {

    const {
      name, 
      reporterId     
     } = request.body;

    const survivorMarked = await db('survivors')
      .whereRaw('LOWER(name) = ?', name.toLowerCase())
      .first();    
     
    if(!survivorMarked) {
       return response.status(200).json({ message: 'Survivor not found' });
      } else {
        
        const verifyReporter = await db('infection_report')
          .where('reporter_id', reporterId)
          .andWhere('survivor_marked_id', survivorMarked.id)
          .first();    
        
        if(!verifyReporter) {
          const survivorMarkedId = survivorMarked.id;
  
          const infectionReportCounter = await db('infection_report')
            .count({ total: 'id' })
            .where('survivor_marked_id', survivorMarkedId)
            .first();
  
          if(infectionReportCounter.total < 1 || infectionReportCounter === undefined) {
         
            try {
              await db('infection_report').insert({
                survivor_marked_id: survivorMarkedId,
                reporter_id: reporterId
              });
              
              return response.status(201).json({
                message: `You've marked ${name} as infected`
              });
              
              } catch (error) {
              console.log(error)
    
              return response.status(400).json({
                error: 'Unexpeced error while marking this survivor as infected...'
              });
              }
            }
  
          if(infectionReportCounter.total === 1 ){
            try {
    
              
              const infectedInventory = await db('inventory')
              .where('inventory.survivor_id', survivorMarkedId);
              
              const reporterInventory = await db('inventory')
              .where('inventory.survivor_id', reporterId);
              
              await db('infection_report').insert({
                survivor_marked_id: survivorMarkedId,
                reporter_id: reporterId
              });
    
              await db('survivors')
                .where('survivors.id', survivorMarkedId)
                .update({
                  infected: true
                });
        

              infectedInventory.map(async (item) => {
                await db('inventory')
                  .where('inventory.survivor_id', reporterId)
                  .andWhere('inventory.item_id', item.item_id)
                  .update({
                    qtd: reporterInventory[item.item_id -1].qtd + item.qtd
                  });
              });

              const itemPoints = await db('items')
                .select('*');
        
              const totalPoints = await db('points_lost')
                .select('*');

              infectedInventory.map(async (item) => {
                await db('points_lost')
                  .where('points_lost.item_id', item.item_id)
                  .update({
                    total_points: totalPoints[item.item_id - 1].total_points + (itemPoints[item.item_id - 1].points * item.qtd) 
                  })
              });
    
              await db('inventory')
                .where('inventory.survivor_id', survivorMarkedId)
                .del()
      
              return response.status(202).json({
                message: `${name} are infected!`
              });
              
            } catch (error) {
              console.log(error)
    
              return response.status(400).json({
                error: 'Unexpeced error while marking this survivor as infected...'
              });
            }
          }
  
        if (infectionReportCounter >= 5) {
          return response.status(200).json({
            message: `${name} is infected!`
          });
        }

        } else {
            return response.status(208).json({message: `You already marked ${name} as infected`});
        }
  }  
}

}

module.exports = MarkSurvivorAsInfected;