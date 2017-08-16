exports.seed = function(knex, Promise) {
  return knex('resources').del()
    .then(()=> {
      return Promise.all([
        knex('resources').insert(
          {
            id: 1,
            title:  'Google Homepage',
            description: 'Dev Necessity',
            url:  'https://www.google.ca'}),
        knex('resources').insert(
          {
            id: 2,
            title:  'StackOverflow Homepage',
            description: 'Dev Homepage',
            url:  'https://www.stackoverflow.com'}),
        knex('resources').insert(
          {
            id: 3,
            title:  'Lighthouse Labs Homepage',
            description: 'Ultimate dev bootcamp',
            url:  'https://www.lighthouselabs.ca'})
        ]);
      });
};
