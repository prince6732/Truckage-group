'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Vehicles', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      tenantId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'tenant_id',
        references: {
          model: 'Tenants',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      vehicleNumber: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        field: 'vehicle_number'
      },

      vehicleType: {
        type: Sequelize.ENUM(
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
        field: 'vehicle_type'
      },

      make: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      model: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      color: {
        type: Sequelize.STRING(50),
        allowNull: true
      },

      vinNumber: {
        type: Sequelize.STRING(17),
        allowNull: true,
        unique: true,
        field: 'vin_number'
      },

      licensePlate: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
        field: 'license_plate'
      },

      registrationExpiry: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'registration_expiry'
      },

      insuranceExpiry: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'insurance_expiry'
      },

      capacity: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },

      fuelType: {
        type: Sequelize.ENUM(
          'PETROL',
          'DIESEL',
          'ELECTRIC',
          'HYBRID',
          'CNG',
          'LPG'
        ),
        allowNull: false,
        field: 'fuel_type'
      },

      mileage: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },

      status: {
        type: Sequelize.ENUM(
          'ACTIVE',
          'INACTIVE',
          'MAINTENANCE',
          'RETIRED',
          'OUT_OF_SERVICE'
        ),
        allowNull: false,
        defaultValue: 'ACTIVE'
      },

      lastServiceDate: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'last_service_date'
      },

      nextServiceDate: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'next_service_date'
      },

      purchaseDate: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'purchase_date'
      },

      purchasePrice: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
        field: 'purchase_price'
      },

      currentValue: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
        field: 'current_value'
      },

      assignedDriverId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        field: 'assigned_driver_id'
      },

      gpsTrackerId: {
        type: Sequelize.STRING(100),
        allowNull: true,
        field: 'gps_tracker_id'
      },

      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at'
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at'
      }
    });

    await queryInterface.addIndex('Vehicles', ['tenant_id']);
    await queryInterface.addIndex('Vehicles', ['vehicle_number']);
    await queryInterface.addIndex('Vehicles', ['license_plate']);
    await queryInterface.addIndex('Vehicles', ['status']);
    await queryInterface.addIndex('Vehicles', ['vehicle_type']);
    await queryInterface.addIndex('Vehicles', ['assigned_driver_id']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Vehicles');
  }
};
