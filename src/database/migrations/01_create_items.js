
exports.up = async function(knex) {  
  return knex.schema
    .createTable('items', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('points').notNullable();
      table.string('image').notNullable();
  });

}

exports.down = async function(knex) {
  return knex.schema.dropTable('items');
}