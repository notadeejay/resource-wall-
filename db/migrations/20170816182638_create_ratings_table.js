exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('ratings', (table) => {
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.integer('resource_id').unsigned();
      table.foreign('resource_id').references('resources.id');
      table.integer('rating').unsigned();
    })
  ]);

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('ratings', (table) => {
      table.dropTable('ratings');
    })
  ]);
};
