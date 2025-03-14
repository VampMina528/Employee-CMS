import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';
const {Pool} = pg;

const pool = new Pool({

  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  host: 'localhost',
  database: process.env.DB_NAME as string,
  port: 5432,
});

export const connectToDb = async () => {
  try {
    const db = await pool.connect();
    console.log ('Connected to database.');
    return db;
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1)
  }
};

export const closedDb = async ()=> {
  await pool.end()
}
