"use strict";

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    const adminEmail = "admin@topntech.com";

    const existingAdmin = await queryInterface.rawSelect(
      "users",
      { where: { email: adminEmail } },
      ["id"]
    );

    const hashedPassword = await bcrypt.hash("root1234", 10);

    const usersToInsert = [];

    if (!existingAdmin) {
      usersToInsert.push({
        name: "Admin",
        email: adminEmail,
        contact: null,
        tenant_id: null,
        password: hashedPassword,
        role: "ADMIN",
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      });
    }

    if (usersToInsert.length > 0) {
      await queryInterface.bulkInsert("users", usersToInsert);
      console.log("Users seeded successfully:", usersToInsert.length);
    } else {
      console.log("Admin User already exist. Seeder skipped.");
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "users",
      {
        email: ["admin@topntech.com"],
      },
      {}
    );
  },
};
