const Router = require("express");
const authRouter = require("./auth.routes");
const stateRouter = require("./state.routes");
const citiesRouter = require("./cities.routes");
const subscriptionTypeRouter = require("./subscriptionType.routes");
const settingsRouter = require("./settings.routes");
const imageRouter = require("./image.routes");
const { verifyToken } = require("../middlewares/authJWT");

const router = Router();

router.use("/auth", authRouter);
router.use("/states", stateRouter);
router.use("/cities", citiesRouter);
router.use("/subscription-types", [verifyToken], subscriptionTypeRouter);
router.use("/settings", [verifyToken], settingsRouter);
router.use("/images", imageRouter);

module.exports = router;
