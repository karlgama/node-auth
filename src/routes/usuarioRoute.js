const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");

const router = Router();

router.get("/usuarios", UsuarioController.lista);
router.post("/usuarios", UsuarioController.adiciona);
router.delete("/usuarios/:id", UsuarioController.deleta);
router.post("/usuarios/login", UsuarioController.login);

module.exports = router;