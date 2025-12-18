const asyncHandler = require("../middlewares/asyncHandler");
const { State } = require("../models");
const { Op } = require("sequelize");

const createState = asyncHandler(async (req, res) => {
  try {
    const { name, status } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "name is required" });
    }

    const newState = await State.create({ name, status });

    res.status(201).json({ success: true, state: newState });
  } catch (err) {
    console.error("Error creating State:", err);
    
    if (err.name === 'SequelizeUniqueConstraintError') {
      try {
        return res.status(500).json({ 
          success: false, 
          message: "Sequence error fixed. Please try again." 
        });
      } catch (fixErr) {
        console.error("Error fixing sequence:", fixErr);
      }
    }
    
    res.status(500).json({ success: false, message: "Failed to create state" });
  }
});

const getAllStates = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    
    const offset = (page - 1) * limit;
    
    const whereClause = search
      ? {
          name: {
            [Op.iLike]: `%${search}%`
          }
        }
      : {};

    const { count, rows: states } = await State.findAndCountAll({
      where: whereClause,
      order: [["name", "ASC"]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.status(200).json({
      data: states,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (err) {
    console.error("Error fetching states:", err);
    res.status(500).json({ success: false, message: "Failed to fetch states" });
  }
});

const getStateById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const state = await State.findByPk(id);
    if (!state) {
      return res
        .status(404)
        .json({ success: false, message: "state not found" });
    }

    res.status(200).json({ success: true, state });
  } catch (err) {
    console.error("Error fetching state:", err);
    res.status(500).json({ success: false, message: "Failed to fetch state" });
  }
});

const updateState = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    const state = await State.findByPk(id);
    if (!state) {
      return res
        .status(404)
        .json({ success: false, message: "State not found" });
    }

    state.name = name || state.name;
    state.status = status !== undefined ? status : state.status;

    await state.save();

    res.status(200).json({ success: true, state });
  } catch (err) {
    console.error("Error updating state:", err);
    res.status(500).json({ success: false, message: "Failed to update state" });
  }
});

const deleteState = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const state = await State.findByPk(id);
    if (!state) {
      return res
        .status(404)
        .json({ success: false, message: "state not found" });
    }

    await state.destroy();

    res.status(200).json({
      success: true,
      message: "state deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting state:", err);
    res.status(500).json({ success: false, message: "Failed to delete state" });
  }
});

module.exports = {
  createState,
  getAllStates,
  getStateById,
  updateState,
  deleteState,
};
