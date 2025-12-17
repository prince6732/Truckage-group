module.exports = function associateModels(models) {
  const { User, Tenant, City, State, Subscription, SubscriptionType } = models;

  User.belongsTo(Tenant, { foreignKey: "tenant_id", onDelete: "RESTRICT" });
  Tenant.hasMany(User, { foreignKey: "tenant_id" });

  City.belongsTo(State, { foreignKey: "state_id", onDelete: "RESTRICT" });
  State.hasMany(City, { foreignKey: "state_id" });

  Tenant.belongsTo(City, { foreignKey: "city_id", onDelete: "RESTRICT" });
  City.hasMany(Tenant, { foreignKey: "city_id" });

  Tenant.belongsTo(SubscriptionType, {
    foreignKey: "subscription_type_id",
    onDelete: "RESTRICT",
  });
  SubscriptionType.hasMany(Tenant, {
    foreignKey: "subscription_type_id",
  });

  Subscription.belongsTo(Tenant, {
    foreignKey: "tenant_id",
    onDelete: "RESTRICT",
  });
  Tenant.hasMany(Subscription, { foreignKey: "tenant_id" });

  Subscription.belongsTo(User, { foreignKey: "user_id", onDelete: "RESTRICT" });
  User.hasMany(Subscription, { foreignKey: "user_id" });

  Subscription.belongsTo(SubscriptionType, {
    foreignKey: "subscription_type_id",
    onDelete: "RESTRICT",
  });
  SubscriptionType.hasMany(Subscription, {
    foreignKey: "subscription_type_id",
  });
};
