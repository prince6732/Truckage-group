"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      tenant_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },

      name: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING(40),
        allowNull: true,
        unique: true,
      },

      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      contact: {
        type: DataTypes.STRING(15),
        allowNull: true,
        unique: true,
      },

      role: {
        type: DataTypes.ENUM("ADMIN", "USER", "TRANSPORTER"),
        allowNull: true,
        defaultValue: "USER",
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
      tableName: "users",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  return User;
};
