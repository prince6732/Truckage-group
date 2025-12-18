require("dotenv").config();

module.exports = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "postgres",
  PASSWORD: process.env.DB_PASSWORD || "root1234",
  DB: process.env.DB_NAME || "truckage_group",
  dialect: process.env.DB_DIALECT || "postgres",
  port: process.env.DB_PORT || 5432,
};
