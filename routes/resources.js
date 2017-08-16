"use strict";

const express = require('express');
const router  = express.Router();



//ADD NEW RESOURCE TO DATABASE
router.post("/", function (req, res) {

let newResource = {
  title: req.body.title
  description: req.body.description
  url: req.body.url
}

});


//DELETE A RESOURCE
router.delete("/:resource_id", function (req,res){

});

//GET ALL THE RESOURCES FROM THE DATABASE
router.get("/resources", function (req,res) {

})

