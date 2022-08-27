// require("dotenv").config();

// const app = require("./app");
// const port = 3000;
// const db = require("./database");
// const routes = require("./rotas");

// routes(app);

// app.listen(port, () => console.log(`App listening on port ${port}`));

const express = require('express')
const routes = require('./src/routes')
const { estrategiasAutenticacao } = require("./src/usuarios");
const app = express();

app.use(express.json());

const port = 3000;

routes(app)

app.listen(port, () => {
  console.log(`servidor rodando na porta: ${port}`);
});

module.exports = app