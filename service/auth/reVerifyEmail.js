const { User } = require("../../models");
const createError = require("http-errors");
const sendEmail = require("../sendgrid");

const reVerifyEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new createError.NotFound(`User with this email is not found`);
  }
  if (user.verify) {
    throw new createError.BadRequest(`Verification has already been passed`);
  }
  const mail = {
    to: email,
    subject: "Confirmation of the registration",
    html: `<a target=_blank href="http://localhost:3000/users/verify/${user.verificationToken}">Confirm your email</a>`,
  };

  await sendEmail(mail);

  return {
    status: "success",
    code: 200,
    message: "Verification email resent",
  };
};

module.exports = reVerifyEmail;
