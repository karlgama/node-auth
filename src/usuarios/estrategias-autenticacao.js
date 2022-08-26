const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Usuario = require("./usuarios-modelo");
const { InvalidArgumentError } = require("../erros");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "senha",
      session: false,
    },
    async (email, senha, done) => {
      try {
        const usuario = await Usuario.buscaPorEmail(email);
        const senhaEValida = await bcrypt.compare(senha, usuario.senha);
        if (!usuario || !senhaEValida)
          throw new InvalidArgumentError("usuário não encontrado");
        done(null, usuario);
      } catch (err) {
        done(err);
      }
    }
  )
);
