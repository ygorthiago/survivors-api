exports.seed = async function(knex) {
  await knex('points_lost').insert([
    { item_id: 1, total_points: 0 },
    { item_id: 2, total_points: 0 },
    { item_id: 3, total_points: 0 },
    { item_id: 4, total_points: 0 }
  ]);
};