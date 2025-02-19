import { DataTypes } from "sequelize";
import sequelize from "../db.js";

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

await sequelize.sync(); // Sync models with database
console.log("✅ Employee model synced with the database.");

export default Employee;
