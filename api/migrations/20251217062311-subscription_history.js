"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("subscription_history", {
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
      payement_mode: {
        type: Sequelize.ENUM("bankTransfer", "cash", "card", "upi"),
        allowNull: false,
      },
      transaction_id: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      transaction_details: {
        type: Sequelize.STRING(256),
        allowNull: true,
      },
      subscription_type_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(7, 2),
        allowNull: false,
      },
      activated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      deactivated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
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

    await queryInterface.addIndex("subscription_history", ["tenant_id"]);
    await queryInterface.addIndex("subscription_history", [
      "subscription_type_id",
    ]);

    await queryInterface.addConstraint("subscription_history", {
      fields: ["tenant_id"],
      type: "foreign key",
      name: "subscription_history_tenant_id_foreign",
      references: {
        table: "tenants",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "NO ACTION",
    });

    await queryInterface.addConstraint("subscription_history", {
      fields: ["subscription_type_id"],
      type: "foreign key",
      name: "subscription_history_subscription_type_id_foreign",
      references: {
        table: "subscription_types",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "NO ACTION",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("subscription_history");
  },
};
