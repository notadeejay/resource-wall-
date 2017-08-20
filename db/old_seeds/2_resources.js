exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('resources').insert(
      {
        id: 900,
        title:  'Google Homepage',
        description: 'Dev Necessity',
        url:  'https://www.google.ca',
        user_id: 900
      }),
    knex('resources').insert(
      {
        id: 901,
        title:  'StackOverflow Homepage',
        description: 'Dev Homepage',
        url:  'https://www.stackoverflow.com',
        user_id: 901
      }),
    knex('resources').insert(
      {
        id: 902,
        title:  'Lighthouse Labs Homepage',
        description: 'Ultimate dev bootcamp',
        url:  'https://www.lighthouselabs.ca',
        user_id:902
      })
    ]);
};
