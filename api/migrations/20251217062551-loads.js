"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("loads", {
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
      trip_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },
      consignor_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },
      consignee_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },
      truck_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },
      truck_number: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      from: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      to: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      load_date: {
        type: Sequelize.DATE,
        allowNull: false,
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
    await queryInterface.addIndex("loads", ["tenant_id"]);
    // await queryInterface.addIndex("loads", ["trip_id"]);
    await queryInterface.addIndex("loads", ["truck_id"]);
    await queryInterface.addIndex("loads", ["consignor_id"]);
    await queryInterface.addIndex("loads", ["consignee_id"]);
    await queryInterface.addIndex("loads", ["status"]);
    await queryInterface.addIndex("loads", ["load_date"]);

    // Foreign Keys
    await queryInterface.addConstraint("loads", {
      fields: ["tenant_id"],
      type: "foreign key",
      name: "loads_tenant_id_foreign",
      references: {
        table: "tenants",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "NO ACTION",
    });

    // await queryInterface.addConstraint("loads", {
    //   fields: ["trip_id"],
    //   type: "foreign key",
    //   name: "loads_trip_id_foreign",
    //   references: {
    //     table: "trips",
    //     field: "id",
    //   },
    //   onDelete: "SET NULL",
    //   onUpdate: "NO ACTION",
    // });

    await queryInterface.addConstraint("loads", {
      fields: ["consignor_id"],
      type: "foreign key",
      name: "loads_consignor_id_foreign",
      references: {
        table: "consignors",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "NO ACTION",
    });

    await queryInterface.addConstraint("loads", {
      fields: ["consignee_id"],
      type: "foreign key",
      name: "loads_consignee_id_foreign",
      references: {
        table: "consignees",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "NO ACTION",
    });

    await queryInterface.addConstraint("loads", {
      fields: ["truck_id"],
      type: "foreign key",
      name: "loads_truck_id_foreign",
      references: {
        table: "trucks",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "NO ACTION",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("loads");
  },
};
