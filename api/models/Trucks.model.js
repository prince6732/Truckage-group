"use strict";

module.exports = (sequelize, DataTypes) => {
  const Truck = sequelize.define(
    "Truck",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      tenant_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      driver_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },

      truck_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        comment: "Vehicle registration number",
      },

      truck_model: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      model_number: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      chassis_number: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      engine_number: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      capacity: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: true,
        comment: "Capacity in tons",
      },

      fuel_type: {
        type: DataTypes.ENUM("diesel", "petrol", "cng", "electric"),
        allowNull: false,
        defaultValue: "diesel",
      },

      own_truck: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: "Owned or attached truck",
      },

      truck_type_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },

      note: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "trucks",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Truck;
};
