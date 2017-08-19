"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (knex) => {

router.get("/", function(req, res) {
  knex.select("id")
  .from("users")
  .where("id", req.session.user)
  .then((result) => {
    res.json(result)
    console.log(result)
}).catch(function(error) {
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
  let lastname = req.body.last_name
  let email = req.body.email
  let password = bcrypt.hashSync(req.body.password, 10)

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
        req.session.user = result[0].id;
        res.status(200).redirect('/resources')
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
    var pass = result[0].password;
    if(bcrypt.compareSync(passwordReq, pass)){
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

  //EDIT USER PROFILE
    router.put("/edit", function (req, res) {

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
          .where('id', req.session.user)
          .update(editUser)
          .then((result) => {
            console.log(result)
            res.status(200).send()
          })
      });

  return router;
}
