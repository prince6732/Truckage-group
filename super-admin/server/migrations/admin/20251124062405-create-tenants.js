"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tenants", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      db_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
      image: {
        type: Sequelize.STRING(60),
        allowNull: true,
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
      subscription_type_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },
      city_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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

    await queryInterface.addIndex("tenants", ["city_id"]);

    await queryInterface.addConstraint("tenants", {
      fields: ["city_id"],
      type: "foreign key",
      name: "tenants_city_id_foreign",
      references: {
        table: "cities",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "NO ACTION",
    });

    await queryInterface.addConstraint("tenants", {
      fields: ["subscription_type_id"],
      type: "foreign key",
      name: "tenants_subscription_type_id_foreign",
      references: {
        table: "subscription_types",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "NO ACTION",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("tenants");
  },
};
