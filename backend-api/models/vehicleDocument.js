'use strict';

module.exports = (sequelize, DataTypes) => {
  const VehicleDocument = sequelize.define(
    'VehicleDocument',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      tenant_id: {
        type: DataTypes.UUID,
        allowNull: false
      },

      vehicle_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      document_type: {
        type: DataTypes.ENUM(
          'insurance',
          'rc_permit',
          'registration_certificate',
          'national_permit',
          'road_tax',
          'fitness_certificate',
          'drivers_license',
          'pollution_certificate',
          'other'
        ),
        allowNull: false
      },

      file_path: {
        type: DataTypes.STRING,
        allowNull: false
      },

      file_type: {
        type: DataTypes.ENUM('pdf', 'image'),
        allowNull: false
      },

      expiry_date: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      tableName: 'vehicle_documents',
      timestamps: true,
      underscored: false // 🔴 IMPORTANT (matches createdAt / updatedAt)
    }
  );

  VehicleDocument.associate = (models) => {
    VehicleDocument.belongsTo(models.Vehicle, {
      foreignKey: 'vehicle_id',
      as: 'vehicle'
    });
  };

  return VehicleDocument;
};
