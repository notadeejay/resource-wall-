
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('comments'),
    knex.schema.dropTable('likes'),
    knex.schema.dropTable('ratings'),
    knex.schema.dropTable('resource_categories'),
    knex.schema.dropTable('resources'),
    knex.schema.dropTable('users')
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('comments'),
    knex.schema.createTable('likes'),
    knex.schema.createTable('ratings'),
    knex.schema.createTable('resource_categories'),
    knex.schema.createTable('resources'),
    knex.schema.createTable('uesrs')
  ]);
};
