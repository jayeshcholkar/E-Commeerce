const nodemailer = require("nodemailer");

const sender = process.env.EMAIL;
const password = process.env.PASSWORD;

const sendMail = (userId, userEmail, token) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: sender,
      pass: password,
    },
  });

  var mailOptions = {
    from: sender,
    to: userEmail,
    subject: "Reset password link",
    text: "Reset password link",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`Error occur ${error.message}`);
    } else {
      console.log(`Email sent ${info.response}`);
    }
  });
};

module.exports = sendMail;
