const Usuario = require("../usuarios/usuarios-modelo");
const { InvalidArgumentError, InternalServerError } = require("../erros");
const jwt = require("jsonwebtoken");
const blacklist = require("../../redis/manipula-blacklist");

class UsuarioController {
  static async criaToken(usuario) {
    const payload = {
      id: usuario.id,
    };

    const token = jwt.sign(payload, `${process.env.SECRET_JWT}`, {
      expiresIn: "15m",
    });
    return token;
  }

  static async adiciona(req, res) {
    const { nome, email, senha } = req.body;

    try {
      const usuario = new Usuario({
        nome,
        email,
      });

      await usuario.adicionaSenha(senha);
      await usuario.adiciona();

      res.status(201).json();
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

  static async login(req, res) {
    const user = req.body;
    const token = await UsuarioController.criaToken(user);
    res.set("Authorization", token);
    res.status(204).send();
  }

  static async logout(req, res) {
    try {
      const token = req.token;
      await blacklist.adiciona(token);
      res.status(204).send({ message: "logout realizado com sucesso" });
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }

  static async lista(req, res) {
    const usuarios = await Usuario.lista();
    res.json(usuarios);
  }

  static async deleta(req, res) {
    const usuario = await Usuario.buscaPorId(req.params.id);
    try {
      await usuario.deleta();
      res.status(200).send();
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  }
}

module.exports = UsuarioController;
