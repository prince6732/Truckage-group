const { randomBytes } = require("node:crypto");
const forgotPasswordTemplate = require("../gmailTemplates/forgetPassword");
const transporter = require("../helpers/nodemailer");
const { PasswordReset } = require("../../models");
require("dotenv").config();

const sendForgetPasswordToken = async (email, frontendBaseUrl) => {
  const token = randomBytes(20).toString("hex");
  const expireDate = new Date(Date.now() + 86400000);

  await PasswordReset.create({
    email,
    token,
    created_at: new Date(),
    expires_at: expireDate,
  });

  const mailOptions = {
    from: process.env.username,
    to: email,
    subject: "Reset Password!",
    html: forgotPasswordTemplate(token, frontendBaseUrl),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Failed to send reset password email:", error);
    } else {
      console.log("Reset password link sent:", info.response);
    }
  });
};

module.exports = sendForgetPasswordToken;
