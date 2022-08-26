const usuariosControlador = require("./usuarios-controlador");
const { Router } = require("express");
const passport = require("passport");

// const router = Router();

// router.get("/usuarios", usuariosControlador.lista);
// router.post("/usuarios", usuariosControlador.adiciona);
// router.delete("/usuarios/:id", usuariosControlador.deleta);
// router.post("usuarios/login", usuariosControlador.login);
module.exports = (app) => {
  app
    .route("/usuario/login")
    .post(
      passport.authenticate("local", { session: false }),
      usuariosControlador.login
    );

  app
    .route("/usuario")
    .post(usuariosControlador.adiciona)
    .get(usuariosControlador.lista);

  app.route("/usuario/:id").delete(usuariosControlador.deleta);
};

// module.exports = router;
