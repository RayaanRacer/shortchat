import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const User = sequelize.define("User", {
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
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
  cdate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  referralCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

await sequelize.sync(); // Sync models with database
console.log("✅ User model synced with the database.");

export default User;
