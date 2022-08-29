const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Usuario = require("./usuarios-modelo");
const { InvalidArgumentError } = require("../erros");
const bcrypt = require("bcrypt");
const BearerStrategy = require("passport-http-bearer").Strategy;
const jwt = require("jsonwebtoken");
const blacklist = require("../../redis/manipula-blacklist");

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
async function verificaTokenNaBlackList(token) {
  const tokenNaBlackList = await blacklist.contemToken(token);
  if (tokenNaBlackList)
    throw new jwt.JsonWebTokenError("token inválido");
}
passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      await verificaTokenNaBlackList(token)
      const payload = jwt.verify(token, `${process.env.SECRET_JWT}`);
      const usuario = await Usuario.buscaPorId(payload.id);
      done(null, usuario, { token: token });
    } catch (err) {
      done(err);
    }
  })
);
