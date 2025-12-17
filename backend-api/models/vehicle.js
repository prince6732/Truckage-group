"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    static associate(models) {
      // 🔹 Tenant relationship
      Vehicle.belongsTo(models.Tenant, {
        foreignKey: 'tenantId',
        as: 'tenant',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      // 🔹 Vehicle Documents
Vehicle.hasMany(models.VehicleDocument, {
  foreignKey: 'vehicle_id',
  as: 'documents',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

      // 🔹 Assigned Driver relationship
      Vehicle.belongsTo(models.Driver, {
        foreignKey: 'assignedDriverId',
        as: 'assignedDriver',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
      
      // 🔹 Reverse association - Vehicle has many drivers (though typically one)
      Vehicle.hasMany(models.Driver, {
        foreignKey: 'vehicle_id',
        as: 'drivers',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
    }
  }

  Vehicle.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      tenantId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'tenant_id',
        validate: {
          notNull: { msg: 'Tenant ID is required' }
        }
      },

      vehicleNumber: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        field: 'vehicle_number',
        validate: {
          notEmpty: { msg: 'Vehicle number is required' }
        }
      },

      vehicleType: {
        type: DataTypes.ENUM(
          'TRUCK',
          'VAN',
          'CAR',
          'MOTORCYCLE',
          'BUS',
          'TRAILER',
          'TANKER',
          'REFRIGERATED_TRUCK',
          'FLATBED',
          'PICKUP'
        ),
        allowNull: false,
        field: 'vehicle_type',
        validate: {
          notEmpty: { msg: 'Vehicle type is required' }
        }
      },

      make: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Make is required' }
        }
      },

      model: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Model is required' }
        }
      },

      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: { args: [1900], msg: 'Year must be 1900 or later' },
          max: { args: [new Date().getFullYear() + 1], msg: 'Year cannot be in the future' }
        }
      },

      color: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      vinNumber: {
        type: DataTypes.STRING(17),
        allowNull: true,
        unique: true,
        field: 'vin_number',
        validate: {
          len: { args: [17, 17], msg: 'VIN must be exactly 17 characters' }
        }
      },

      licensePlate: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        field: 'license_plate',
        validate: {
          notEmpty: { msg: 'License plate is required' }
        }
      },

      registrationExpiry: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'registration_expiry',
      },

      insuranceExpiry: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'insurance_expiry',
      },

      capacity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        validate: {
          min: { args: [0], msg: 'Capacity must be positive' }
        }
      },

      fuelType: {
        type: DataTypes.ENUM(
          'PETROL',
          'DIESEL',
          'ELECTRIC',
          'HYBRID',
          'CNG',
          'LPG'
        ),
        allowNull: false,
        field: 'fuel_type',
        validate: {
          notEmpty: { msg: 'Fuel type is required' }
        }
      },

      mileage: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
        validate: {
          min: { args: [0], msg: 'Mileage must be positive' }
        }
      },

      status: {
        type: DataTypes.ENUM(
          'ACTIVE',
          'INACTIVE',
          'MAINTENANCE',
          'RETIRED',
          'OUT_OF_SERVICE'
        ),
        allowNull: false,
        defaultValue: 'ACTIVE',
      },

      lastServiceDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'last_service_date',
      },

      nextServiceDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'next_service_date',
      },

      purchaseDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'purchase_date',
      },

      purchasePrice: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
        field: 'purchase_price',
        validate: {
          min: { args: [0], msg: 'Purchase price must be positive' }
        }
      },

      currentValue: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
        field: 'current_value',
        validate: {
          min: { args: [0], msg: 'Current value must be positive' }
        }
      },

      assignedDriverId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'assigned_driver_id',
      },

      gpsTrackerId: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: 'gps_tracker_id',
      },

      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: "Vehicle",
      tableName: "Vehicles",
      timestamps: true,
      underscored: true,
    }
  );

  return Vehicle;
};
