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

return router

}