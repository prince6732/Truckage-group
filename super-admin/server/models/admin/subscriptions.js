"use strict";

module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define(
    "Subscription",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
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
      tenant_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      subscription_type_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "subscriptions",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  Subscription.associate = (models) => {
    Subscription.belongsTo(models.Tenant, {
      foreignKey: "tenant_id",
      as: "tenant",
    });

    Subscription.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    Subscription.belongsTo(models.SubscriptionType, {
      foreignKey: "subscription_type_id",
      as: "subscriptionType",
    });
  };

  return Subscription;
};
