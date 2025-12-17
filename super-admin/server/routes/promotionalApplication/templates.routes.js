const Router = require("express");
const templateController = require("../../controllers/promotionalApplication/templates.controller");
const { verifyToken } = require("../../middlewares/authJWT");
const templatesRouter = Router();

templatesRouter
  .route("/")
  .post([verifyToken], templateController.createTemplate)
  .get(templateController.getAllTemplates);

templatesRouter
  .route("/:id")
  .get(templateController.getTemplateById)
  .put([verifyToken], templateController.updateTemplate)
  .delete([verifyToken], templateController.deleteTemplate);

module.exports = templatesRouter;
