const db = require("../../models");
const Vehicle = db.Vehicle;
const User = db.User;
const Driver = db.Driver;
const { Op } = require("sequelize");

exports.getAllVehicles = async (req, res) => {
  try {
    const tenantId = req.user.tenantId; 
    
    const {
      page = 1,
      limit = 10,
      search = "",
      status,
      vehicleType,
      fuelType,
      sortBy = "createdAt",
      order = "DESC"
    } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = {
      tenantId 
    };

    if (search) {
      whereClause[Op.or] = [
        { vehicleNumber: { [Op.like]: `%${search}%` } },
        { licensePlate: { [Op.like]: `%${search}%` } },
        { make: { [Op.like]: `%${search}%` } },
        { model: { [Op.like]: `%${search}%` } }
      ];
    }

    if (status) whereClause.status = status;
    if (vehicleType) whereClause.vehicleType = vehicleType;
    if (fuelType) whereClause.fuelType = fuelType;

    const { count, rows: vehicles } = await Vehicle.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, order.toUpperCase()]],
      include: [
        {
          model: Driver,
          as: 'assignedDriver',
          attributes: ['id', 'driver_name', 'email', 'contact_number']
        }
      ]
    });

    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: {
        vehicles,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    console.error("Get all vehicles error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve vehicles",
      error: error.message
    });
  }
};

exports.getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const tenantId = req.user.tenantId; 

    const vehicle = await Vehicle.findOne({
      where: {
        id,
        tenantId 
      },
      include: [
        {
          model: Driver,
          as: 'assignedDriver',
          attributes: ['id', 'driver_name', 'email', 'contact_number'],
          where: { tenant_id: tenantId }, 
          required: false
        }
      ]
    });

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: vehicle
    });
  } catch (error) {
    console.error("Get vehicle by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve vehicle",
      error: error.message
    });
  }
};

exports.createVehicle = async (req, res) => {
  try {
    const tenantId = req.user.tenantId; 
    const vehicleData = req.body;

    const existingVehicle = await Vehicle.findOne({
      where: {
        vehicleNumber: vehicleData.vehicleNumber,
        tenantId,
      },
    });

    if (existingVehicle) {
      return res.status(400).json({
        success: false,
        message: "Vehicle number already exists",
      });
    }

    const existingPlate = await Vehicle.findOne({
      where: {
        licensePlate: vehicleData.licensePlate,
        tenantId,
      },
    });

    if (existingPlate) {
      return res.status(400).json({
        success: false,
        message: "License plate already exists",
      });
    }

    if (vehicleData.assignedDriverId) {
      const driver = await Driver.findOne({
        where: {
          id: vehicleData.assignedDriverId,
          tenant_id: tenantId,
        },
      });

      if (!driver) {
        return res.status(404).json({
          success: false,
          message: "Assigned driver not found for this tenant",
        });
      }
    }

    const vehicle = await Vehicle.create({
      ...vehicleData,
      tenantId, 
    });

    const createdVehicle = await Vehicle.findOne({
      where: {
        id: vehicle.id,
        tenantId
      },
      include: [
        {
          model: Driver,
          as: "assignedDriver",
          attributes: ["id", "driver_name", "email", "contact_number"],
          where: { tenant_id: tenantId },
          required: false
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: createdVehicle,
    });
  } catch (error) {
    console.error("Create vehicle error:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        success: false,
        message: "Vehicle already exists",
        error: error.errors[0].message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create vehicle",
      error: error.message,
    });
  }
};


exports.updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const tenantId = req.user.tenantId;

    const vehicle = await Vehicle.findOne({
      where: {
        id,
        tenantId 
      }
    });

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found or access denied"
      });
    }

    if (updateData.vehicleNumber && updateData.vehicleNumber !== vehicle.vehicleNumber) {
      const existingVehicle = await Vehicle.findOne({
        where: { 
          vehicleNumber: updateData.vehicleNumber,
          tenantId, 
          id: { [Op.ne]: id }
        }
      });

      if (existingVehicle) {
        return res.status(400).json({
          success: false,
          message: "Vehicle number already exists"
        });
      }
    }

    if (updateData.licensePlate && updateData.licensePlate !== vehicle.licensePlate) {
      const existingPlate = await Vehicle.findOne({
        where: { 
          licensePlate: updateData.licensePlate,
          tenantId, 
          id: { [Op.ne]: id }
        }
      });

      if (existingPlate) {
        return res.status(400).json({
          success: false,
          message: "License plate already exists"
        });
      }
    }


    if (updateData.assignedDriverId) {
      const driver = await Driver.findOne({
        where: {
          id: updateData.assignedDriverId,
          tenant_id: tenantId 
        }
      });
      if (!driver) {
        return res.status(404).json({
          success: false,
          message: "Assigned driver not found or access denied"
        });
      }
    }

    await vehicle.update(updateData);

    const updatedVehicle = await Vehicle.findOne({
      where: {
        id,
        tenantId
      },
      include: [
        {
          model: Driver,
          as: 'assignedDriver',
          attributes: ['id', 'driver_name', 'email', 'contact_number'],
          where: { tenant_id: tenantId },
          required: false
        }
      ]
    });

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: updatedVehicle
    });
  } catch (error) {
    console.error("Update vehicle error:", error);
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: "Vehicle with this information already exists",
        error: error.errors[0].message
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update vehicle",
      error: error.message
    });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const tenantId = req.user.tenantId; 

    const vehicle = await Vehicle.findOne({
      where: {
        id,
        tenantId 
      }
    });

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found or access denied"
      });
    }

    await vehicle.destroy();

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully"
    });
  } catch (error) {
    console.error("Delete vehicle error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete vehicle",
      error: error.message
    });
  }
};

