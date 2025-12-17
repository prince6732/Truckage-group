"use strict";

module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define(
    "Driver",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      tenant_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      vehicle_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      driver_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      licence_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      licence_expiry_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      contact_number: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      driver_image_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      licence_document_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      status: {
        type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
        allowNull: false,
        defaultValue: "ACTIVE",
      },
    },
    {
      tableName: "Drivers",
      timestamps: true,
      underscored: true, 
    }
  );

  // 🔗 Associations
  Driver.associate = (models) => {
    // Tenant → Drivers
    Driver.belongsTo(models.Tenant, {
      foreignKey: "tenant_id",
      as: "tenant",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // Vehicle → Drivers
    Driver.belongsTo(models.Vehicle, {
      foreignKey: "vehicle_id",
      as: "vehicle",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  };

  return Driver;
};
