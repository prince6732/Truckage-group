"use strict";

module.exports = (sequelize, DataTypes) => {
  const SubscriptionHistory = sequelize.define(
    "SubscriptionHistory",
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

      payement_mode: {
        type: DataTypes.ENUM("bankTransfer", "cash", "card", "upi"),
        allowNull: false,
      },

      transaction_id: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      transaction_details: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },

      subscription_type_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },

      price: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: false,
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
      tableName: "subscription_history",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return SubscriptionHistory;
};
