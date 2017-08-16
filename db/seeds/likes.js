exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('likes').insert(
      {
        user_id: 900,
        resource_id: 900
      }),
    knex('likes').insert(
      {
        user_id: 901,
        resource_id: 901
      }),
    knex('likes').insert(
      {
        user_id: 902,
        resource_id: 902
      })
  ]);
};
