"use strict";
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define(
    "City",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      state_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      pincode: {
        type: DataTypes.STRING(6),
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "cities",
      timestamps: false,
      paranoid: false,
    }
  );

  City.associate = (models) => {
    City.belongsTo(models.State, {
      foreignKey: "state_id",
      as: "state",
      onDelete: "RESTRICT",
      onUpdate: "NO ACTION",
    });
  };

  return City;
};
