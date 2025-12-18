"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("drivers", {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      tenant_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: true,
        unique: true,
      },
      contact1: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      contact2: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      licence_number: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      licence_image: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      fintness_certificate_image: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "Fitness certificate image",
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
    });

    // Indexes
    await queryInterface.addIndex("drivers", ["tenant_id"]);
    await queryInterface.addIndex("drivers", ["licence_number"]);

    // Foreign Key
    await queryInterface.addConstraint("drivers", {
      fields: ["tenant_id"],
      type: "foreign key",
      name: "drivers_tenant_id_foreign",
      references: {
        table: "tenants",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "NO ACTION",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("drivers");
  },
};
