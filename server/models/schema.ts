import { mysqlTable, varchar, int, timestamp, date} from 'drizzle-orm/mysql-core';

// Define the applicants table schema
export const applicants = mysqlTable('applicants', {
  id: int('id').primaryKey().autoincrement(), // Auto-incrementing primary key
  name: varchar('name', { length: 100 }).notNull(), // Applicant's name
  email: varchar('email', { length: 100 }).notNull().unique(), // Applicant's email (must be unique)
  password: varchar('password', { length: 255 }).notNull(), // Applicant's password
  contact_no: varchar('contact_no', { length: 15 }).notNull(), // Applicant's contact number
  address: varchar('address', { length: 255 }).notNull(), // Applicant's address
  dob: date('dob').notNull(), // Applicant's date of birth
  image: varchar('image', { length: 255 }), // Path to applicant's image
  resume: varchar('resume', { length: 255 }), // Path to applicant's resume
  qualification: varchar('qualification', { length: 255 }), // Applicant's qualification
  createdAt: timestamp('created_at').defaultNow(), // Timestamp for when the applicant was created
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(), // Timestamp for when the applicant was last updated
});

// Define the companies table schema
export const companies = mysqlTable('companies', {
    id: int('id').primaryKey().autoincrement(), // Auto-incrementing primary key
    company_name: varchar('company_name', { length: 100 }).notNull(), // Company name
    email: varchar('email', { length: 100 }).notNull().unique(), // Company email (must be unique)
    password: varchar('password', { length: 255 }).notNull(), // Company password
    contact_no: varchar('contact_no', { length: 15 }).notNull(), // Company contact number
    company_address: varchar('company_address', { length: 255 }).notNull(), // Company address
    company_website: varchar('company_website', { length: 255 }), // Company website URL
    image: varchar('image', { length: 255 }), // Path to company logo/image
    company_description: varchar('company_description', { length: 500 }), // Company description
    createdAt: timestamp('created_at').defaultNow(), // Timestamp for when the company was created
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(), // Timestamp for when the company was last updated
  });


// Define the jobs table schema
export const jobs = mysqlTable('jobs', {
    id: int('id').primaryKey().autoincrement(), // Auto-incrementing primary key
    job_title: varchar('job_title', { length: 100 }).notNull(), // Job title
    company_name: varchar('company_name', { length: 100 }).notNull(), // Company name
    job_type: varchar('job_type', { length: 50 }).notNull(), // Job type (e.g., full-time, part-time)
    job_post_date: timestamp('job_post_date').defaultNow(), // Timestamp for when the job was posted
    skills_required: varchar('skills_required', { length: 255 }).notNull(), // Skills required for the job
    location: varchar('location', { length: 100 }).notNull(), // Job location
    job_description: varchar('job_description', { length: 1000 }).notNull(), // Job description
    createdAt: timestamp('created_at').defaultNow(), // Timestamp for when the job was created
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(), // Timestamp for when the job was last updated
  });