const subscriptionUpdate = require("./subscriptionUpdate");
const updateAvatar = require("./updateAvatar");
const registration = require("./registration");
const login = require("./login");
const logout = require("./logout");
const verifyEmail = require("./verifyEmail");
const reVerifyEmail = require("./reVerifyEmail");

module.exports = {
  registration,
  login,
  logout,
  updateAvatar,
  subscriptionUpdate,
  verifyEmail,
  reVerifyEmail,
};
