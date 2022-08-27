const { Router } = require("express");
const PostController = require("../controllers/PostController");
const middlewareAutenticacao = require('../middlewares/middlewares-autenticacao')

const router = Router();

router.get("/post", PostController.lista);
router.post(
  "/post",
  middlewareAutenticacao.bearer,
  PostController.adiciona
);

module.exports = router;
