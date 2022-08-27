const express = require("express");
const usuarios = require("./usuarioRoute");
const posts = require("./postRoute");

module.exports = (app) => {
  app.use(express.json());
  app.use(usuarios);
  app.use(posts);

  app.get("/", (req, res) => {
    res.send("teste");
  });
};