exports.getVehicleStats = async (req, res) => {
  try {
    const tenantId = req.user.tenantId; 
    
    const totalVehicles = await Vehicle.count({ where: { tenantId } });
    const activeVehicles = await Vehicle.count({ where: { status: 'ACTIVE', tenantId } });
    const inMaintenanceVehicles = await Vehicle.count({ where: { status: 'MAINTENANCE', tenantId } });
    const inactiveVehicles = await Vehicle.count({ where: { status: 'INACTIVE', tenantId } });

    const vehiclesByType = await Vehicle.findAll({
      attributes: [
        'vehicleType',
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count']
      ],
      where: { tenantId },
      group: ['vehicleType']
    });

    const vehiclesByFuelType = await Vehicle.findAll({
      attributes: [
        'fuelType',
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count']
      ],
      where: { tenantId },
      group: ['fuelType']
    });

    res.status(200).json({
      success: true,
      message: "Vehicle statistics retrieved successfully",
      data: {
        total: totalVehicles,
        active: activeVehicles,
        maintenance: inMaintenanceVehicles,
        inactive: inactiveVehicles,
        byType: vehiclesByType,
        byFuelType: vehiclesByFuelType
      }
    });
  } catch (error) {
    console.error("Get vehicle stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve vehicle statistics",
      error: error.message
    });
  }
};

exports.assignDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const { driverId } = req.body;
    const tenantId = req.user.tenantId; 

    const vehicle = await Vehicle.findOne({
      where: {
        id,
        tenantId 
      }
    });
    
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found or access denied"
      });
    }

    if (driverId) {
      const driver = await Driver.findOne({
        where: {
          id: driverId,
          tenant_id: tenantId 
        }
      });
      if (!driver) {
        return res.status(404).json({
          success: false,
          message: "Driver not found or access denied"
        });
      }
    }

    await vehicle.update({ assignedDriverId: driverId });

    const updatedVehicle = await Vehicle.findOne({
      where: {
        id,
        tenantId
      },
      include: [
        {
          model: Driver,
          as: 'assignedDriver',
          attributes: ['id', 'driver_name', 'email', 'contact_number'],
          where: { tenant_id: tenantId },
          required: false
        }
      ]
    });

    res.status(200).json({
      success: true,
      message: driverId ? "Driver assigned successfully" : "Driver unassigned successfully",
      data: updatedVehicle
    });
  } catch (error) {
    console.error("Assign driver error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to assign driver",
      error: error.message
    });
  }
};



