"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {


  router.post("/", function (req, res) {

    let newResource = {
      title: req.body.title,
      description: req.body.description,
      url: req.body.url,
      user_id: req.session.user
    }
       knex('resources')
      .insert(newResource)
      .then( (results) => {
       res.status(200).redirect('/resources')
      });

  });

router.get("/resources", function (req, res) {
  knex.select("*")
      .from("resources")
      .then((results) => {
        res.json(results);

    });
 });

router.get("/search", function (req, res) {
   let input = req.query.userinput

    knex.select("*")
      .from("resources")
      .where('title', 'like', '%'+ input+ '%')
      .orWhere('description', 'like', '%'+ input+ '%')
      .orWhere('url', 'like', '%'+ input+ '%')
      .then((results) => {
        res.json(results);
        console.log(results)
    });
 });

router.get("/myresources", function (req, res) {

    knex.select("*")
      .from("resources")
      .where('user_id', req.session.user)
      .then((results) => {
        res.json(results);
    });

 });


return router

}


