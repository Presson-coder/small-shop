import { Pool } from "pg";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=require`;

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

console.log('connectionString:', connectionString);

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
