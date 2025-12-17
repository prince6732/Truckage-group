const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class settings extends Model {}
  settings.init(
    {
      key: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true,
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "settings",
      timestamps: false,
    }
  );
  settings.removeAttribute("id");
  return settings;
};
