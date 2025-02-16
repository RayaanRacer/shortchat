import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: "88.99.219.30", // Use your DB_HOST
  user: "alldishi_shortchat_admin",
  password: "DmqJEChbygs5",
  database: "alldishi_shortchat",
  port: 3306, // Explicitly specify the port
  connectionLimit: 5,
});

async function testConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("✅ Connected to MariaDB!");
  } catch (err) {
    console.error("❌ Connection error:", err);
  } finally {
    if (conn) conn.end();
  }
}

testConnection();
