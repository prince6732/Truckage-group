"use strict";

module.exports = (sequelize, DataTypes) => {
  const Consignee = sequelize.define(
    "Consignee",
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

      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },

      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      contact1: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },

      contact2: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },

      city_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },

      gst_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },

      pan_number: {
        type: DataTypes.STRING(20),
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

      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      tableName: "consignees",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  return Consignee;
};
