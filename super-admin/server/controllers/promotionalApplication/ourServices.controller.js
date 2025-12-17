"use strict";

const asyncHandler = require("../../middlewares/asyncHandler");
const { Op } = require("sequelize");
const { fixSequence } = require("../../utils/sequenceHelper");
const { OurServices } = require("../../models");

const createOurService = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      button1_text,
      button1_url,
      button2_text,
      button2_url,
      image,
      status,
    } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    await fixSequence("our_services");

    const newService = await OurServices.create({
      title,
      subtitle,
      description,
      button1_text,
      button1_url,
      button2_text,
      button2_url,
      image,
      status,
    });

    res.status(201).json({ success: true, service: newService });
  } catch (err) {
    console.error("Error creating our service:", err);

    if (err.name === "SequelizeUniqueConstraintError") {
      try {
        await fixSequence("our_services");
        return res.status(500).json({
          success: false,
          message: "Sequence error fixed. Please try again.",
        });
      } catch (fixErr) {
        console.error("Error fixing sequence:", fixErr);
      }
    }

    res
      .status(500)
      .json({ success: false, message: "Failed to create our service" });
  }
});

const getAllOurServices = asyncHandler(async (req, res) => {
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

    const { count, rows } = await OurServices.findAndCountAll({
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
    console.error("Error fetching our services:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch our services" });
  }
});

const getOurServiceById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const service = await OurServices.findByPk(id);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Our service not found" });
    }

    res.status(200).json({ success: true, service });
  } catch (err) {
    console.error("Error fetching our service:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch our service" });
  }
});

const updateOurService = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const service = await OurServices.findByPk(id);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Our service not found" });
    }

    Object.assign(service, req.body);

    await service.save();

    res.status(200).json({ success: true, service });
  } catch (err) {
    console.error("Error updating our service:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to update our service" });
  }
});

const deleteOurService = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const service = await OurServices.findByPk(id);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Our service not found" });
    }

    await service.destroy();

    res.status(200).json({
      success: true,
      message: "Our service deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting our service:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete our service" });
  }
});

module.exports = {
  createOurService,
  getAllOurServices,
  getOurServiceById,
  updateOurService,
  deleteOurService,
};
