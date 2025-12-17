const db = require("../../models");
const Driver = db.Driver;
const Vehicle = db.Vehicle;
const Tenant = db.Tenant;
const { Op } = require("sequelize");

const getAllDrivers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      vehicle_id,
      sort_by = 'created_at',
      sort_order = 'DESC'
    } = req.query;

    const tenant_id = req.user.tenant_id; // ✅ FIXED

    if (!tenant_id) {
      return res.status(401).json({
        success: false,
        message: "Tenant ID missing from token"
      });
    }

    const offset = (page - 1) * limit;
    const whereCondition = { tenant_id };

    if (search) {
      whereCondition[Op.or] = [
        { driver_name: { [Op.iLike]: `%${search}%` } },
        { licence_number: { [Op.iLike]: `%${search}%` } },
        { contact_number: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (status) whereCondition.status = status;
    if (vehicle_id) whereCondition.vehicle_id = vehicle_id;

    const { count, rows } = await Driver.findAndCountAll({
      where: whereCondition,
      distinct: true,
      col: 'id',
      include: [
        { model: Vehicle, as: 'vehicle', required: false },
        { model: Tenant, as: 'tenant', required: false }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sort_by, sort_order.toUpperCase()]]
    });

    return res.json({
      success: true,
      data: rows,
      pagination: {
        current_page: Number(page),
        total_pages: Math.ceil(count / limit),
        total_count: count
      }
    });

  } catch (error) {
    console.error("Error fetching drivers:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getDriverById = async (req, res) => {
  try {
    const { id } = req.params;
    const tenant_id = req.user.tenant_id;

    const driver = await Driver.findOne({
      where: { id, tenant_id },
      include: [
        {
          model: Vehicle,
          as: 'vehicle',
          attributes: ['id', 'vehicleNumber', 'make', 'model', 'status', 'year', 'color']
        },
        {
          model: Tenant,
          as: 'tenant',
          attributes: ['id', 'name']
        }
      ]
    });

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Driver retrieved successfully",
      data: { driver }
    });

  } catch (error) {
    console.error("Error fetching driver:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

const createDriver = async (req, res) => {
  try {
    const {
      driver_name,
      licence_number,
      licence_expiry_date,
      contact_number,
      email,
      address,
      driver_image_url,
      licence_document_url,
      vehicle_id,
      status = "ACTIVE"
    } = req.body;

    const tenant_id = req.user?.tenant_id;

    if (!tenant_id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Tenant ID missing"
      });
    }

    if (!driver_name || !licence_number || !contact_number || !email) {
      return res.status(400).json({
        success: false,
        message: "Required fields: driver_name, licence_number, contact_number, email"
      });
    }

    // Licence check
    const existingDriver = await Driver.findOne({
      where: { licence_number, tenant_id }
    });

    if (existingDriver) {
      return res.status(409).json({
        success: false,
        message: "Driver with this licence number already exists"
      });
    }

    // Email check
    const existingEmail = await Driver.findOne({
      where: { email, tenant_id }
    });

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Driver with this email already exists"
      });
    }

    // Vehicle ownership check
    if (vehicle_id) {
      const vehicle = await Vehicle.findOne({
        where: { id: vehicle_id, tenant_id }
      });

      if (!vehicle) {
        return res.status(404).json({
          success: false,
          message: "Vehicle not found or does not belong to your tenant"
        });
      }
    }

    const newDriver = await Driver.create({
      tenant_id,
      vehicle_id,
      driver_name,
      licence_number,
      licence_expiry_date,
      contact_number,
      email,
      address,
      driver_image_url,
      licence_document_url,
      status
    });

    const createdDriver = await Driver.findByPk(newDriver.id, {
      include: [{ model: Vehicle, as: "vehicle" }]
    });

    return res.status(201).json({
      success: true,
      message: "Driver created successfully",
      data: createdDriver
    });

  } catch (error) {
    console.error("Error creating driver:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};


// Update driver
const updateDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const tenant_id = req.user.tenant_id;
    const updateData = req.body;

    // Check if driver exists and belongs to tenant
    const driver = await Driver.findOne({
      where: { id, tenant_id }
    });

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found"
      });
    }

    // If updating licence number, check for duplicates
    if (updateData.licence_number && updateData.licence_number !== driver.licence_number) {
      const existingDriver = await Driver.findOne({
        where: { 
          licence_number: updateData.licence_number, 
          tenant_id,
          id: { [Op.ne]: id }
        }
      });

      if (existingDriver) {
        return res.status(409).json({
          success: false,
          message: "Driver with this licence number already exists"
        });
      }
    }

    // If updating email, check for duplicates
    if (updateData.email && updateData.email !== driver.email) {
      const existingEmail = await Driver.findOne({
        where: { 
          email: updateData.email, 
          tenant_id,
          id: { [Op.ne]: id }
        }
      });

      if (existingEmail) {
        return res.status(409).json({
          success: false,
          message: "Driver with this email already exists"
        });
      }
    }

    // If vehicle_id is being updated, validate vehicle exists
    if (updateData.vehicle_id) {
      const vehicle = await Vehicle.findOne({
        where: { id: updateData.vehicle_id, tenant_id }
      });

      if (!vehicle) {
        return res.status(404).json({
          success: false,
          message: "Vehicle not found or doesn't belong to your organization"
        });
      }
    }

    await driver.update(updateData);

    // Fetch updated driver with associations
    const updatedDriver = await Driver.findByPk(id, {
      include: [
        {
          model: Vehicle,
          as: 'vehicle',
          attributes: ['id', 'vehicleNumber', 'make', 'model']
        }
      ]
    });

    return res.status(200).json({
      success: true,
      message: "Driver updated successfully",
      data: { driver: updatedDriver }
    });

  } catch (error) {
    console.error("Error updating driver:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Delete driver
const deleteDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const tenant_id = req.user.tenant_id;

    const driver = await Driver.findOne({
      where: { id, tenant_id }
    });

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found"
      });
    }

    await driver.destroy();

    return res.status(200).json({
      success: true,
      message: "Driver deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting driver:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Get driver statistics
const getDriverStats = async (req, res) => {
  try {
    // ✅ ALWAYS read from token payload
    const tenant_id = req.user?.tenant_id;

    // 🔐 HARD GUARD (VERY IMPORTANT)
    if (!tenant_id) {
      return res.status(401).json({
        success: false,
        message: "Tenant ID missing or unauthorized request"
      });
    }

    const [
      totalDrivers,
      activeDrivers,
      inactiveDrivers,
      driversWithVehicles,
      driversWithoutVehicles,
      licensesExpiringSoon
    ] = await Promise.all([
      // Total drivers
      Driver.count({
        where: { tenant_id }
      }),

      // Active drivers
      Driver.count({
        where: { tenant_id, status: "ACTIVE" }
      }),

      // Inactive drivers
      Driver.count({
        where: { tenant_id, status: "INACTIVE" }
      }),

      // Drivers with vehicles
      Driver.count({
        where: {
          tenant_id,
          vehicle_id: {
            [Op.ne]: null
          }
        }
      }),

      // Drivers without vehicles
      Driver.count({
        where: {
          tenant_id,
          vehicle_id: null
        }
      }),

      // Licenses expiring in next 30 days
      Driver.count({
        where: {
          tenant_id,
          licence_expiry_date: {
            [Op.between]: [
              new Date(),
              new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            ]
          }
        }
      })
    ]);

    return res.status(200).json({
      success: true,
      message: "Driver statistics retrieved successfully",
      data: {
        total_drivers: totalDrivers,
        active_drivers: activeDrivers,
        inactive_drivers: inactiveDrivers,
        drivers_with_vehicles: driversWithVehicles,
        drivers_without_vehicles: driversWithoutVehicles,
        licenses_expiring_soon: licensesExpiringSoon
      }
    });

  } catch (error) {
    console.error("Error fetching driver stats:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Get available drivers (not assigned to any vehicle)
const getAvailableDrivers = async (req, res) => {
  try {
    const tenant_id = req.user.tenant_id;

    const availableDrivers = await Driver.findAll({
      where: {
        tenant_id,
        vehicle_id: null,
        status: 'ACTIVE'
      },
      attributes: ['id', 'driver_name', 'licence_number', 'contact_number', 'email'],
      order: [['driver_name', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      message: "Available drivers retrieved successfully",
      data: { drivers: availableDrivers }
    });

  } catch (error) {
    console.error("Error fetching available drivers:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};


module.exports = {
  getAllDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
  getDriverStats,
  getAvailableDrivers
};
