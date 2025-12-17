"use strict";

const asyncHandler = require("../../middlewares/asyncHandler");
const { Op } = require("sequelize");
const { fixSequence } = require("../../utils/sequenceHelper");
const { Templates } = require("../../models");

const createTemplate = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      button1_text,
      button1_url,
      button2_text,
      button2_url,
      image,
      additional_images,
      status,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    await fixSequence("templates");

    let parsedAdditionalImages = [];
    if (additional_images) {
      try {
        parsedAdditionalImages =
          typeof additional_images === "string"
            ? JSON.parse(additional_images)
            : Array.isArray(additional_images)
            ? additional_images
            : [];
      } catch (err) {
        console.error("Error parsing additional_images:", err);
        parsedAdditionalImages = [];
      }
    }

    const template = await Templates.create({
      title,
      description,
      button1_text,
      button1_url,
      button2_text,
      button2_url,
      image,
      additional_images: parsedAdditionalImages,
      status: status === "true" || status === true,
    });

    res.status(201).json({ success: true, template });
  } catch (err) {
    console.error("Error creating template:", err);

    if (err.name === "SequelizeUniqueConstraintError") {
      await fixSequence("templates");
      return res.status(500).json({
        success: false,
        message: "Sequence error fixed. Please try again.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create template",
    });
  }
});

const getAllTemplates = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const offset = (page - 1) * limit;

    const whereClause = search
      ? {
          title: {
            [Op.iLike]: `%${search}%`,
          },
        }
      : {};

    const { count, rows } = await Templates.findAndCountAll({
      where: whereClause,
      order: [["created_at", "DESC"]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (err) {
    console.error("Error fetching templates:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch templates" });
  }
});

const getTemplateById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const template = await Templates.findByPk(id);
    if (!template) {
      return res
        .status(404)
        .json({ success: false, message: "Template not found" });
    }

    res.status(200).json({ success: true, template });
  } catch (err) {
    console.error("Error fetching template:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch template" });
  }
});

const updateTemplate = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const template = await Templates.findByPk(id);
    if (!template) {
      return res
        .status(404)
        .json({ success: false, message: "Template not found" });
    }

    const {
      title,
      description,
      button1_text,
      button1_url,
      button2_text,
      button2_url,
      image,
      additional_images,
      status,
    } = req.body;

    template.title = title ?? template.title;
    template.description = description ?? template.description;
    template.button1_text = button1_text ?? template.button1_text;
    template.button1_url = button1_url ?? template.button1_url;
    template.button2_text = button2_text ?? template.button2_text;
    template.button2_url = button2_url ?? template.button2_url;
    template.image = image ?? template.image;
    template.status =
      status === "true" || status === true
        ? true
        : status === "false" || status === false
        ? false
        : template.status;

    if (
      additional_images !== undefined &&
      additional_images !== null &&
      additional_images !== ""
    ) {
      try {
        const parsedImages =
          typeof additional_images === "string"
            ? JSON.parse(additional_images)
            : additional_images;

        template.additional_images = Array.isArray(parsedImages)
          ? parsedImages
          : [];
      } catch (err) {
        console.error("Error parsing additional_images:", err);
      }
    }

    await template.save();

    res.status(200).json({ success: true, template });
  } catch (err) {
    console.error("Error updating template:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update template",
    });
  }
});

const deleteTemplate = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const template = await Templates.findByPk(id);
    if (!template) {
      return res
        .status(404)
        .json({ success: false, message: "Template not found" });
    }

    await template.destroy();

    res.status(200).json({
      success: true,
      message: "Template deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting template:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete template" });
  }
});

module.exports = {
  createTemplate,
  getAllTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
};
