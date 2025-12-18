const Router = require("express");
const stateController = require("../controllers/state.controller");
const stateRouter = Router();

stateRouter
  .route("/")
  .post(stateController.createState)
  .get(stateController.getAllStates);

stateRouter
  .route("/:id")
  .get(stateController.getStateById)
  .put(stateController.updateState)
  .delete(stateController.deleteState);

module.exports = stateRouter;
