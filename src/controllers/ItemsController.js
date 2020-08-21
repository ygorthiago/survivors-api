const db = require('../database/connection');

class ItemsController {
  async index (request, response) {
    const items = await db('items').select('*');
  
    return response.json(items);
  }
}

module.exports = ItemsController;