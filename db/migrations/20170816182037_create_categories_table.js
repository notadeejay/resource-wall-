exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('categories', (table) => {
      table.increments().unsigned();
      table.string('name');
      })
    ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('categories', (table) => {
      table.dropTable('categories');
    })
  ]);
};
