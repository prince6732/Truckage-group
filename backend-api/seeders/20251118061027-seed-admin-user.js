"use strict";
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash("Admin@123", 10);

    // 🔹 1. Create Super Admin Tenant
    const tenantId = uuidv4();

    await queryInterface.bulkInsert(
      "Tenants",
      [
        {
          id: tenantId,
          name: "System Tenant",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // 🔹 2. Create Admin Users under that Tenant
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Super Admin 1",
          email: "admin1@example.com",
          phone: "9991110001",
          password: passwordHash,
          role: "ADMIN",
          status: "active",
          tenant_id: tenantId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Super Admin 2",
          email: "admin2@example.com",
          phone: "9991110002",
          password: passwordHash,
          role: "ADMIN",
          status: "active",
          tenant_id: tenantId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Super Admin 3",
          email: "admin3@example.com",
          phone: "9991110003",
          password: passwordHash,
          role: "ADMIN",
          status: "active",
          tenant_id: tenantId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", {
      role: "ADMIN",
    });

    await queryInterface.bulkDelete("Tenants", {
      name: "System Tenant",
    });
  },
};
