"use strict";

module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define(
    "Driver",
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

      email: {
        type: DataTypes.STRING(150),
        allowNull: true,
        unique: true,
      },

      contact1: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },

      contact2: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },

      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      licence_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },

      licence_image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      fintness_certificate_image: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "Fitness certificate image",
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
      tableName: "drivers",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  return Driver;
};
