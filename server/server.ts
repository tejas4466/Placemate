import express, { Request, Response } from 'express';
import connection from './config/db'; // Ensure this path is correct
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Test route to check if the server is running and DB is connected
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running and ready to connect to the database.');
});

// Example route to get data from the database
app.get('/data', (req: Request, res: Response) => {
  const query = 'SELECT * FROM users'; // SQL query to fetch all data from the users table
  connection.query(query, (err: Error | null, results: any[]) => {
    if (err) {
      // Log error if query fails
      console.error('Error fetching data from database:', err);
      return res.status(500).json({ error: 'Error fetching data' });
    }
    
    // Log the results to the console
    console.log('Fetched users:', results); // Log the fetched data
    
    // Send the fetched data as JSON response
    res.json(results);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
