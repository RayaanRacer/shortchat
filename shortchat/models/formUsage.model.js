const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");

const FormUsage = sequelize.define("FormUsage", {
  date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  time: {
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
  whatsappNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("✅ FormUsage model synced with the database.");
  })
  .catch((err) => {
    console.error("❌ Error syncing FormUsage model:", err);
  });

module.exports = FormUsage;
