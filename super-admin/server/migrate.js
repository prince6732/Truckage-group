const { exec } = require("child_process");
const util = require("util");
const Sequelize = require("sequelize");
const config = require("./config/db.config");

const execAsync = util.promisify(exec);

const sequelize = new Sequelize({
  username: config.USER,
  password: config.PASSWORD,
  host: config.HOST,
  dialect: config.dialect,
  port: config.port,
  database: "postgres",
  logging: false,
});

async function run() {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL server.");

    const dbExists = await sequelize.query(
      `SELECT 1 FROM pg_database WHERE datname='${config.DB}'`
    );

    if (dbExists[0].length === 0) {
      console.log(`Database ${config.DB} does not exist. Creating...`);

      await sequelize.query(`CREATE DATABASE "${config.DB}"`);
      console.log(`Database ${config.DB} created successfully.`);
    } else {
      console.log(`Database ${config.DB} already exists.`);
    }

    console.log("Running migrations...");
    await execAsync(
      `npx sequelize-cli db:migrate --url="postgres://${config.USER}:${config.PASSWORD}@${config.HOST}:${config.port}/${config.DB}" --migrations-path=./migrations/admin`
    );
    console.log("Admin Tables Migrations completed.");
    await execAsync(
      `npx sequelize-cli db:migrate --url="postgres://${config.USER}:${config.PASSWORD}@${config.HOST}:${config.port}/${config.DB}" --migrations-path=./migrations/promotionalApplication`
    );
    console.log("Application Tables Migrations completed.");

    console.log("Running common seeders...");
    await execAsync(
      `npx sequelize-cli db:seed:all --url="postgres://${config.USER}:${config.PASSWORD}@${config.HOST}:${config.port}/${config.DB}" --seeders-path=./seeders/commonSeeder`
    );
    console.log("Common seeders completed.");

    console.log("Running admin seeders...");
    await execAsync(
      `npx sequelize-cli db:seed:all --url="postgres://${config.USER}:${config.PASSWORD}@${config.HOST}:${config.port}/${config.DB}" --seeders-path=./seeders/adminSeeder`
    );
    console.log("Admin seeders completed.");
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

run();
