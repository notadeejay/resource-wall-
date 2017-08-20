"use strict";

const express = require('express');
const router  = express.Router();
const request = require('request');
const bodyParser  = require("body-parser");

module.exports = (knex) => {

  router.post("/", function (req, res) {
    let categories;

      if (Array.isArray(req.body.category)) {
        categories = req.body.category
      } else {
        categories = []
        categories.push(req.body.category)
      }

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
              category_id: catid}
            return obj
          })
           knex('resource_categories')
          .insert (cat_resource)
          .returning(['resource_id'])
        .then((results) => {
          request(`https://api.linkpreview.net/?key=599620a6888eff2fedf501c8f8271e520e3301cc25605&q=${req.body.url}`
            , function (error, response, body) {
          let preview = JSON.parse(body)
          let imageURL = preview.image
          let image = ''
          let placeholderImage = "http://images.naldzgraphics.net/2015/09/8-flat-minimalist-icons.jpg"

          if (imageURL.match(/\.(jpeg|jpg|gif|png)$/) != null) {
            image = imageURL
          } else (
              image = placeholderImage
            )
            
          knex('resources')
          .where('id', results[0].resource_id)
          .update('image', image)
            .then((results) => {
              res.status(200).redirect('/resources')
            })
          });
        })
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
   let inputUpper = input.toUpperCase()
   console.log(inputUpper)
    knex.select("*")
      .from("resources")
      .whereRaw(`UPPER(title) LIKE '%${inputUpper}%'`)
      .orWhereRaw(`UPPER(description) LIKE '%${inputUpper}%'`)
      .orWhereRaw(`UPPER(url) LIKE '%${inputUpper}%'`)
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

router.delete("/:resid/:user", function (req,res) {
   knex.select("*")
  .from("resources")
  .where("id", req.params.resid)
  .andWhere("user_id", req.params.user)
  .del()
  .then((results) => {
    knex.select('*')
    .from("resources")
    .then((results) => {
      res.json(results)
    })

  });
});

return router

}
