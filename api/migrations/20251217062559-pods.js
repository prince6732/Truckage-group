"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("pods", {
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
      load_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },
      consignor_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
      },
      driver: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      driver_contact: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      consignor_payment: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      consignor_payment_status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_consignor_payment_online: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      consignor_payment_remark: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      driver_payment: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      driver_payment_status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_driver_payment_online: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      driver_payment_remarks: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      driver_receiver_name: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      driver_receiver_contact: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      load_date: {
        type: Sequelize.DATE,
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
    });

    // Indexes
    await queryInterface.addIndex("pods", ["tenant_id"]);
    await queryInterface.addIndex("pods", ["load_id"]);
    await queryInterface.addIndex("pods", ["consignor_id"]);
    await queryInterface.addIndex("pods", ["load_date"]);

    // Foreign Keys
    await queryInterface.addConstraint("pods", {
      fields: ["tenant_id"],
      type: "foreign key",
      name: "pods_tenant_id_foreign",
      references: {
        table: "tenants",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "NO ACTION",
    });

    await queryInterface.addConstraint("pods", {
      fields: ["load_id"],
      type: "foreign key",
      name: "pods_load_id_foreign",
      references: {
        table: "loads",
        field: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "NO ACTION",
    });

    await queryInterface.addConstraint("pods", {
      fields: ["consignor_id"],
      type: "foreign key",
      name: "pods_consignor_id_foreign",
      references: {
        table: "consignors",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "NO ACTION",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("pods");
  },
};
