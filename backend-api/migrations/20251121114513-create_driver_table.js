'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Drivers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      tenant_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Tenants',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      vehicle_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Vehicles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      driver_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      licence_number: {
        type: Sequelize.STRING(50),
        allowNull: false
      },

      licence_expiry_date: {
        type: Sequelize.DATE,
        allowNull: true
      },

      contact_number: {
        type: Sequelize.STRING(15),
        allowNull: false
      },

      email: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      address: {
        type: Sequelize.STRING(255),
        allowNull: true
      },

      driver_image_url: {
        type: Sequelize.STRING(255),
        allowNull: true
      },

      licence_document_url: {
        type: Sequelize.STRING(255),
        allowNull: true
      },

      status: {
        type: Sequelize.ENUM('ACTIVE', 'INACTIVE'),
        allowNull: false,
        defaultValue: 'ACTIVE'
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('Drivers', ['tenant_id']);
    await queryInterface.addIndex('Drivers', ['vehicle_id']);
    await queryInterface.addIndex('Drivers', ['driver_name']);
    await queryInterface.addIndex('Drivers', ['licence_number']);
    await queryInterface.addIndex('Drivers', ['contact_number']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Drivers');
  }
};
