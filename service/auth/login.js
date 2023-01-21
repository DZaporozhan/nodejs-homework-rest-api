const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/");
require("dotenv").config();

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Email is wrong");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error("Password is wrong");
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

  return token;
};

module.exports = login;
