import { Pool } from "pg";

const pool = new Pool({
  user: "your_username",
  host: "localhost",
  database: "your_database",
  password: "your_password",
  port: 5432,
});

export const query = (text, params) => pool.query(text, params);

export const connect = async () => {
  try {
    await pool.connect();
    console.log("Connected to the PostgreSQL database");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};
