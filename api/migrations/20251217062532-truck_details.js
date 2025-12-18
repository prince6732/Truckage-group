"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("truck_details", {
      truck_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      driver: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      driver_contact: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      driver_address: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      driver_image: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      owner: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      owner_contact: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      owner_address: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      transport: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      transport_city_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },
      transport_address: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      transport_contacts: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: "Comma separated contact numbers",
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
    await queryInterface.addIndex("truck_details", ["truck_id"]);
    await queryInterface.addIndex("truck_details", ["transport_city_id"]);

    // Foreign Keys
    await queryInterface.addConstraint("truck_details", {
      fields: ["truck_id"],
      type: "foreign key",
      name: "truck_details_truck_id_foreign",
      references: {
        table: "trucks",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "NO ACTION",
    });

    await queryInterface.addConstraint("truck_details", {
      fields: ["transport_city_id"],
      type: "foreign key",
      name: "truck_details_transport_city_id_foreign",
      references: {
        table: "cities",
        field: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "NO ACTION",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("truck_details");
  },
};
