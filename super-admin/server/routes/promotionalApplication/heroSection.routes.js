const Router = require("express");
const heroSectionController = require("../../controllers/promotionalApplication/heroSection.controller");
const { verifyToken } = require("../../middlewares/authJWT");
const heroSectionRouter = Router();

// Public routes - no authentication required
heroSectionRouter
  .route("/")
  .get(heroSectionController.getAllHeroSections)
  .post([verifyToken], heroSectionController.createHeroSection);

heroSectionRouter
  .route("/:id")
  .get(heroSectionController.getHeroSectionById)
  .put([verifyToken], heroSectionController.updateHeroSection)
  .delete([verifyToken], heroSectionController.deleteHeroSection);

module.exports = heroSectionRouter;
