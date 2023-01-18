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
} = require("./auth");

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
};
