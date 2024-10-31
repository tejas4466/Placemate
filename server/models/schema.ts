import { mysqlTable, varchar, int, timestamp, date} from 'drizzle-orm/mysql-core';

export const applicants = mysqlTable('applicants', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  contact_no: varchar('contact_no', { length: 255 }).notNull(),
  address: varchar('address', { length: 255 }).notNull(),
  dob: date('dob').notNull(),
  college_nm: varchar('college_nm', { length: 255 }),
  qualification: varchar('qualification', { length: 255 }),
  image: varchar('image', { length: 255 }),
  resume: varchar('resume', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const companies = mysqlTable('companies', {
  id: int('id').primaryKey().autoincrement(),
  company_name: varchar('company_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  contact_no: varchar('contact_no', { length: 15 }).notNull(),
  company_address: varchar('company_address', { length: 255 }).notNull(),
  company_website: varchar('company_website', { length: 255 }),
  image: varchar('image', { length: 255 }),
  company_description: varchar('company_description', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const jobs = mysqlTable('jobs', {
  id: int('id').primaryKey().autoincrement(),
  job_title: varchar('job_title', { length: 100 }).notNull(),
  company_name: varchar('company_name', { length: 100 }).notNull(),
  job_type: varchar('job_type', { length: 50 }).notNull(),
  job_post_date: timestamp('job_post_date').defaultNow(),
  skills_required: varchar('skills_required', { length: 255 }).notNull(),
  location: varchar('location', { length: 100 }).notNull(),
  job_description: varchar('job_description', { length: 1000 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});
