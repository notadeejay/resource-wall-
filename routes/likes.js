"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {


router.post("/:resID", function (req, res) {
  let liked = {
    resource_id: req.params.resID,
    user_id: req.session.user
  }
       knex("likes")
      .insert(liked)
      .then((results) => {
        res.json(results);
    });
 });

router.post('/:resid', function (req, res) {
       let liked = {
        user_id: req.session.user,
        resource_id: req.params.resid
       }

       knex ('likes')
      .insert(liked)
      .then((results) => {
        res.json(results);

    });
});

router.delete('/:resid', function (req, res) {

       knex ('likes')
      .where('user_id', req.session.user)
      .andWhere('resource_id', req.params.resid)
      .del()
      .then((results) => {
        res.status(204).end()
      })

    });

router.get("/favourite", function (req, res) {

      knex.select("*")
      .from("likes")
      .innerJoin("resources", "likes.resource_id", "resources.id")
      .where('likes.user_id', req.session.user)
      .then((results) => {
        res.json(results);
        console.log(results)
    });

 });

router.get("/top", function (req, res) {
// let query =`select *
//         from resources
//         join (select count(resource_id) as likes, resource_id
//         from likes group by resource_id)
//         as foo on id = resource_id order by likes desc limit 5`
      knex.raw("select * from resources join (select count(resource_id) as likes, resource_id from likes group by resource_id) as foo on id = resource_id order by likes desc limit 4")
      .then((results) => {
        res.json(results.rows);

     });
});

return router

}