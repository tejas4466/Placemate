import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST, // Load host from .env
  user: process.env.DB_USER, // Load username from .env
  password: process.env.DB_PASSWORD, // Load password from .env
  database: process.env.DB_NAME, // Load database name from .env
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

export default connection;
