"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (knex) => {

//ADD NEW USER TO DATABASE @ REGISTRATION
router.post("/", function (req, res) {
  let firstname = req.body.first_name
  let lastname = req.body.last_name
  let email = req.body.email
  let password = bcrypt.hashSync(req.body.password, 10);

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
        req.session.user = results[0];
        res.status(200).redirect('/new')
      })

  });

  return router;
}

