const nodemailer = require("nodemailer");
const { sendCredentials } = require("../config/config");
const credentials = sendCredentials();

const transport = nodemailer.createTransport({
  service: "Outlook365",
  auth: {
    user: credentials.userEmail,
    pass: credentials.userPass,
  },
  tls: {
    ciphers: "SSLv3",
  },
});

const sendEmail = (mailOptions) => {
  transport.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log(info);
  });
};

module.exports = {
  sendEmail,
};
