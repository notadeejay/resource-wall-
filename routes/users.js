"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (knex) => {


 //GET CURRENT USER
  router.get("/", function(req, res) {
    knex.select("id", "first_name")
    .from("users")
    .where("id", req.session.user)
    .then((result) => {
      res.json(result)
   }).catch((error) => {

      console.log(error);

     });

  });


  //ADD NEW USER TO DATABASE @ REGISTRATION
  router.post("/register", function (req, res) {

    if (!req.body.first_name || !req.body.last_name) {
      return res.status(400).send(`You must provide a first and last name.`)}
    if (!req.body.email) {
      return res.status(400).send(`You must provide an email address.`)}
    if (!req.body.password) {
      return res.status(400).send(`You must create a password.`)}
    if (req.body.password != req.body.password_confirmation) {
      return res.status(400).send(`Passwords do not match.`)}

    let firstname = req.body.first_name
    let lastname  = req.body.last_name
    let email     = req.body.email
    let password  = bcrypt.hashSync(req.body.password, 10)

    let newUser = {
            first_name: firstname,
            last_name:  lastname,
            email:      email,
            password:   password
          }

     knex('users')
    .insert(newUser)
    .returning(['id', 'first_name'])
    .then((result) => {

      req.session.user = result[0].id;
      req.session.name = result[0].first_name
      res.status(200).redirect('/resources')

    }).catch((error) =>{

      console.log(error);
     });

});


//LOGIN
  router.post("/login", function (req, res) {
    let emailReq = req.body.email
    let passwordReq = req.body.password

    if(!emailReq || !passwordReq) {
      res.status(403).send(`Must enter valid username and password`)
    }

       knex('users')
      .select('password', 'id', 'first_name')
      .where({'email' : emailReq})
      .then(function(result) {

        //CHECK IF USER EXISTS
        if (!result || !result[0])  {
          res.status(404).send(`User not found`)
        }

        //COMPARE PASSWORDS
        if(bcrypt.compareSync(passwordReq, result[0].password)){
           req.session.user = result[0].id
           req.session.name = result[0].name
           res.status(200).redirect('/resources')

        } else {

          res.status(401).send(`Unauthorized`)

        }
      }).catch((error) => {

      console.log(error);

    });

  })




  //LOGOUT
  router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });




  //EDIT USER PROFILE
  router.put("/edit", function (req, res) {
    let newpassword;
    if (req.body.password != "") {
      if (req.body.password === req.body.password_confirmation) {
        newpassword = bcrypt.hashSync(req.body.password, 10)
      } else {
        res.status(400).send(`Passwords do not match`)
      }
    }


    const editUser = {
      first_name: req.body.first_name || undefined,
      last_name:  req.body.last_name || undefined,
      email:      req.body.email || undefined,
      password:   newpassword || undefined
    }


       knex('users')
      .where('id', req.session.user)
      .update(editUser)
      .returning(['first_name'])
      .then((result) => {
        res.status(200).send()

      }).catch((error) => {
        console.log(error);

      });
  });

  return router;
}
