const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mariadb", // Ensure it's MariaDB
    logging: console.log, // Enable logging to debug queries
    pool: {
      max: 10,
      min: 0,
      acquire: 60000, // Increase connection timeout
      idle: 10000,
    },
    dialectOptions: {
      connectTimeout: 60000, // Increase timeout to 60s
    },
  }
);

async function testSequelize() {
  try {
    // await sequelize.sync({ force: true });
    await sequelize.authenticate();
    console.log("✅ Sequelize connected to MariaDB!");
  } catch (error) {
    console.error("❌ Sequelize connection failed:", error);
  }
}

testSequelize();

module.exports = sequelize;
