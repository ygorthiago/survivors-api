const db = require('../database/connection');

class ReportsController {
  async index (request, response) {
    const totalSurvivors = await db('survivors')
            .count({ total: 'id' })
            .first();

    const totalSurvivorsInfected = await db('survivors')
      .count({ total: 'id' })
      .where('infected', 1)
      .first();
          
        
    const nonInfecteds = `${(1 - (totalSurvivorsInfected.total/totalSurvivors.total)).toFixed(2)}%`;
    const percentageNonInfectedSurvivors = nonInfecteds.replace('0.', '');

    const nonInfectedSurvivors = {
      description: "Percentage of non-infected survivors",
      percentage: percentageNonInfectedSurvivors
    }
    
    const infecteds = `${(totalSurvivorsInfected.total/totalSurvivors.total).toFixed(2)}%`;
    const percentageInfectedSurvivors = infecteds.replace('0.', '');

    const infectedSurvivors = {
      description: "Percentage of infected survivors",
      percentage: percentageInfectedSurvivors
    }

    const queryAvgFijiWaters = await db('inventory')
      .avg('qtd as average')
      .where('item_id', 1)
      .first();

    const averageFijiWaters = parseFloat(queryAvgFijiWaters.average).toFixed(2);

    const queryAvgCampbellSoap = await db('inventory')
      .avg('qtd as average')
      .where('item_id', 2)
      .first();

    const averageCampbellSoap = parseFloat(queryAvgCampbellSoap.average).toFixed(2);
    
    const queryAvgFistAidPouch = await db('inventory')
      .avg('qtd as average')
      .where('item_id', 3)
      .first();

    const averageFistAidPouch = parseFloat(queryAvgFistAidPouch.average).toFixed(2);

    const queryAvgAK47 = await db('inventory')
    .avg('qtd as average')
    .where('item_id', 4)
    .first();

    const averageAK47 = parseFloat(queryAvgAK47.average).toFixed(2);

    const averageItemsPerSurvivor = {
      description: 'Average of the quantity of items per survivor and of each item',
      items: {
        fijiWater: averageFijiWaters,
        campbellSoup: averageCampbellSoap,
        fistAidPouch: averageFistAidPouch,
        AK47: averageAK47
      }
    }

    const pointsLostTable = await db('points_lost');
    const itemsTable =  await db('items');

    var pointsPerItem = [];

    pointsLostTable.map((item, index) => {
      
      pointsPerItem.push({
        name: itemsTable[index].name,
        points_lost: item.total_points
      })
    })


    const totalPointsLost = await db('points_lost')
      .sum('total_points as total_points_lost')
      .first();
        
    
    const pointsLost = {
      description: 'Points lost in items when an survivor are infected',
      items: pointsPerItem,
      total: totalPointsLost,      
    }

    return await response.status(200).json({nonInfectedSurvivors, infectedSurvivors, averageItemsPerSurvivor, pointsLost});
  }
}

module.exports = ReportsController;