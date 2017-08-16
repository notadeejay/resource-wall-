"use strict"


module.exports = {
  getAllResources: (done) => {
    knex.select(*).from("resources")
    .then((results) => {
        res.json(results);
    });
  },

  addNewResource: (resource) => {
    knex('resources')
      .insert(resource)
      .then( (results) => {
        res.status(200).send()
      })

  }

  addNewUser: (user) => {
    knex('users')
      .insert(user)
      .returning(['id', 'first_name'])
      .then( (results) => {
        console.log(results);
        console.log(user)
        req.session.user = results[0];
        res.status(200).send(results[0]);
      })
  },

  deleteUser: (userid) => {
    knex('users')
    .where('id', userid)
    .delete()
    .then((results) => {
        console.log(results);
  })
},

  updateProfile: (user, req, done) => {
    knex("users")
    .where({'id', user})
    .update({
      firstname: req.body.firstname,
      lastname: req.body.last.name,
      email: req.body.email
      password: bcrypt.hashSync(req.body.password, 10)
    })
    .then( (result) => {
      res.json(result);
    });
  },

}
