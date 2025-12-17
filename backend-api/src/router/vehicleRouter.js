const express = require("express");
const router = express.Router();
const vehicleController = require("../controller/vehicleController");
const { authenticateToken } = require("../middleware/auth");
const authorize = require("../middleware/role");
const { validateRequest } = require("../middleware/validateInput");
const { 
  createVehicleSchema, 
  updateVehicleSchema,
  vehicleIdSchema 
} = require("../validations/vehicle.validator");


router.use(authenticateToken);

router.get("/",authorize("ADMIN", "PODMANAGER"),vehicleController.getAllVehicles);
router.get("/stats",authorize("ADMIN"),vehicleController.getVehicleStats);
router.get("/:id",authorize("ADMIN", "PODMANAGER"),validateRequest(vehicleIdSchema, "params"),vehicleController.getVehicleById);
router.post("/",authorize("ADMIN"),validateRequest(createVehicleSchema),vehicleController.createVehicle);
router.put("/:id",authorize("ADMIN"),validateRequest(vehicleIdSchema, "params"),validateRequest(updateVehicleSchema),vehicleController.updateVehicle);
router.patch("/:id/assign-driver",authorize("ADMIN"),validateRequest(vehicleIdSchema, "params"),vehicleController.assignDriver);
router.delete("/:id",authorize("ADMIN"),validateRequest(vehicleIdSchema, "params"),vehicleController.deleteVehicle);


module.exports = router;
