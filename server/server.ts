// server.ts
import express, { Request, Response } from 'express';
import db from './config/drizzle';
import dotenv from 'dotenv';
import { applicants } from './models/schema';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Test route to check if the server is running
app.get('/', (req: Request, res: Response) => {
    res.send('Server is running and ready to connect to the database.');
});

// Example route to get data from the database
app.get('/users', async (req: Request, res: Response) => {
    try {
        const fetchedUsers = await db.select().from(applicants);
        console.log('Fetched users:', fetchedUsers);
        res.json(fetchedUsers); // Return the fetched users
    } catch (err) {
        console.error('Error fetching data from database:', err);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
