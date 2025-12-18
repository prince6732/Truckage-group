"use strict";

module.exports = (sequelize, DataTypes) => {
  const Tenant = sequelize.define(
    "Tenant",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },

      activated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },

      deactivated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },

      contact1: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },

      contact2: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },

      city_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },

      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
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
      tableName: "tenants",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Tenant;
};
