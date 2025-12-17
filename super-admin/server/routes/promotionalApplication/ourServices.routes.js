const Router = require("express");
const ourServicesController = require("../../controllers/promotionalApplication/ourServices.controller");
const { verifyToken } = require("../../middlewares/authJWT");
const ourServicesRouter = Router();

ourServicesRouter
  .route("/")
  .post([verifyToken], ourServicesController.createOurService)
  .get(ourServicesController.getAllOurServices);

ourServicesRouter
  .route("/:id")
  .get(ourServicesController.getOurServiceById)
  .put([verifyToken], ourServicesController.updateOurService)
  .delete([verifyToken], ourServicesController.deleteOurService);

module.exports = ourServicesRouter;
