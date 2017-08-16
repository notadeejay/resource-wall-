"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

//ADD NEW USER TO DATABASE @ REGISTRATION
router.post("/", function (req, res) {

});


//LOGIN USER THAT IS ALREADY CREATED
router.post("/login", function (req,res){

});

//LOGOUT & CLEAR COOKIE
router.post("/logout", function (req,res) {

});

//UPDATE USER PROFILE
router.put("/:user_id", function (req,res) {

});

  return router;
}

