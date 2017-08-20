exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('comments', (table) => {
      table.dropForeign('resource_id');
      table.foreign('resource_id').references('resources.id').onDelete('cascade');
    }),
    knex.schema.table('likes', (table) => {
      table.dropForeign('resource_id');
      table.foreign('resource_id').references('resources.id').onDelete('cascade');
    }),
    knex.schema.table('ratings', (table) => {
      table.dropForeign('resource_id');
      table.foreign('resource_id').references('resources.id').onDelete('cascade');
    }),
    knex.schema.table('resource_categories', (table) => {
      table.dropForeign('resource_id');
      table.foreign('resource_id').references('resources.id').onDelete('cascade');
    }),
    knex.schema.table('resources', (table) => {
      table.string('image');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('comments', (table) => {
      table.dropForeign('resource_id');
      table.foreign('resource_id').references('resources.id');
    }),
    knex.schema.table('likes', (table) => {
      table.dropForeign('resource_id');
      table.foreign('resource_id').references('resources.id');
    }),
    knex.schema.table('ratings', (table) => {
      table.dropForeign('resource_id');
      table.foreign('resource_id').references('resources.id');
    }),
    knex.schema.table('resource_categories', (table) => {
      table.dropForeign('resource_id');
      table.foreign('resource_id').references('resources.id');
    }),
    knex.schema.table('resources', (table) => {
      table.dropColumn('image');
    })
  ]);
};
