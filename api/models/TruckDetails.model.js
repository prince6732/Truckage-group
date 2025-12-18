"use strict";

module.exports = (sequelize, DataTypes) => {
  const TruckDetail = sequelize.define(
    "TruckDetail",
    {
      truck_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },

      driver: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      driver_contact: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },

      driver_address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      driver_image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      owner: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      owner_contact: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },

      owner_address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      transport: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },

      transport_city_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },

      transport_address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      transport_contacts: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "Comma separated contact numbers",
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
      tableName: "truck_details",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return TruckDetail;
};
