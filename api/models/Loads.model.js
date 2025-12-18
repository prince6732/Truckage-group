"use strict";

module.exports = (sequelize, DataTypes) => {
  const Load = sequelize.define(
    "Load",
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

      trip_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },

      consignor_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },

      consignee_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },

      truck_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },

      truck_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },

      from: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },

      to: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },

      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      load_date: {
        type: DataTypes.DATE,
        allowNull: false,
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
      tableName: "loads",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  return Load;
};
