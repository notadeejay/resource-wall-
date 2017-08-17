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
        res.status(200).send()
      })

  });


return router

}


