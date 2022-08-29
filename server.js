const { estrategiasAutenticacao } = require("./src/usuarios");
const app = require("./app");
require('./redis/blacklist')
require('dotenv').config()

const port = 3000;

app.listen(port, () => {
  console.log(`servidor rodando na porta: ${port}`);
});

module.exports = app;
