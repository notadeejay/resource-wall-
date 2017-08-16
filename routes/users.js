"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

//ADD NEW USER TO DATABASE @ REGISTRATION
router.post("/", function (req, res) {
  let firstname = req.body.first_name
  let lastname = req.body.last_name
  let email = req.body.email
  let password = req.body.password
  let newUser = {
          first_name: firstname,
          last_name: lastname,
          email: email,
          password: password
      }

       knex('users')
      .insert(newUser)
      .returning(['id', 'first_name'])
      .then( (results) => {
        console.log(results);
        console.log(newUser)
        req.session.user = results[0];
        res.status(200).send(results[0]);
      })

  });

  return router;
}

