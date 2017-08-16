"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // router.get("/", (req, res) => {
  //   knex
  //     .select("*")
  //     .from("users")
  //     .then((results) => {
  //       res.json(results);
  //   });
  // });

//ADD NEW USER TO DATABASE @ REGISTRATION
router.post("/", function (req, res) {
  let firstname = req.body.firstname
  let lastname = req.body.last.name
  let email = req.body.email
  let password = bcrypt.hashSync(req.body.password, 10)

  database.addNewUser({
        first_name: firstname,
        last_name: lastname,
        email: email,
        password: password
    }, () => {
        response.redirect('/resources');
      });
  });



//LOGIN USER THAT IS ALREADY CREATED
router.post("/login", function (req,res){
  let email = req.body.email
  let password = req.body.password


});

//LOGOUT & CLEAR COOKIE
router.post("/logout", (req, res) => {
    //LOGOUT & REDIRECT
    req.session = null;
    res.status(201).send();
  });

//UPDATE USER PROFILE
router.put("/:user_id", function (req,res) {

});

  return router;
}

