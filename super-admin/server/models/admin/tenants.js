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
      db_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.STRING(60),
        allowNull: true,
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
      subscription_type_id: {
        type: DataTypes.BIGINT.UNSIGNED,
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

  Tenant.associate = (models) => {
    Tenant.belongsTo(models.City, {
      foreignKey: "city_id",
      as: "city",
    });

    Tenant.belongsTo(models.SubscriptionType, {
      foreignKey: "subscription_type_id",
      as: "subscriptionType",
    });

    Tenant.hasMany(models.User, {
      foreignKey: "tenant_id",
      as: "users",
    });
  };

  return Tenant;
};
