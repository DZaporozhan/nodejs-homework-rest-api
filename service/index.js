const {
  getAllContactsService,
  getContactByIdService,
  createContactService,
  updateContactService,
  removeContactService,
  changeFavoriteStatusService,
} = require("./contacts");

const {
  registration,
  login,
  logout,
  updateAvatar,
  subscriptionUpdate,
  verifyEmail,
} = require("./auth");

const sendEmail = require("./sendgrid");

module.exports = {
  getAllContactsService,
  getContactByIdService,
  createContactService,
  updateContactService,
  removeContactService,
  changeFavoriteStatusService,
  registration,
  login,
  logout,
  updateAvatar,
  subscriptionUpdate,
  verifyEmail,
  sendEmail,
};
