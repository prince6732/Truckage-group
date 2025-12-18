const { Op } = require("sequelize");
const { Settings } = require("../models");
const asyncHandler = require("../middlewares/asyncHandler");

const attributes = ["key", "value", "status"];

const keyPattern = /^[a-zA-Z0-9_.-]+$/;
const valuePattern = /^[a-zA-Z0-9 _.,@:/()%-]*$/;

const findAllSettings = asyncHandler(async (req, res) => {
  try {
    let { page = 1, perPage = 8, search = "" } = req.query;

    page = parseInt(page);
    perPage = parseInt(perPage);
    search = search.trim();

    const offset = (page - 1) * perPage;

    const where = {};

    if (search) {
      where.key = { [Op.iLike]: `%${search}%` };
    }

    const { count, rows } = await Settings.findAndCountAll({
      where,
      attributes,
      offset,
      limit: perPage,
      order: [["key", "ASC"]],
    });

    res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page,
        perPage,
        totalPages: Math.ceil(count / perPage),
      },
    });
  } catch (err) {
    console.error("Error fetching settings:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch settings",
    });
  }
});

const findSettingByKey = asyncHandler(async (req, res) => {
  try {
    const { key } = req.params;

    const setting = await Settings.findOne({
      where: { key },
      attributes,
    });

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: "Setting not found",
      });
    }

    res.status(200).json({ success: true, setting });
  } catch (err) {
    console.error("Error fetching setting:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch setting" });
  }
});

const upsertSetting = asyncHandler(async (req, res) => {
  try {
    const { key, value, status } = req.body;

    if (!key || typeof value === "undefined") {
      return res.status(400).json({
        success: false,
        message: "Key and value are required",
      });
    }

    if (!keyPattern.test(key)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid key format. Allowed: letters, numbers, dashes, underscores, dots.",
      });
    }

    if (!valuePattern.test(value)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid value: only letters, numbers, spaces and . , @ : / ( ) % - are allowed",
      });
    }

    const [setting, created] = await Settings.upsert(
      { key, value, status: status ?? true },
      { returning: true }
    );

    res.status(200).json({
      success: true,
      message: created
        ? "Setting created successfully"
        : "Setting updated successfully",
      setting,
    });
  } catch (err) {
    console.error("Error creating/updating setting:", err);
    res.status(500).json({
      success: false,
      message: "Failed to save setting",
    });
  }
});

const updateSetting = asyncHandler(async (req, res) => {
  try {
    const { key } = req.params;
    const { value, status } = req.body;

    if (typeof value === "undefined") {
      return res.status(400).json({
        success: false,
        message: "Value is required",
      });
    }

    if (!valuePattern.test(value)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid value: only letters, numbers, spaces and . , @ : / ( ) % - are allowed",
      });
    }

    const setting = await Settings.findOne({
      where: { key },
    });

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: "Setting not found",
      });
    }

    await setting.update({ value, status: status ?? true });

    res.status(200).json({
      success: true,
      message: "Setting updated successfully",
      setting,
    });
  } catch (err) {
    console.error("Error updating setting:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update setting",
    });
  }
});

const deleteSetting = asyncHandler(async (req, res) => {
  try {
    const { key } = req.params;

    const deleted = await Settings.destroy({
      where: { key },
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Setting not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Setting deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting setting:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete setting",
    });
  }
});

module.exports = {
  findAllSettings,
  findSettingByKey,
  upsertSetting,
  updateSetting,
  deleteSetting,
};
