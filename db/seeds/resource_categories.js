exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('resource_categories').insert(
      {
        resource_id: 901,
        category_id: 900
      }),
    knex('resource_categories').insert(
      {
        resource_id: 902,
        category_id: 900
      }),
    knex('resource_categories').insert(
      {
        resource_id: 900,
        category_id: 902
      })
  ]);
};
