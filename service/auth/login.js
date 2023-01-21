const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/");
require("dotenv").config();
const createError = require("http-errors");

const login = async (email, password) => {
  const user = await User.findOne({ email });
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!user) {
    throw new createError.Unauthorized("Email is wrong");
  }
  if (!checkPassword) {
    throw new createError.Unauthorized("Password is wrong");
  }
  if (!user.verify) {
    throw new createError.Unauthorized("Email is not verify");
  }

  const token = jwt.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    process.env.SECRET_KEY
  );

  const id = user._id;

  await User.findByIdAndUpdate(id, { token });

  return {
    token,
    user: {
      email,
    },
  };
};

module.exports = login;
