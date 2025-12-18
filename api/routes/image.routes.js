const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const imageController = require("../controllers/image.controller");
const { verifyToken } = require("../middlewares/authJWT");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/temp"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

router.get("/get-files/:directory", verifyToken, imageController.getFiles);
router.post(
  "/upload",
  verifyToken,
  upload.single("image"),
  imageController.upload
);
router.delete("/delete", verifyToken, imageController.delete);

module.exports = router;
