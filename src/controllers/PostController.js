const Post = require("../posts/posts-modelo");
const { InvalidArgumentError, InternalServerError } = require("../erros");

class PostController {
  static async adiciona(req, res) {
    try {
      const post = new Post(req.body);
      await post.adiciona();

      res.status(201).send(post);
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        res.status(422).json({ erro: erro.message });
      } else if (erro instanceof InternalServerError) {
        res.status(500).json({ erro: erro.message });
      } else {
        res.status(500).json({ erro: erro.message });
      }
    }
  }

  static async lista(req, res) {
    try {
      const posts = await Post.lista();
      res.send(posts);
    } catch (erro) {
      return res.status(500).json({ erro: erro });
    }
  }
}

module.exports = PostController;
