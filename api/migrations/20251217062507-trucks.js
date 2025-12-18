"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("trucks", {
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
      driver_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },
      truck_number: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
        comment: "Vehicle registration number",
      },
      truck_model: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      model_number: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      chassis_number: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      engine_number: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      capacity: {
        type: Sequelize.DECIMAL(7, 2),
        allowNull: true,
        comment: "Capacity in tons",
      },
      fuel_type: {
        type: Sequelize.ENUM("diesel", "petrol", "cng", "electric"),
        allowNull: false,
        defaultValue: "diesel",
      },
      own_truck: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: "Owned or attached truck",
      },
      truck_type_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
      },
      note: {
        type: Sequelize.STRING(255),
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
    await queryInterface.addIndex("trucks", ["tenant_id"]);
    await queryInterface.addIndex("trucks", ["driver_id"]);
    await queryInterface.addIndex("trucks", ["truck_type_id"]);

    // Foreign Keys
    await queryInterface.addConstraint("trucks", {
      fields: ["tenant_id"],
      type: "foreign key",
      name: "trucks_tenant_id_foreign",
      references: {
        table: "tenants",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "NO ACTION",
    });

    await queryInterface.addConstraint("trucks", {
      fields: ["driver_id"],
      type: "foreign key",
      name: "trucks_driver_id_foreign",
      references: {
        table: "drivers",
        field: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "NO ACTION",
    });

    await queryInterface.addConstraint("trucks", {
      fields: ["truck_type_id"],
      type: "foreign key",
      name: "trucks_truck_type_id_foreign",
      references: {
        table: "truck_types",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "NO ACTION",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("trucks");
  },
};
