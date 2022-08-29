const blacklist = require("./blacklist");
const { promisify } = require("util");
const existsAsync = promisify(blacklist.exists).bind(blacklist);
const setAsync = promisify(blacklist.set).bind(blacklist);

const jwt = require("jsonwebtoken");
const { createHash } = require("crypto");

function geraTokenHash(token) {
  return createHash("sha256").update(token).digest("hex");
}

module.exports = {
  adiciona: async (token) => {
    const dataExpiracao = jwt.decode(token).exp;
    const tokenHash = await geraTokenHash(token);
    await setAsync(tokenHash, "");
    blacklist.expireat(token, dataExpiracao);
  },
  contemToken: async (token) => {
    const tokenHash = geraTokenHash(token);
    const res = await existsAsync(tokenHash);
    return res === 1;
  },
};
