exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('resource_categories', (table) => {
      table.integer('resource_id').unsigned();
      table.foreign('resource_id').references('resources.id');
      table.integer('category_id').unsigned();
      table.foreign('category_id').references('categories.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('resource_categories', (table) => {
      table.dropTable('resource_categories');
    })
  ]);
};
