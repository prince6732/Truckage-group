"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("truck_documents", {
      truck_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      document_type: {
        type: Sequelize.ENUM(
          "rc",
          "insurance",
          "permit",
          "fitness",
          "pollution",
          "other"
        ),
        allowNull: false,
      },
      document_image: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      document_expiry_date: {
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
    await queryInterface.addIndex("truck_documents", ["truck_id"]);
    await queryInterface.addIndex("truck_documents", ["document_type"]);

    // Foreign Key
    await queryInterface.addConstraint("truck_documents", {
      fields: ["truck_id"],
      type: "foreign key",
      name: "truck_documents_truck_id_foreign",
      references: {
        table: "trucks",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "NO ACTION",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("truck_documents");
  },
};
