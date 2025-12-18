"use strict";

module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define(
    "State",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "states",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: false,
      deletedAt: "deleted_at",
    }
  );

  return State;
};
