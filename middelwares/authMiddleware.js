const jwt = require("jsonwebtoken");
const { User } = require("../models");

require("dotenv").config();

const { SECRET_KEY } = process.env;

const authMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  if (!authorization) {
    next(new Error("Please, provide a token in request authorization header"));
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(new Error("Not authorized"));
  }
  try {
    const { _id } = jwt.decode(token, SECRET_KEY);

    const user = await User.findById(_id);

    if (!user || !user.token) {
      next(new Error("Not authorized2"));
    }
    req.user = user;

    next();
  } catch (error) {
    if (error.message === "Invalid Signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = authMiddleware;
