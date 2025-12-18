const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const { User } = require("../models");

const verifyToken = async (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  if (!token.startsWith("Bearer ")) {
    return res.status(403).send({ message: "Invalid token format!" });
  }

  token = token.split(" ")[1];

  jwt.verify(token, config.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    req.userId = decoded.id;

    req.user = await User.findByPk(req.userId);

    if (!req.user) {
      return res.status(404).send({ message: "User not found!" });
    }

    next();
  });
};

module.exports = {
  verifyToken,
};
