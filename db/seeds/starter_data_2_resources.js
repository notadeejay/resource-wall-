
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('resources').insert(
          {
            title: 'Purpose of Life?',
            description: 'Thought provoking post',
            url: 'https://medium.com/personal-growth/the-purpose-of-life-isnt-to-be-happy-a2b2ff16de3c',
            user_id: 1,
            image: 'https://cdn-images-1.medium.com/max/1200/1*s70u5rGeX4xMnopIxZTDzA.jpeg'
          }),
        knex('resources').insert(
          {
            title: 'The Don!',
            description: 'What a beauty',
            url: 'http://www.sportsnet.ca/baseball/mlb/don-cherry-changes-lyrics-take-ball-game-wrigley/',
            user_id: 2,
            image: 'http://assets3.sportsnet.ca/wp-content/uploads/2017/08/cherry_don_cubs.jpg'
          }),
        knex('resources').insert(
          {
            title: 'Questions to ask about your startup',
            description: 'Decent suggestions regarding startup considerations',
            url: 'https://austinstartups.com/is-your-start-up-idea-gold-or-goop-40d86b3f009d',
            user_id: 3,
            image: 'https://cdn-images-1.medium.com/max/1200/1*N-6vdg-eP1w_5Femejg5pA.jpeg'
          }),
        knex('resources').insert(
          {
            title: 'AI & Small Biz',
            description: '',
            url: 'https://www.fastcompany.com/40405996/how-small-businesses-can-harness-the-power-of-ai',
            user_id: 1,
            image: 'https://assets.fastcompany.com/image/upload/w_1280,f_auto,q_auto,fl_lossy/wp-cms/uploads/2017/04/Salesforce-Poster.jpg'
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
