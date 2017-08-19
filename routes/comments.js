"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

router.get("/:resid", function (req, res) {

console.log(req.params.resid)
   knex.select('*')
   .from('comments')
   .where('resource_id', req.params.resid)
   .then((results) => {
      res.json(results)
   })

});


return router

}