
exports.up = async function(knex) {  
  return knex.schema
    .createTable('infection_report', table => {
      table.increments('id').primary();
      
      table.integer('survivor_marked_id')
        .notNullable()
        .references('id')
        .inTable('survivors');  

      table.integer('reporter_id')
        .notNullable()
        .references('id')
        .inTable('survivors');      
  });
}

exports.down = async function(knex) {
  return knex.schema.dropTable('infection_report');
}