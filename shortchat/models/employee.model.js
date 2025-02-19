const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");

const Employee = sequelize.define("Employee", {
  referralCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("✅ Employee model synced with the database.");
  })
  .catch((err) => {
    console.error("❌ Error syncing Employee model:", err);
  });

module.exports = Employee;
