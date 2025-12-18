"use strict";

module.exports = (sequelize, DataTypes) => {
  const SubscriptionType = sequelize.define(
    "SubscriptionType",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },

      price: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: false,
      },

      duration: {
        type: DataTypes.ENUM("week", "month", "halfYear", "year"),
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

      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "subscription_types",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  return SubscriptionType;
};
