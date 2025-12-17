'use strict';

module.exports = (sequelize, DataTypes) => {
  const Tenant = sequelize.define('Tenant', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Tenants',
    timestamps: true
  });

  Tenant.associate = (models) => {
    Tenant.hasMany(models.User, {
      foreignKey: 'tenant_id',
      sourceKey: 'id'
    });
  };

  return Tenant;
};
