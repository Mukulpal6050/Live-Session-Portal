import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let db;

try {
  db = await mysql.createPool({
    host: process.env.DB_HOST || "centerbeam.proxy.rlwy.net",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "hFHtHBzIqaSMFqeNIpeQzeylsqDYHSdC",
    database: process.env.DB_NAME || "railway",
    port: process.env.DB_PORT || 44721, // Railway public port
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  console.log("✅ MySQL connected successfully!");
} catch (error) {
  console.error("❌ Database connection failed:", error.message);
  process.exit(1);
}

export default db;
