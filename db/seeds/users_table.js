exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(()=> {
      return Promise.all([
        knex('users').insert(
          {
            id          : 1,
            first_name  : 'Sean',
            last_name   : 'Quilty',
            email       : 'sean@email.com',
            password    : '123456'}),
        knex('users').insert(
          {
            id          : 2,
            first_name  : 'Amy',
            last_name   : 'Mansell',
            email       : 'amy@email.com',
            password    : '123456'}),
        knex('users').insert(
          {
            id          : 3,
            first_name  : 'Vadim',
            last_name   : 'Gavrish',
            email       : 'vadim@email.com',
            password    : '123456'})
      ]);
    });
};
