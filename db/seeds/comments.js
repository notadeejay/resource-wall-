exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('comments').insert(
      {
        user_id: 900,
        resource_id: 901,
        comment: 'What a wonderful resource.'
      }),
    knex('comments').insert(
      {
        user_id: 901,
        resource_id: 902,
        comment: 'Best resource ever? Probably.'
      }),
    knex('comments').insert(
      {
        user_id: 902,
        resource_id: 900,
        comment: 'Not bad.'
      })
  ]);
};
