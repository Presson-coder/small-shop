import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const query = (text, params) => pool.query(text, params);

export const connectToDatabase = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to the PostgreSQL database");
    client.release();
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};
