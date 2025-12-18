"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      tenant_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      contact: {
        type: Sequelize.STRING(15),
        allowNull: true,
        unique: true,
      },
      role: {
        type: Sequelize.ENUM("ADMIN", "USER", "TRANSPORTER"),
        allowNull: true,
        defaultValue: "USER",
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addConstraint("users", {
      fields: ["tenant_id"],
      type: "foreign key",
      name: "users_tenant_id_foreign",
      references: {
        table: "tenants",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "NO ACTION",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("users");
  },
};
