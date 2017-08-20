exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('ratings').insert(
      {
        user_id: 900,
        resource_id: 900,
        rating: 5
      }),
    knex('ratings').insert(
      {
        user_id: 901,
        resource_id: 901,
        rating: 5
      }),
    knex('ratings').insert(
      {
        user_id: 902,
        resource_id: 902,
        rating: 5
      })
  ]);
};
