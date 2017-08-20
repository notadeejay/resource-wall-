exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments().unsigned();
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.string('password');
    }),
    knex.schema.createTable('resources', (table) => {
      table.increments().unsigned();
      table.string('title');
      table.string('description');
      table.string('url');
      table.string('image');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id').onDelete('cascade').onUpdate('cascade');
    }),
    knex.schema.createTable('likes', (table) => {
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id').onDelete('cascade').onUpdate('cascade');
      table.integer('resource_id').unsigned();
      table.foreign('resource_id').references('resources.id').onDelete('cascade').onUpdate('cascade');
    }),
    knex.schema.createTable('ratings', (table) => {
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id').onDelete('cascade').onUpdate('cascade');
      table.integer('resource_id').unsigned();
      table.foreign('resource_id').references('resources.id').onDelete('cascade').onUpdate('cascade');
      table.integer('rating').unsigned();
    }),
    knex.schema.createTable('comments', (table) => {
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id').onDelete('cascade').onUpdate('cascade');
      table.integer('resource_id').unsigned();
      table.foreign('resource_id').references('resources.id').onDelete('cascade').onUpdate('cascade');
      table.string('comment');
    }),
    knex.schema.createTable('resource_categories', (table) => {
      table.integer('resource_id').unsigned();
      table.foreign('resource_id').references('resources.id').onDelete('cascade').onUpdate('cascade');
      table.integer('category_id').unsigned();
      table.foreign('category_id').references('categories.id').onDelete('cascade').onUpdate('cascade');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('resource_categories'),
    knex.schema.dropTable('comments'),
    knex.schema.dropTable('ratings'),
    knex.schema.dropTable('likes'),
    knex.schema.dropTable('resources'),
    knex.schema.dropTable('users')
  ]);
};
