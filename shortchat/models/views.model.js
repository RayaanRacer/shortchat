const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");

const Views = sequelize.define("Views", {
  date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  modelName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  modelNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  deviceId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cdate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  new: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("✅ Views model synced with the database.");
  })
  .catch((err) => {
    console.error("❌ Error syncing Views model:", err);
  });

module.exports = Views;
