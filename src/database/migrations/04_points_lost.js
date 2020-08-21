
exports.up = async function(knex) {  
  return knex.schema
    .createTable('points_lost', table => {
      table.increments('id').primary();

      table.integer('item_id')
      .notNullable()
      .references('id')
      .inTable('items');

      table.integer('total_points').notNullable();
  });

}

exports.down = async function(knex) {
  return knex.schema.dropTable('points_lost');
}