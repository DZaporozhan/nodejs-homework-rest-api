const jwt = require("jsonwebtoken");
const { User } = require("../../models/");

const logout = async (authorization) => {
  const [, token] = authorization.split(" ");

  const user = jwt.decode(token, process.env.SECRET_KEY);
  const { _id } = user;

  await User.findByIdAndUpdate({ _id }, { token: null });

  return token;
};

module.exports = logout;
