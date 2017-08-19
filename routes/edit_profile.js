"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (knex) => {

//EDIT USER PROFILE
  router.post("/profile/edit", function (req, res) {

    if (req.body.password != "") {
      if (req.body.password === req.body.password_confirmation) {
        let newpassword = req.body.password
      }
        else {
          alert(`Passwords do not match!`)
        }
      }

      const editUser = {
        first_name: req.body.first_name || undefined,
        last_name: req.body.last_name || undefined,
        email: req.body.email || undefined,
        password: req.body.password || undefined
      }

      knex('users')
        .where('id', req.session.user_id)
        .update(editUser)
        .then((result) => {
          res.status(200).redirect('/resources')
        })
    });

  // router.post("/login", function (req, res) {
  //   const emailReq = req.body.email
  //   const passwordReq = req.body.password
  //
  //    knex('users')
  //   .select('password', 'id')
  //   .where({'email' : emailReq})
  //   .then(function(result) {
  //     if (!result || !result[0])  {  // NOT FOUND!
  //       return;
  //     }
  //
  //     var pass = result[0].password;
  //     if (passwordReq == pass) {
  //      req.session.user = result[0].id
  //      res.status(200).redirect("/resources")
  //      console.log('Success')
  //     } else {
  //       console.log('Failed login')
  //     }
  //   })
  //   .catch(function(error) {
  //     console.log(error);
  //   });
  // })
  //
  // router.post("/logout", (req, res) => {
  //     req.session.destroy();
  //     res.status(201).redirect("/");
  // });


  return router;
}
