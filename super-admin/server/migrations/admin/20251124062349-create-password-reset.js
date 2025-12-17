"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("password_reset_tokens", {
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW() + INTERVAL '24 HOURS'"),
      },
    });

    await queryInterface.sequelize.query(`
      UPDATE password_reset_tokens
      SET expires_at = created_at + INTERVAL '24 HOURS'
      WHERE expires_at IS NULL
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("password_reset_tokens");
  },
};
