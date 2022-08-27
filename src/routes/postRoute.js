const { Router } = require("express");
const PostController = require("../controllers/PostController");
const passport = require("passport");

const router = Router();

router.get("/post", PostController.lista);
router.post(
  "/post",
  passport.authenticate("bearer", { session: false }),
  PostController.adiciona
);

module.exports = router;
