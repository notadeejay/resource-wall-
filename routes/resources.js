"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {


  router.post("/", function (req, res) {
    let categories;

      if (Array.isArray(req.body.category)) {
        categories = req.body.category
      } else {
        categories = []
        categories.push(req.body.category)
      }
      console.log(categories)

    let newResource = {
      title: req.body.title,
      description: req.body.description,
      url: req.body.url,
      user_id: req.session.user
    }
       knex('resources')
      .insert(newResource)
      .returning('id')
      .then( (results) => {

        const cat_resource = categories.map(function(catid) {
          const obj = {
            resource_id: results[0],
            category_id: catid
          }
          return obj
        })
         console.log(cat_resource)
         knex('resource_categories')
        .insert (cat_resource)
        .then ( (results) => {
            res.status(200).redirect('/resources')
         })

      });

  });

router.get("/resources", function (req, res) {
  knex.select("*")
      .from("resources")
      // .innerJoin("likes", "resources.id", "likes.resource_id")
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

router.get("/:catid", function (req, res) {
   let catid = req.params.catid

    knex.select("*")
      .from("resources")
      .innerJoin("resource_categories", "resources.id", "resource_id")
      .innerJoin("categories", "resource_categories.category_id", "categories.id")
      .where('category_id', catid)
      .then((results) => {
        res.json(results);
    });
 });

return router

}


