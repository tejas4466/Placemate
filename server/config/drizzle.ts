// drizzle.ts
import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise'; // Use promise-based API for better async support

// Load environment variables from .env file
dotenv.config();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,         // Load host from .env
  user: process.env.DB_USER,         // Load username from .env
  password: process.env.DB_PASSWORD, // Load password from .env
  database: process.env.DB_NAME,     // Load database name from .env
  waitForConnections: true,           // Enable waiting for connections
  connectionLimit: 10,                // Maximum number of connections
  queueLimit: 0                       // No limit for the queue of waiting connections
});

// Create the Drizzle ORM instance
const db = drizzle(pool);

// Export the db instance
export default db;
