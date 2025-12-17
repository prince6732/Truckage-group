
const asyncHandler = require("../middlewares/asyncHandler");
const { State, City } = require("../models");
const { fixSequence } = require("../utils/sequenceHelper");
const { Op } = require("sequelize");

const getCitiesByState = asyncHandler(async (req, res) => {
  try {
    const { state_id } = req.params;
    const { page = 1, limit = 10, search = '' } = req.query;

    if (!state_id) {
      return res
        .status(400)
        .json({ success: false, message: "State ID is required" });
    }

    const offset = (page - 1) * limit;
    
    const whereClause = {
      state_id: state_id
    };
    
    if (search) {
      whereClause.name = {
        [Op.iLike]: `%${search}%`
      };
    }

    const { count, rows: cities } = await City.findAndCountAll({
      where: whereClause,
      order: [["name", "ASC"]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const state = await State.findOne({
      where: {
        id: state_id,
      },
      attributes: ["id", "name"],
    });

    res.status(200).json({ 
      cities: cities, 
      stateName: state ? state.name : "",
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (err) {
    console.error("Error fetching cities:", err);
    res.status(500).json({ success: false, message: "Failed to fetch cities" });
  }
});

const createCity = asyncHandler(async (req, res) => {
  try {
    const { name, pincode, status } = req.body;
    const { state_id } = req.params;

    if (!name || !state_id) {
      return res
        .status(400)
        .json({ success: false, message: "Name and State ID are required" });
    }

    await fixSequence('cities');

    const newCity = await City.create({ name, state_id, pincode, status });
    res.status(201).json({ success: true, city: newCity });
  } catch (err) {
    console.error("Error creating City:", err);
    
    if (err.name === 'SequelizeUniqueConstraintError') {
      try {
        await fixSequence('cities');
        return res.status(500).json({ 
          success: false, 
          message: "Sequence error fixed. Please try again." 
        });
      } catch (fixErr) {
        console.error("Error fixing sequence:", fixErr);
      }
    }
    
    res.status(500).json({ success: false, message: "Failed to create city" });
  }
});

const updateCity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, pincode, status } = req.body;

  const city = await City.findByPk(id);
  if (!city) {
    return res.status(404).json({ success: false, message: "City not found" });
  }

  city.name = name || city.name;
  city.pincode = pincode || city.pincode;
  city.status = status !== undefined ? status : city.status;

  await city.save();
  res.status(200).json({ success: true, city });
});

const deleteCity = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const city = await City.findByPk(id);
  if (!city) {
    return res.status(404).json({ success: false, message: "City not found" });
  }

  await city.destroy();
  res.status(200).json({ success: true, message: "City deleted successfully" });
});

module.exports = {
  getCitiesByState,
  createCity,
  updateCity,
  deleteCity,
};
