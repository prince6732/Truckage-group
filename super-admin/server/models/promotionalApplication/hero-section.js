"use strict";

module.exports = (sequelize, DataTypes) => {
  const HeroSection = sequelize.define(
    "HeroSection",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subtitle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      customers_count: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      button1_text: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      button1_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      button2_text: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      button2_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
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
      tableName: "hero_section",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  HeroSection.associate = (models) => {};

  return HeroSection;
};
