"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

router.get("/:resid", function (req, res) {
   knex.select('*')
   .from('comments')
   .where('resource_id', req.params.resid)
   .then((results) => {
      res.json(results)
   })

});

router.post("/:resid", function (req, res) {
  let comment = {
    user_id: req.session.user,
    resource_id: req.params.resid,
    comment: req.body.usercomment
  }

   knex('comments')
   .insert(comment)
   .then((results) => {
      knex.select('*')
      .from('comments')
      .where('resource_id', req.params.resid)
      .then((results) => {
        res.json(results)

     });
   });

});


return router

}