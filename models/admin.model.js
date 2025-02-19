import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Admin = sequelize.define("Admin", {
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

await sequelize.sync(); // Sync models with database
console.log("✅ Admin model synced with the database.");

export default Admin;
