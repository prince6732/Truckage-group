"use strict";

const asyncHandler = require("../../middlewares/asyncHandler");
const { HeroSection } = require("../../models");
const { Op } = require("sequelize");
const { fixSequence } = require("../../utils/sequenceHelper");

const createHeroSection = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      rating,
      customers_count,
      button1_text,
      button1_url,
      button2_text,
      button2_url,
      image,
      status,
    } = req.body || {};
    
    console.log('Request Body:', req.body);
    console.log('Title:', title);

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    await fixSequence("hero_section");

    const newHero = await HeroSection.create({
      title,
      subtitle,
      description,
      rating,
      customers_count,
      button1_text,
      button1_url,
      button2_text,
      button2_url,
      image,
      status: status === 'true' || status === true,
    });

    res.status(201).json({ success: true, hero: newHero });
  } catch (err) {
    console.error("Error creating hero section:", err);

    if (err.name === "SequelizeUniqueConstraintError") {
      try {
        await fixSequence("hero_section");
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
      .json({ success: false, message: "Failed to create hero section" });
  }
});

const getAllHeroSections = asyncHandler(async (req, res) => {
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

    const { count, rows } = await HeroSection.findAndCountAll({
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
    console.error("Error fetching hero sections:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch hero sections" });
  }
});

const getHeroSectionById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const hero = await HeroSection.findByPk(id);
    if (!hero) {
      return res
        .status(404)
        .json({ success: false, message: "Hero section not found" });
    }

    res.status(200).json({ success: true, hero });
  } catch (err) {
    console.error("Error fetching hero section:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch hero section" });
  }
});

const updateHeroSection = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const hero = await HeroSection.findByPk(id);
    if (!hero) {
      return res
        .status(404)
        .json({ success: false, message: "Hero section not found" });
    }

    Object.assign(hero, req.body);

    await hero.save();

    res.status(200).json({ success: true, hero });
  } catch (err) {
    console.error("Error updating hero section:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to update hero section" });
  }
});

const deleteHeroSection = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const hero = await HeroSection.findByPk(id);
    if (!hero) {
      return res
        .status(404)
        .json({ success: false, message: "Hero section not found" });
    }

    await hero.destroy();

    res.status(200).json({
      success: true,
      message: "Hero section deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting hero section:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete hero section" });
  }
});

module.exports = {
  createHeroSection,
  getAllHeroSections,
  getHeroSectionById,
  updateHeroSection,
  deleteHeroSection,
};
