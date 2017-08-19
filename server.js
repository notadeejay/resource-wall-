"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const session = require('express-session')

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const resourceRoutes = require("./routes/resources")
const likeRoutes = require("./routes/likes")
const commentRoutes = require("./routes/comments")
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(knexLogger(knex));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

app.use(session({
  name: 'session',
  secret: 'latr'
}));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/resources", resourceRoutes(knex));
app.use("/api/likes", likeRoutes(knex));
app.use("/api/comments", commentRoutes(knex));


// Home page
app.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect("/resources")
  }
  let templateVars = {
    user: req.session.user
  }
  res.render("index", templateVars);
});

//
app.get("/resources", (req, res) => {
  if (req.session.user) {
  let templateVars = {
    user: req.session.user
  }
  res.render("resources", templateVars);
} else {
  res.status(401).redirect("/");
}
});

app.get("/myresources", (req, res) => {
  if (req.session.user) {
  let templateVars = {
    user: req.session.user
  }
  res.render("myResources", templateVars);
}else {
  res.status(401).redirect("/");
}
});

app.get("/new", (req, res) => {
  if (req.session.user) {
  let templateVars = {
    user: req.session.user
  }
  res.render("newResource", templateVars);
}else {
  res.status(401).redirect("/");
}
});

app.get("/profile", (req, res) => {
  if (req.session.user) {
    let templateVars = {
      user: req.session.user
    }
    res.render("profile", templateVars);
  } else {
  res.status(401).redirect("/");
}
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

