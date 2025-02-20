import { DataTypes } from "sequelize";
import sequelize from "../db.js";

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

await sequelize.sync(); // Sync models with database
console.log("✅ Views model synced with the database.");

export default Views;
