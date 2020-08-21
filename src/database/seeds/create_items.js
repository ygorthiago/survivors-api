exports.seed = async function(knex) {
  await knex('items').insert([
    { name: 'Fiji Water', points: 14, image: 'https://trz-survivors.herokuapp.com/items/fiji_water.png' },
    { name: 'Campbell Soup', points: 12, image: 'https://trz-survivors.herokuapp.com/items/campbell_soup.png' },
    { name: 'First Aid Pouch', points: 10, image: 'https://trz-survivors.herokuapp.com/items/fist_aid_pouch.png' },
    { name: 'AK47', points: 8, image: 'https://trz-survivors.herokuapp.com/items/ak47.png' }
  ]);
};