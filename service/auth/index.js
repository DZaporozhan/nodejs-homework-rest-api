const {
  registration,
  login,
  logout,

  subscriptionUpdate,
} = require("./auth");

const updateAvatar = require("./updateAvatar");

module.exports = {
  registration,
  login,
  logout,
  updateAvatar,
  subscriptionUpdate,
};
