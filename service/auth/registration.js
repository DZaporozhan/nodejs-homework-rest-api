const { User } = require("../../models/");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const sendEmail = require("../sendgrid");
const registration = async (email, password, subscription) => {
  const user = await User.findOne({ email });

  if (user) {
    throw new Error("Email in use");
  }
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();
  const newUser = new User({
    email,
    password,
    avatarURL,
    verificationToken,
    subscription,
  });
  await newUser.save();
  const mail = {
    to: email,
    subject: "Confirmation of the registration",
    html: `<a target=_blank href="http://localhost:3000/users/verify/${verificationToken}">Confirm your email</a>`,
  };
  await sendEmail(mail);

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
