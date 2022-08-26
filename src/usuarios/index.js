// const UsuarioController = require("./usuarios-controlador");

// module.exports = (app) => app.use(UsuarioController);

module.exports = {
//   rotas: require('./usuarios-rotas'),
  controlador: require('../controllers/UsuarioController'),
  modelo: require('./usuarios-modelo'),
  estrategiasAutenticacao: require('./estrategias-autenticacao')
}
