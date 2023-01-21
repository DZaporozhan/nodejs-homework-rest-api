require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: {
      email: "zaporozhanbiz@gmail.com",
    },
  };

  try {
    await sgMail.send(email);
    console.log("Email sent");
    return true;
  } catch (error) {
    throw new Error();
  }
};

module.exports = sendEmail;
