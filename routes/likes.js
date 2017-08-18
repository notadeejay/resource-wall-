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


return router

}