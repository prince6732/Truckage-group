"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/auth.config");
const { User, PasswordReset } = require("../models");
const asyncHandler = require("../middlewares/asyncHandler");
const sendForgetPasswordToken = require("./helpers/forgetPassword");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Email & Password are required." });
  }

  const user = await User.findOne({
    where: { email },
    paranoid: true,
  });

  if (!user) {
    return res.status(404).send({ message: "User not found." });
  }

  if (!user.status) {
    return res.status(403).send({ message: "Your account is disabled." });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({ message: "Invalid password!" });
  }

  if (user.role !== "ADMIN") {
    return res.status(403).send({
      message: "You do not have permission to access this application.",
    });
  }

  const token = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: "24h",
    algorithm: "HS256",
  });

  return res.status(200).send({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken: token,
  });
});

const logout = asyncHandler(async (req, res) => {
  req.session = null;

  return res.status(200).send({ message: "You've been logged out!" });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user)
    return res.status(400).send({
      message: "User not found! Please enter a valid email address.",
    });

  const existingToken = await PasswordReset.findOne({ where: { email } });
  const now = new Date();

  if (existingToken) {
    const tokenCreatedAt = new Date(existingToken.created_at);
    const timeDiffMinutes = Math.floor((now - tokenCreatedAt) / (1000 * 60));
    const remainingMinutes = 10 - timeDiffMinutes;

    if (remainingMinutes > 0) {
      return res.status(429).send({
        message: `Please wait ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''} before requesting a new password reset link.`,
        remainingMinutes: remainingMinutes,
        canRequestAt: new Date(tokenCreatedAt.getTime() + 10 * 60 * 1000).toISOString(),
      });
    } else {
      await PasswordReset.destroy({ where: { email } });
    }
  }

  const frontendBaseUrl =
    req.headers.origin || process.env.FRONTEND_URL || "http://localhost:4200";
  await sendForgetPasswordToken(email, frontendBaseUrl);
  
  res.status(200).json({
    message: "Reset password link has been sent to your email address.",
    expiresIn: 24, 
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  console.log("token", token);

  const resetToken = await PasswordReset.findOne({ where: { token } });

  if (!resetToken || new Date(resetToken.expires_at) < new Date()) {
    return res.status(400).json({ message: "Invalid or expired token!" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match!" });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  const user = await User.findOne({ where: { email: resetToken.email } });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  await User.update(
    { password: hashedPassword },
    { where: { email: resetToken.email } }
  );

  await PasswordReset.destroy({ where: { token } });

  return res.status(200).json({
    message: "Password updated successfully. Redirecting to home page!",
  });
});

module.exports = {
  login,
  logout,
  forgotPassword,
  resetPassword,
};
