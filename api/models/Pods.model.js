"use strict";

module.exports = (sequelize, DataTypes) => {
  const Pod = sequelize.define(
    "Pod",
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

      load_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },

      consignor_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },

      driver: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },

      driver_contact: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },

      consignor_payment: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },

      consignor_payment_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      is_consignor_payment_online: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      consignor_payment_remark: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      driver_payment: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },

      driver_payment_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      is_driver_payment_online: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      driver_payment_remarks: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      driver_receiver_name: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },

      driver_receiver_contact: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },

      load_date: {
        type: DataTypes.DATE,
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
      tableName: "pods",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Pod;
};
