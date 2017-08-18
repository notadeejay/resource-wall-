"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

router.post('/:resource_id/likes', function (req, res) {
       let liked = {
        user_id: req.session.user
        resource_id: req.params.resource_id
       }

       knex ('likes')
      .insert(liked)
      .then((results) => {
        res.json(results);

    });


return router

}