const Router = require("express");
const citiesController = require("../controllers/cities.controller");
const citiesRouter = Router();

citiesRouter
  .route("/:state_id")
  .get(citiesController.getCitiesByState)
  .post(citiesController.createCity);

citiesRouter
  .route("/:id")
  .put(citiesController.updateCity)
  .delete(citiesController.deleteCity);

module.exports = citiesRouter;
