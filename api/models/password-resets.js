"use strict";

module.exports = (sequelize, DataTypes) => {
  const PasswordResetToken = sequelize.define(
    "PasswordResetToken",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "password_reset_tokens",
      timestamps: false, 
    }
  );

  return PasswordResetToken;
};
