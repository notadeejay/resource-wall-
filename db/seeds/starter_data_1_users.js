
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
  .then(function () {
    return Promise.all([
      // Inserts seed entries
      knex('users').insert(
        {
          first_name: 'Sean',
          last_name: 'Quilty',
          email: 'sean@wallit.com',
          password: '123'
        }),
      knex('users').insert(
        {
          first_name: 'Amy',
          last_name: 'Mansell',
          email: 'amy@wallit.com',
          password: '123'
        }),
      knex('users').insert(
        {
          first_name: 'Vadim',
          last_name: 'Gavrish',
          email: 'vadim@wallit.com',
          password: '123'
        })
      ])
    })
};
