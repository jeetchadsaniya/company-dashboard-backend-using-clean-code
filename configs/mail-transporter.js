const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.EMAIL_ID}`,
      pass: `${process.env.EMAIL_PASS}`,
    },
  });

  module.exports = transporter;