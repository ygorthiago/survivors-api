const db = require('../database/connection');

class SurvivorsController {
  async show (request, response) {
    const {id} = await request.query;
    const {name} = await request.query;
    
    const survivor = await db('survivors')
      .modify(function (qb) {
        if(id != undefined) {
          qb.where('id', id)
        } else if (name != undefined) {
          qb.where('name', name)
        }
      });
    
      if(survivor[0] === undefined || !survivor ) {
        return response.status(404).json({ message: 'Survivor not found' });
      } else {
        const survivorId = survivor[0].id;
    
        const inventory = await db('items')
          .select('items.id', 'items.name', 'items.points', 'inventory.qtd', 'items.image')
          .join('inventory', 'items.id', '=', 'inventory.item_id')
          .where('inventory.survivor_id', survivorId);
    
        return response.status(200).json({ survivor, inventory });

      }
    

  }

  async index (request, response) {
    const survivors = await db('survivors').select('*')
  
    return await response.status(200).json(survivors);
  }

  async put (request, response) {
    const {id} = request.params;

    const {
      latitude,
      longitude
     } = request.body;
     
    try {

    const newLocation = await db('survivors')
      .where('survivors.id', id)
      .update({
        last_location_latitude: latitude,
        last_location_longitude: longitude
      });
    
      return await response.status(200).json('location updated');

    } catch (error) {
      console.log(error)
    }
  }

  async create (request, response) {
    const { 
      name,
      age,
      gender,
      last_location_latitude,
      last_location_longitude,
      items
     } = request.body;

    const survivorAlreadyExists = await db('survivors')
      .whereRaw('LOWER(name) = ?', name.toLowerCase())
      .andWhere('age', age)
      .andWhere('gender', gender)
      .first();
  
    if (!survivorAlreadyExists) {
      const trx = await db.transaction();
    
      try {
        const survivor = {
          name,
          age,
          gender,
          last_location_latitude,
          last_location_longitude,
          infected: false
        }
    
        const insertedIds = await trx('survivors').insert(survivor);
      
        const survivor_id = insertedIds[0];
      
        const inventory = items.map(item => {
          return {
            survivor_id,
            item_id: item.item_id,
            qtd: item.qtd,
          };
        });
      
        await trx('inventory').insert(inventory);

        await trx.commit();
      
        return response.status(201).json({ 
          id: survivor_id,
          ...survivor,
          items
        });
        
      } catch (err) {
        await trx.rollback();

        return response.status(400).json({
          error: 'Unexpected error while adding a survivor.'
        });
      }
    } else {
      return response.status(208).json({
        message: 'Already exists an survivor with this datas'
      });
    }
    
  }
}

module.exports = SurvivorsController;