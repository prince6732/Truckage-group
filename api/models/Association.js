module.exports = function associateModels(models) {
  const {
    City,
    State,
    Tenant,
    User,
    SubscriptionType,
    Subscription,
    SubscriptionHistory,
    Consignor,
    Consignee,
    TruckTypes,
    Driver,
    Truck,
    TruckDocument,
    TruckDetails,
    Load,
    Pod,
  } = models;

  // ============================================
  // State and City Relations
  // ============================================

  // City → State
  City.belongsTo(State, {
    foreignKey: "state_id",
    as: "state",
    onDelete: "RESTRICT",
  });

  // State → City
  State.hasMany(City, {
    foreignKey: "state_id",
    as: "cities",
  });

  // ============================================
  // Tenant Relations
  // ============================================

  // Tenant → City
  Tenant.belongsTo(City, {
    foreignKey: "city_id",
    as: "city",
    onDelete: "RESTRICT",
  });

  // City → Tenant
  City.hasMany(Tenant, {
    foreignKey: "city_id",
    as: "tenants",
  });

  // Tenant → Users
  Tenant.hasMany(User, {
    foreignKey: "tenant_id",
    as: "users",
  });

  // Tenant → Subscriptions
  Tenant.hasMany(Subscription, {
    foreignKey: "tenant_id",
    as: "subscriptions",
  });

  // Tenant → SubscriptionHistory
  Tenant.hasMany(SubscriptionHistory, {
    foreignKey: "tenant_id",
    as: "subscriptionHistory",
  });

  // Tenant → Consignors
  Tenant.hasMany(Consignor, {
    foreignKey: "tenant_id",
    as: "consignors",
  });

  // Tenant → Consignees
  Tenant.hasMany(Consignee, {
    foreignKey: "tenant_id",
    as: "consignees",
  });

  // Tenant → Trucks
  Tenant.hasMany(Truck, {
    foreignKey: "tenant_id",
    as: "trucks",
  });

  // Tenant → Drivers
  Tenant.hasMany(Driver, {
    foreignKey: "tenant_id",
    as: "drivers",
  });

  // Tenant → Loads
  Tenant.hasMany(Load, {
    foreignKey: "tenant_id",
    as: "loads",
  });

  // Tenant → Pods
  Tenant.hasMany(Pod, {
    foreignKey: "tenant_id",
    as: "pods",
  });

  // ============================================
  // User Relations
  // ============================================

  // User → Tenant
  User.belongsTo(Tenant, {
    foreignKey: "tenant_id",
    as: "tenant",
    onDelete: "CASCADE",
  });

  // ============================================
  // Subscription Relations
  // ============================================

  // Subscription → Tenant
  Subscription.belongsTo(Tenant, {
    foreignKey: "tenant_id",
    as: "tenant",
    onDelete: "CASCADE",
  });

  // Subscription → SubscriptionType
  Subscription.belongsTo(SubscriptionType, {
    foreignKey: "subscription_type_id",
    as: "subscriptionType",
    onDelete: "RESTRICT",
  });

  // SubscriptionType → Subscriptions
  SubscriptionType.hasMany(Subscription, {
    foreignKey: "subscription_type_id",
    as: "subscriptions",
  });

  // SubscriptionType → SubscriptionHistory
  SubscriptionType.hasMany(SubscriptionHistory, {
    foreignKey: "subscription_type_id",
    as: "subscriptionHistory",
  });

  // ============================================
  // SubscriptionHistory Relations
  // ============================================

  // SubscriptionHistory → Tenant
  SubscriptionHistory.belongsTo(Tenant, {
    foreignKey: "tenant_id",
    as: "tenant",
    onDelete: "CASCADE",
  });

  // SubscriptionHistory → SubscriptionType
  SubscriptionHistory.belongsTo(SubscriptionType, {
    foreignKey: "subscription_type_id",
    as: "subscriptionType",
    onDelete: "RESTRICT",
  });

  // ============================================
  // Consignor Relations
  // ============================================

  // Consignor → Tenant
  Consignor.belongsTo(Tenant, {
    foreignKey: "tenant_id",
    as: "tenant",
    onDelete: "CASCADE",
  });

  // Consignor → City
  Consignor.belongsTo(City, {
    foreignKey: "city_id",
    as: "city",
    onDelete: "RESTRICT",
  });

  // City → Consignors
  City.hasMany(Consignor, {
    foreignKey: "city_id",
    as: "consignors",
  });

  // Consignor → Loads
  Consignor.hasMany(Load, {
    foreignKey: "consignor_id",
    as: "loads",
  });

  // Consignor → Pods
  Consignor.hasMany(Pod, {
    foreignKey: "consignor_id",
    as: "pods",
  });

  // ============================================
  // Consignee Relations
  // ============================================

  // Consignee → Tenant
  Consignee.belongsTo(Tenant, {
    foreignKey: "tenant_id",
    as: "tenant",
    onDelete: "CASCADE",
  });

  // Consignee → City
  Consignee.belongsTo(City, {
    foreignKey: "city_id",
    as: "city",
    onDelete: "RESTRICT",
  });

  // City → Consignees
  City.hasMany(Consignee, {
    foreignKey: "city_id",
    as: "consignees",
  });

  // Consignee → Loads
  Consignee.hasMany(Load, {
    foreignKey: "consignee_id",
    as: "loads",
  });

  // ============================================
  // Truck Relations
  // ============================================

  // Truck → Tenant
  Truck.belongsTo(Tenant, {
    foreignKey: "tenant_id",
    as: "tenant",
    onDelete: "CASCADE",
  });

  // Truck → TruckType
  Truck.belongsTo(TruckTypes, {
    foreignKey: "truck_type_id",
    as: "truckType",
    onDelete: "RESTRICT",
  });

  // TruckType → Trucks
  TruckTypes.hasMany(Truck, {
    foreignKey: "truck_type_id",
    as: "trucks",
  });

  // Truck → Driver
  Truck.belongsTo(Driver, {
    foreignKey: "driver_id",
    as: "driver",
    onDelete: "SET NULL",
  });

  // Driver → Trucks
  Driver.hasMany(Truck, {
    foreignKey: "driver_id",
    as: "trucks",
  });

  // Truck → TruckDocument (One-to-One)
  Truck.hasOne(TruckDocument, {
    foreignKey: "truck_id",
    as: "document",
  });

  // TruckDocument → Truck
  TruckDocument.belongsTo(Truck, {
    foreignKey: "truck_id",
    as: "truck",
    onDelete: "CASCADE",
  });

  // Truck → TruckDetail (One-to-One)
  Truck.hasOne(TruckDetails, {
    foreignKey: "truck_id",
    as: "detail",
  });

  // TruckDetail → Truck
  TruckDetails.belongsTo(Truck, {
    foreignKey: "truck_id",
    as: "truck",
    onDelete: "CASCADE",
  });

  // Truck → Loads
  Truck.hasMany(Load, {
    foreignKey: "truck_id",
    as: "loads",
  });

  // ============================================
  // TruckDetail Relations
  // ============================================

  // TruckDetail → City (transport city)
  TruckDetails.belongsTo(City, {
    foreignKey: "transport_city_id",
    as: "transportCity",
    onDelete: "SET NULL",
  });

  // City → TruckDetails
  City.hasMany(TruckDetails, {
    foreignKey: "transport_city_id",
    as: "truckDetails",
  });

  // ============================================
  // Driver Relations
  // ============================================

  // Driver → Tenant
  Driver.belongsTo(Tenant, {
    foreignKey: "tenant_id",
    as: "tenant",
    onDelete: "CASCADE",
  });

  // ============================================
  // Load Relations
  // ============================================

  // Load → Tenant
  Load.belongsTo(Tenant, {
    foreignKey: "tenant_id",
    as: "tenant",
    onDelete: "CASCADE",
  });

  // Load → Consignor
  Load.belongsTo(Consignor, {
    foreignKey: "consignor_id",
    as: "consignor",
    onDelete: "SET NULL",
  });

  // Load → Consignee
  Load.belongsTo(Consignee, {
    foreignKey: "consignee_id",
    as: "consignee",
    onDelete: "SET NULL",
  });

  // Load → Truck
  Load.belongsTo(Truck, {
    foreignKey: "truck_id",
    as: "truck",
    onDelete: "SET NULL",
  });

  // Load → Pods
  Load.hasMany(Pod, {
    foreignKey: "load_id",
    as: "pods",
  });

  // ============================================
  // Pod Relations
  // ============================================

  // Pod → Tenant
  Pod.belongsTo(Tenant, {
    foreignKey: "tenant_id",
    as: "tenant",
    onDelete: "CASCADE",
  });

  // Pod → Load
  Pod.belongsTo(Load, {
    foreignKey: "load_id",
    as: "load",
    onDelete: "SET NULL",
  });

  // Pod → Consignor
  Pod.belongsTo(Consignor, {
    foreignKey: "consignor_id",
    as: "consignor",
    onDelete: "RESTRICT",
  });
};
