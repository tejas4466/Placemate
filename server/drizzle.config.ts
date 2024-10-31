import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './models/schema.ts', // Updated path without src
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Use non-null assertion if you're sure the env variable is set
  },
});
