"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("consignees", {
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
      address: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      contact1: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      contact2: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      city_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
      },
      gst_number: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      pan_number: {
        type: Sequelize.STRING(20),
        allowNull: true,
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
    await queryInterface.addIndex("consignees", ["tenant_id"]);
    await queryInterface.addIndex("consignees", ["city_id"]);
    await queryInterface.addIndex("consignees", ["status"]);

    // Foreign Keys
    await queryInterface.addConstraint("consignees", {
      fields: ["tenant_id"],
      type: "foreign key",
      name: "consignees_tenant_id_foreign",
      references: {
        table: "tenants",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "NO ACTION",
    });

    await queryInterface.addConstraint("consignees", {
      fields: ["city_id"],
      type: "foreign key",
      name: "consignees_city_id_foreign",
      references: {
        table: "cities",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "NO ACTION",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("consignees");
  },
};
