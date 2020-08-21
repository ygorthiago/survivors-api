
exports.up = async function(knex) {  
  return knex.schema
    .createTable('inventory', table => {
      table.increments('id').primary();
      
      table.integer('survivor_id')
        .notNullable()
        .references('id')
        .inTable('survivors');

      table.integer('item_id')
        .notNullable()
        .references('id')
        .inTable('items');
      
      table.integer('qtd');
  });

}

exports.down = async function(knex) {
  return knex.schema.dropTable('inventory');
}