const express = require("express");
const authRoutes = require("./authRouter");
const vehicleRoutes = require("./vehicleRouter");
const vehicleDocumentRoutes = require("./vehicleDocumentRouter");
const driverRoutes = require("./driverRouter");
const blogRoutes = require("./blogRouter");

const router = express.Router();

router.use(authRoutes);
router.use("/vehicles", vehicleRoutes);
router.use("/vehicle-documents", vehicleDocumentRoutes);
router.use("/drivers", driverRoutes);
router.use("/blogs", blogRoutes);


module.exports = router;
