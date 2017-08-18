"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (knex) => {

//ADD NEW USER TO DATABASE @ REGISTRATION
router.post("/register", function (req, res) {
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
      .then((result) => {
        req.session.user = result[0];
        res.status(200).redirect('/new')
      })

  });

router.post("/login", function (req, res) {
  const emailReq = req.body.email
  const passwordReq = req.body.password

   knex('users')
  .select('password', 'id')
  .where({'email' : emailReq})
  .then(function(result) {
    if (!result || !result[0])  {  // NOT FOUND!
      return;
    }
    console.log(result[0].id)
    var pass = result[0].password;
    if (passwordReq == pass) {
     req.session.user = result[0].id
     res.status(200).redirect("/resources")
     console.log('Success')
    } else {
      console.log('Failed login')
    }
  })
  .catch(function(error) {
    console.log(error);
  });
})

 router.post("/logout", (req, res) => {
    req.session.destroy();
    res.status(201).redirect("/");
  });


  return router;
}

