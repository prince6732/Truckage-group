"use strict";

module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define(
    "City",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },

      state_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },

      lat: {
        type: DataTypes.DECIMAL(10, 7),
        allowNull: true,
      },

      lng: {
        type: DataTypes.DECIMAL(10, 7),
        allowNull: true,
      },

      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "cities",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: false,
      deletedAt: "deleted_at",
    }
  );

  return City;
};
