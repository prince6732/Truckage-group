'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vehicle_documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
        allowNull: false,
        references: {
          model: 'Vehicles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      document_type: {
        type: Sequelize.ENUM(
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
        type: Sequelize.STRING,
        allowNull: false
      },

      file_type: {
        type: Sequelize.ENUM('pdf', 'image'),
        allowNull: false
      },

      expiry_date: {
        type: Sequelize.DATE,
        allowNull: true
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('vehicle_documents');
  }
};
