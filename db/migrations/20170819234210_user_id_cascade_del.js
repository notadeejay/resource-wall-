
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('comments', (table) => {
      table.dropForeign('user_id');
      table.foreign('user_id').references('users.id').onDelete('cascade').onUpdate('cascade');
    }),
    knex.schema.table('likes', (table) => {
      table.dropForeign('user_id');
      table.foreign('user_id').references('users.id').onDelete('cascade').onUpdate('cascade');
    }),
    knex.schema.table('ratings', (table) => {
      table.dropForeign('user_id');
      table.foreign('user_id').references('users.id').onDelete('cascade').onUpdate('cascade');
    }),
    knex.schema.table('resources', (table) => {
      table.dropForeign('user_id');
      table.foreign('user_id').references('users.id').onDelete('cascade').onUpdate('cascade');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('comments', (table) => {
      table.dropForeign('user_id');
      table.foreign('user_id').references('users.id');
    }),
    knex.schema.table('likes', (table) => {
      table.dropForeign('user_id');
      table.foreign('user_id').references('users.id');
    }),
    knex.schema.table('ratings', (table) => {
      table.dropForeign('user_id');
      table.foreign('user_id').references('users.id');
    })
  ]);
};
