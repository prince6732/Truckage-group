"use strict";

module.exports = (sequelize, DataTypes) => {
  const TruckDocument = sequelize.define(
    "TruckDocument",
    {
      truck_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },

      document_type: {
        type: DataTypes.ENUM(
          "rc",
          "insurance",
          "permit",
          "fitness",
          "pollution",
          "other"
        ),
        allowNull: false,
      },

      document_image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      document_expiry_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      status: {
        type: DataTypes.BOOLEAN,
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
      tableName: "truck_documents",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return TruckDocument;
};
