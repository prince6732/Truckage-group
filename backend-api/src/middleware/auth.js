const jwt = require("jsonwebtoken");
const config = require("../../config/authConfigSecret");
const { User } = require("../../models"); 


const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, config.secret, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Invalid or expired token." });
    }

    req.user = user; // JWT already contains tenantId
    next();
  });
};


const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided!" });
    }

    const decoded = jwt.verify(token, config.secret);

    if (!decoded || !decoded.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid token" });
    }

    const user = await User.findOne({
      where: { id: decoded.id },
      attributes: ["id", "role", "tenantId"],  
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found" });
    }

    // Add tenantId from JWT token for easier access
    req.user = {
      ...user.toJSON(),
      tenantId: decoded.tenantId || user.tenantId
    }; 
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  authenticateToken,
  authenticateUser,
};
