const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  pool: dbConfig.pool,
  logging: false,
});

const db = {};

// admin models
db.User = require("./admin/users.js")(sequelize, DataTypes);
db.Tenant = require("./admin/tenants")(sequelize, DataTypes);
db.State = require("./admin/states")(sequelize, DataTypes);
db.City = require("./admin/cities")(sequelize, DataTypes);
db.Subscription = require("./admin/subscriptions")(sequelize, DataTypes);
db.SubscriptionType = require("./admin/subscription-types")(
  sequelize,
  DataTypes
);
db.Settings = require("./admin/settings")(sequelize, DataTypes);
db.PasswordReset = require("./admin/password-resets")(sequelize, DataTypes);
require("./admin/AdminAssociations.js")(db);

// promtional application models
db.HeroSection = require("./promotionalApplication/hero-section.js")(
  sequelize,
  DataTypes
);
db.OurServices = require("./promotionalApplication/our-services.js")(
  sequelize,
  DataTypes
);
db.Templates = require("./promotionalApplication/templates.js")(
  sequelize,
  DataTypes
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
