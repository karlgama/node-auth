const posts = require('./src/posts');
const usuarios = require('./src/usuarios');
const express = require('express')

module.exports = app => {
  app.use(express.json())
  app.use(usuarios)
  app.get('/', (req, res) => {res.send('Olá pessoa!')});
  
  // posts.rotas(app);
  // usuarios.rotas(app);
};