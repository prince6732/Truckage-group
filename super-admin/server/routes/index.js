const Router = require("express");
const authRouter = require("./auth.routes");
const stateRouter = require("./state.routes");
const citiesRouter = require("./cities.routes");
const subscriptionTypeRouter = require("./subscriptionType.routes");
const settingsRouter = require("./settings.routes");
const imageRouter = require("./image.routes");
const { verifyToken } = require("../middlewares/authJWT");
const heroSectionRouter = require("./promotionalApplication/heroSection.routes");
const ourServicesRouter = require("./promotionalApplication/ourServices.routes");
const templatesRouter = require("./promotionalApplication/templates.routes");

const router = Router();

// admin routes
router.use("/auth", authRouter);
router.use("/states", stateRouter);
router.use("/cities", citiesRouter);
router.use("/subscription-types", [verifyToken], subscriptionTypeRouter);
router.use("/settings", [verifyToken], settingsRouter);
router.use("/images", imageRouter);

// promotional application routes (public for viewing, protected for modifications)
router.use("/hero-section", heroSectionRouter);
router.use("/our-services", ourServicesRouter);
router.use("/templates", templatesRouter);

module.exports = router;
