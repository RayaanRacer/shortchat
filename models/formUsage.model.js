import { DataTypes } from "sequelize";
import sequelize from "../db.js";

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

await sequelize.sync(); // Sync models with database
console.log("✅ FormUsage model synced with the database.");

export default FormUsage;
