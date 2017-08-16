exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('categories').insert(
      {
        id: 900,
        name: 'Technology'
      }),
    knex('categories').insert(
      {
        id: 901,
        name: 'Sports'
      }),
    knex('categories').insert(
      {
        id: 902,
        name: 'Arts'
      }),
    knex('categories').insert(
      {
        id: 903,
        name: 'Politics'
      })
  ]);
};
