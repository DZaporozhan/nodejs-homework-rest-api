const { User } = require("../../models/");
const gravatar = require("gravatar");

const registration = async (email, password) => {
  const user = await User.findOne({ email });

  if (user) {
    throw new Error("Email in use");
  }
  const avatarURL = gravatar.url(email);
  const newUser = new User({ email, password, avatarURL });
  await newUser.save();

  return {
    status: "201 Created",
    data: {
      user: {
        email: email,
        subscription: "starter",
      },
    },
  };
};

module.exports = registration;
