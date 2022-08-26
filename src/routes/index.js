const express = require("express");
const usuarios = require("./usuarioRoute");

module.exports = (app) => {
  app.use(express.json());
  app.use(usuarios);
  
  app.get("/", (req, res) => {
    res.send("teste");
  });
};
