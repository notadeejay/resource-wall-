
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('resources').insert(
          {
            title: 'The Goog',
            description: 'Source of all knowledge',
            url: 'https://www.google.ca',
            user_id: 1,
            image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_white_background_color_272x92dp.png'
          }),
        knex('resources').insert(
          {
            title: 'Stack the knowledge',
            description: 'Only website a dev needs',
            url: 'https://www.stackoverflow.com',
            user_id: 2,
            image: 'https://cdn.sstatic.net/Sites/stackoverflow/img/apple-touch-icon@2.png?v=73d79a89bded'
          }),
        knex('resources').insert(
          {
            title: 'Dev Factory',
            description: 'Anyone can make a baby, it takes LHL to make a developer',
            url: 'https://www.lighthouselabs.ca',
            user_id: 3,
            image: 'https://www.lighthouselabs.ca/assets/home-1b1053e3e6e74130233e7e45af571c266e4bc17df186390ff707c05194f90.jpg'
          }),
        knex('resource_categories').insert(
          {
            resource_id: 1,
            category_id: 900
          }),
        knex('resource_categories').insert(
          {
            resource_id: 1,
            category_id: 901
          }),
        knex('resource_categories').insert(
          {
            resource_id: 1,
            category_id: 902
          }),
        knex('resource_categories').insert(
          {
            resource_id: 1,
            category_id: 903
          }),
        knex('resource_categories').insert(
          {
            resource_id: 2,
            category_id: 900
          }),
        knex('resource_categories').insert(
          {
            resource_id: 2,
            category_id: 902
          }),
        knex('resource_categories').insert({
            resource_id: 2,
            category_id: 900
          }),
        knex('resource_categories').insert({
            resource_id: 2,
            category_id: 902
          }),
        knex('comments').insert(
          {
            user_id: 1,
            resource_id: 1,
            comment: 'Bing is better... lol jk'
          }),
        knex('comments').insert(
          {
            user_id: 3,
            resource_id: 2,
            comment: 'This website deserves a shoutout on my resume'
          }),
          knex('comments').insert(
          {
            user_id: 2,
            resource_id: 2,
            comment: 'Best bootcamp in the biz'
          }),
        knex('likes').insert(
          {
            user_id: 2,
            resource_id: 2
          }),
        knex('likes').insert({
            user_id: 3,
            resource_id: 2
          }),
        knex('likes').insert(
          {
            user_id: 1,
            resource_id: 2
          }),
        knex('likes').insert(
          {
            user_id: 2,
            resource_id: 1
          }),
        knex('likes').insert(
          {
            user_id: 3,
            resource_id: 2
          })
      ]);
    });
};
