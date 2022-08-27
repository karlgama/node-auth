const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");
const passport = require("passport");
const middlewareAutenticacao = require("../middlewares/middlewares-autenticacao");
const router = Router();

router.get("/usuarios", UsuarioController.lista);
router.post("/usuarios", UsuarioController.adiciona);
router.delete("/usuarios/:id", UsuarioController.deleta);
router.post(
  "/usuarios/login",
  middlewareAutenticacao.local,
  UsuarioController.login
);

module.exports = router;
