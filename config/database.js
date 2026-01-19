import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER ?? "",
  host: process.env.DB_HOST ?? "",
  database: process.env.DB_NAME ?? "",
  password: process.env.DB_PASSWORD ?? "",
  port: parseInt(process.env.DB_PORT ?? "5432", 10) || 5432,
});

export const query = (text, params) => pool.query(text, params);

export const connectToDatabase = async () => {
  try {
    await pool.connect();
    console.log("Connected to the PostgreSQL database");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};
