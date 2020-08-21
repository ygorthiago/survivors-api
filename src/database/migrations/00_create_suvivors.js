
exports.up = async function(knex) {  
  return knex.schema
    .createTable('survivors', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('age').notNullable();
      table.string('gender').notNullable();
      table.decimal('last_location_latitude').notNullable();
      table.decimal('last_location_longitude').notNullable();
      table.boolean('infected').notNullable();
  });

}

exports.down = async function(knex) {
  return knex.schema.dropTable('suvivors');
}