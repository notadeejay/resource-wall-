"use strict";

const express = require('express');
const router  = express.Router();
const db = require('../lib/util/queries.js');

module.exports = (knex) => {

//ADD NEW USER TO DATABASE @ REGISTRATION
router.post("/", function (req, res) {
  let firstname = req.body.firstname
  let lastname = req.body.last.name
  let email = req.body.email
  let password = bcrypt.hashSync(req.body.password, 10)

  knex.addNewUser({
          first_name: firstname,
          last_name: lastname,
          email: email,
          password: password
      }, () => {
      res.redirect('/resources');
  });



//LOGIN USER THAT IS ALREADY CREATED
// router.post("/login", function (req,res){
//   let email = req.body.email
//   let password = req.body.password

// });

//LOGOUT & CLEAR COOKIE
// router.post("/logout", (req, res) => {
// //LOGOUT & REDIRECT
//   req.session = null;
//   res.status(201).send();
// });

//UPDATE USER PROFILE

router.post('/:id', (req, res) => {
 let user = req.params.id

 knex.updateProfile(user, req, () => {
      response.redirect('/myresources');
    });
});

  return router;
}

