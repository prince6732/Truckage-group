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

db.City = require("./Cities.model.js")(sequelize, DataTypes);
db.Consignee = require("./Consignees.model.js")(sequelize, DataTypes);
db.Consignor = require("./Consignors.model.js")(sequelize, DataTypes);
db.Driver = require("./Drivers.model.js")(sequelize, DataTypes);
db.Load = require("./Loads.model.js")(sequelize, DataTypes);
db.PasswordReset = require("./password-resets.js")(sequelize, DataTypes);
db.Pod = require("./Pods.model.js")(sequelize, DataTypes);
db.Setting = require("./Settings.model.js")(sequelize, DataTypes);
db.State = require("./States.model.js")(sequelize, DataTypes);
db.SubscriptionHistory = require("./SubscriptionHistory.model.js")(
  sequelize,
  DataTypes
);
db.Subscription = require("./Subscriptions.model.js")(sequelize, DataTypes);
db.SubscriptionType = require("./SubscriptionTypes.model.js")(
  sequelize,
  DataTypes
);
db.Tenant = require("./Tenants.model.js")(sequelize, DataTypes);
db.TruckDetails = require("./TruckDetails.model.js")(sequelize, DataTypes);
db.TruckDocument = require("./TruckDocuments.model.js")(sequelize, DataTypes);
db.Truck = require("./Trucks.model.js")(sequelize, DataTypes);
db.TruckTypes = require("./TruckTypes.model.js")(sequelize, DataTypes);
db.User = require("./Users.model.js")(sequelize, DataTypes);

require("./Association.js")(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
