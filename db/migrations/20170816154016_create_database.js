exports.up = function(knex, Promise) {
    return knex.schema.table('users', (table) => {
      table.dropColumn('name');
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.string('password');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', (table) => {
    table.dropColumns('first_name', 'last_name', 'email', 'password');
    table.string('name');
  });
};
