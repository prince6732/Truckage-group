"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING(40),
        unique: true,
        allowNull: true,
      },

      phone: {
        type: DataTypes.STRING(15),
        unique: true,
        allowNull: true,
      },

      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      tenant_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },

      role: {
        type: DataTypes.ENUM("ADMIN", "USER", "TRANSPORTER"),
        allowNull: true,
        defaultValue: "USER",
      },

      email_verified_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      provider: {
        type: DataTypes.ENUM("google", "facebook", "twitter", "github"),
        allowNull: true,
      },

      provider_id: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: true,
      },

      verification_code: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },

      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      remember_token: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("NOW()"),
      },

      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("NOW()"),
      },

      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",

      paranoid: true,
      deletedAt: "deleted_at",

      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return User;
};
