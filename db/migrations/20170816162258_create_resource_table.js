exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('resources', (table) => {
      table.increments().unsigned();
      table.string('title');
      table.string('description');
      table.string('url');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      })
    ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('resources', (table) => {
      table.dropTable('resources');
    })
  ]);
};
