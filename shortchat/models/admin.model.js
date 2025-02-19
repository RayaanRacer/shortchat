const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");

const Admin = sequelize.define("Admin", {
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("✅ Admin model synced with the database.");
  })
  .catch((err) => {
    console.error("❌ Error syncing Admin model:", err);
  });

module.exports = Admin;
