const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");
const middlewareAutenticacao = require("../middlewares/middlewares-autenticacao");
const router = Router();

router.get("/usuarios", UsuarioController.lista);
router.post("/usuarios", UsuarioController.adiciona);
router.delete(
  "/usuarios/:id",
  middlewareAutenticacao.bearer,
  UsuarioController.deleta
);
router.post(
  "/usuarios/login",
  middlewareAutenticacao.local,
  UsuarioController.login
);
router.get(
  "/usuarios/logout",
  middlewareAutenticacao.bearer,
  UsuarioController.logout
);

module.exports = router;
