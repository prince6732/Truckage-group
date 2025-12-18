const authController = require("../controllers/auth.controller");
const Router = require("express");
const authRouter = Router();

authRouter.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.post("/forgot-password", authController.forgotPassword);
authRouter.route("/reset-password/:token").post(authController.resetPassword);

module.exports = authRouter;
