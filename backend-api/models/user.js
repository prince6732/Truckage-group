"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      tenantId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'tenant_id',
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      role: {
        type: DataTypes.ENUM(
          "ADMIN",
          "PODMANAGER",
          "ACCOUNTMANAGER",
          "DRIVER",
          "USER"
        ),
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("active", "inactive", "blocked"),
        defaultValue: "active",
      },

      profile_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      last_login: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "users",
      paranoid: true, 
      timestamps: true,
    }
  );

  
  User.associate = (models) => {
    User.belongsTo(models.Tenant, {
      foreignKey: "tenantId",
      targetKey: "id",
    });
  };

  return User;
};
