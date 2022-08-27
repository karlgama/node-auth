const { estrategiasAutenticacao } = require("./src/usuarios");
const app = require("./app");

const port = 3000;

app.listen(port, () => {
  console.log(`servidor rodando na porta: ${port}`);
});

module.exports = app;
