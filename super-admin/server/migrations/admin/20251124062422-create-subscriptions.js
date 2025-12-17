"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("subscriptions", {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      tenant_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      subscription_type_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(7, 2),
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addIndex("subscriptions", ["tenant_id"]);
    await queryInterface.addIndex("subscriptions", ["user_id"]);
    await queryInterface.addIndex("subscriptions", ["subscription_type_id"]);

    await queryInterface.addConstraint("subscriptions", {
      fields: ["tenant_id"],
      type: "foreign key",
      name: "subscriptions_tenant_id_foreign",
      references: {
        table: "tenants",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "NO ACTION",
    });

    await queryInterface.addConstraint("subscriptions", {
      fields: ["user_id"],
      type: "foreign key",
      name: "subscriptions_user_id_foreign",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "NO ACTION",
    });

    await queryInterface.addConstraint("subscriptions", {
      fields: ["subscription_type_id"],
      type: "foreign key",
      name: "subscriptions_subscription_type_id_foreign",
      references: {
        table: "subscription_types",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "NO ACTION",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("subscriptions");
  },
};
