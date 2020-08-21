exports.seed = async function(knex) {
  await knex('items').insert([
    { name: 'Fiji Water', points: 14, image: 'http://192.168.0.62:3333/items/fiji_water.png' },
    { name: 'Campbell Soup', points: 12, image: 'http://192.168.0.62:3333/items/campbell_soup.png' },
    { name: 'First Aid Pouch', points: 10, image: 'http://192.168.0.62:3333/items/fist_aid_pouch.png' },
    { name: 'AK47', points: 8, image: 'http://192.168.0.62:3333/items/ak47.png' }
  ]);
};