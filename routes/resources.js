"use strict";

const express = require('express');
const router  = express.Router();
const db = require('../lib/util/queries.js');

module.exports = (knex) => {

//GET ALL RESOURCES
router.get("/resources", (req, res) => {
     knex
      .select("*")
      .from("resources")
      .then((results) => {
        res.json(results);
    });
  });

  //ADD NEW RESOURCE TO DATABASE
  router.post("/", function (req, res) {
   knex.addNewResource({
      title: req.body.title
      description: req.body.description
      url: req.body.url
      user_id: req.session.id
    }, () => {
      res.redirect('/resources');
  });

  //DELETE A RESOURCE
  router.delete("/:resource_id", function (req,res){

  });

  //GET ALL RESOURCES FOR USER
  router.get("/resources", function (req,res) {
    let user = req.session.user.id

    knex.getAllResourcesForUser(user, (urls) => {
        res.render('myresources', {
          urls: urls
        });
    });
  });

 //LIKE A RESOURCE
  router.post("/:resource_id/like", function (req, res) {
   let resourceID = req.params.resource_id
   let userID = req.session.id
    knex.addLikes(resourceID, userID, (likes) => {
      res.render('resources', {likes: likes
      });
    })

  })

  //UNLIKE A RESOURCE
  router.delete("/", (req, res) => {

    knex.removeLike(req, (likes) => {

    }
  })

return router

}


