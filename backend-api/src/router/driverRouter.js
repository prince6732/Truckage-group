const express = require("express");
const router = express.Router();
const driverController = require("../controller/driverController");
const { authenticateToken } = require("../middleware/auth");
const authorize = require("../middleware/role");
const { validateRequest } = require("../middleware/validateInput");

const {
  createDriverSchema,
  updateDriverSchema,
  driverIdSchema,
  driverQuerySchema
} = require("../validations/driver.validator");

// Apply authentication to all routes
router.use(authenticateToken);

router.get(
  "/", 
  authenticateToken,
  authorize("ADMIN", "PODMANAGER"), 
  validateRequest(driverQuerySchema, "query"),
  driverController.getAllDrivers
);

router.get(
  "/stats", 
  authenticateToken,
  authorize("ADMIN"), 
  driverController.getDriverStats
);

router.get(
  "/available", 
    authenticateToken,

  authorize("ADMIN", "PODMANAGER"), 
  driverController.getAvailableDrivers
);

router.get(
  "/:id", 
    authenticateToken,

  authorize("ADMIN", "PODMANAGER"), 
  validateRequest(driverIdSchema, "params"),
  driverController.getDriverById
);

// POST routes
router.post(
  "/", 
    authenticateToken,

  authorize("ADMIN"), 
  validateRequest(createDriverSchema),
  driverController.createDriver
);

// PUT routes
router.put(
  "/:id", 
    authenticateToken,

  authorize("ADMIN"), 
  validateRequest(driverIdSchema, "params"),
  validateRequest(updateDriverSchema),
  driverController.updateDriver
);

// DELETE routes
router.delete(
  "/:id", 
    authenticateToken,

  authorize("ADMIN"), 
  validateRequest(driverIdSchema, "params"),
  driverController.deleteDriver
);

module.exports = router;




