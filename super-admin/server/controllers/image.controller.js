const fs = require("fs");
const path = require("path");

exports.getFiles = async (req, res) => {
  try {
    const { directory } = req.params;
    const fullPath = path.join(__dirname, "../public/storage", directory);

    if (!fs.existsSync(fullPath)) {
      return res.status(200).json([]);
    }

    const files = fs
      .readdirSync(fullPath)
      .filter((file) =>
        fs.statSync(path.join(fullPath, file)).isFile()
      )
      .map((file) => `/storage/${directory}/${file}`);

    return res.status(200).json(files);
  } catch (error) {
    console.error("Error getting files:", error);
    return res.status(500).json({
      isSuccess: false,
      message: "Failed to retrieve files.",
    });
  }
};

exports.upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        isSuccess: false,
        message: "No image file provided.",
      });
    }

    const directory = req.body.directory || "products";
    const uploadDir = path.join(__dirname, "../public/storage", directory);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const existingFiles = fs.existsSync(uploadDir)
      ? fs
          .readdirSync(uploadDir)
          .filter((file) => fs.statSync(path.join(uploadDir, file)).isFile())
      : [];

    const numbers = existingFiles
      .map((file) => parseInt(path.parse(file).name, 10))
      .filter((num) => !isNaN(num));

    const nextNumber = numbers.length === 0 ? 1 : Math.max(...numbers) + 1;

    const ext = path.extname(req.file.originalname);
    const fileName = String(nextNumber).padStart(15, "0") + ext;
    const finalPath = path.join(uploadDir, fileName);

    fs.renameSync(req.file.path, finalPath);

    return res.status(200).json({
      isSuccess: true,
      result: `/storage/${directory}/${fileName}`,
      message: "Image uploaded successfully.",
    });
  } catch (error) {
    console.error("Error uploading image:", error);

    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      isSuccess: false,
      message: "Failed to upload image.",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { path: imgPath } = req.body;

    if (!imgPath) {
      return res.status(400).json({
        isSuccess: false,
        message: "File path is required.",
      });
    }

    const cleanPath = imgPath.replace(/^\/storage\//, "");
    const fullPath = path.join(__dirname, "../public/storage", cleanPath);

    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({
        isSuccess: false,
        message: "File not found.",
      });
    }

    fs.unlinkSync(fullPath);

    return res.status(200).json({
      isSuccess: true,
      message: "Image deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    return res.status(500).json({
      isSuccess: false,
      message: "Failed to delete image.",
    });
  }
};
