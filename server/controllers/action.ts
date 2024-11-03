import { Request, Response} from 'express';
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import db from '../config/drizzle';
import { uploadOnCloudinary } from '../utils/cloudinary';
import { applicants, companies,users,jobs} from '../models/schema';
import {eq} from 'drizzle-orm';

const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET || " ";

// Define a type for req.files used in registerApplicant
type FilesType = {
    image?: Express.Multer.File[];
    resume?: Express.Multer.File[];
};

// Register an applicant
export const registerApplicant = async (req: Request, res: Response) => {
    const { name, email, password, contact_no, address, dob, college_nm, qualification } = req.body;

    let imageUrl: string | null = null;
    let resumeUrl: string | null = null;

    try {
        const files = req.files as FilesType; // Assert the type of req.files

        // Upload image to Cloudinary if provided
        if (files?.image?.[0]) {
            const imageFile = files.image[0].path; // Use the path to access the file
            const imageUploadResponse = await uploadOnCloudinary(imageFile);
            if (imageUploadResponse?.secure_url) {
                imageUrl = imageUploadResponse.secure_url; // Store the uploaded image URL
            }
        }

        // Upload resume to Cloudinary if provided
        if (files?.resume?.[0]) {
            const resumeFile = files.resume[0].path; // Use the path to access the resume file
            const resumeUploadResponse = await uploadOnCloudinary(resumeFile);
            if (resumeUploadResponse?.secure_url) {
                resumeUrl = resumeUploadResponse.secure_url; // Store the uploaded resume URL
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the applicant's data into the database
        await db.insert(applicants).values({
            name,
            email,
            password: hashedPassword,
            contact_no,
            address,
            dob,
            college_nm,
            qualification,
            image: imageUrl,
            resume: resumeUrl,
        }).execute();

        await db.insert(users).values({
            name:name,
            email,
            password:hashedPassword,
            role:"applicant"
        }).execute();

        // Send a success response
        res.status(201).json({ message: 'Applicant registered successfully!' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering applicant', error: error instanceof Error ? error.message : error });
    }
};

// Register a company
export const registerCompany = async (req: Request, res: Response) => {
    const { company_name, email, password, contact_no, company_address, company_website, company_description } = req.body;

    let imageUrl: string | null = null;

    try {
        const file = req.file; // Access the single image file directly

        // Upload image to Cloudinary if provided
        if (file) {
            const imageUploadResponse = await uploadOnCloudinary(file.path);
            if (imageUploadResponse?.secure_url) {
                imageUrl = imageUploadResponse.secure_url; // Store the uploaded image URL
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the company's data into the database
        await db.insert(companies).values({
            company_name,
            email,
            password: hashedPassword,
            contact_no,
            company_address,
            company_website,
            image: imageUrl,
            company_description,
        }).execute();

        await db.insert(users).values({
            name:company_name,
            email,
            password:hashedPassword,
            role:"company"
        }).execute();

        // Send a success response
        res.status(201).json({ message: 'Company registered successfully!' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering company', error: error instanceof Error ? error.message : error });
    }
};

// List all companies
export const listCompanies = async (req: Request, res: Response) => {
    try {
        // Fetch all companies from the 'companies' table
        const allCompanies = await db.select().from(companies).execute();

        // Send the list of companies as a JSON response
        res.status(200).json(allCompanies);
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).json({ message: 'Error fetching companies', error: error instanceof Error ? error.message : error });
    }
};

// List all jobs
export const listJobs = async (req: Request, res: Response) => {
  try {
      // Fetch all jobs from the 'jobs' table
      const allJobs = await db.select().from(jobs).execute();

      // Send the list of jobs as a JSON response
      res.status(200).json(allJobs);
  } catch (error) {
      console.error('Error fetching jobs:', error);
      res.status(500).json({ message: 'Error fetching jobs', error: error instanceof Error ? error.message : error });
  }
};


export const loginApplicant = async (req: Request, res: Response)=> {
    try {
      const { email, password } = req.body;
      console.log(email);
  
      // Check if email and password are provided
      if (!email || !password) {
          res.status(400).json({ message: "Email and password are required" });
          return;
      }
  
         // Find the user by email in the database
            const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);
  
      // If user is not found, return error
      if (!user || user.length === 0) {
       res.status(401).json({ message: "Invalid email or password" });
       return;
      }
      if(user[0].role !== 'applicant')return ;
  
    //   Check the password with bcrypt
      const passwordMatch = await bcrypt.compare(password, user[0].password);
      if (!passwordMatch) {
          res.status(401).json({ message: "Invalid email or password" });
          return;
      }
  
    //   // Extract the user's role
      const userRole = user[0].role;
  
    //   // Create a JWT payload with user ID and role
      const token = jwt.sign(
        { id: user[0].id, role: userRole },
        JWT_SECRET,
        { expiresIn: "1h" } // Token expiration time
      );
  
      // Respond with the token and role
        res.status(200).json({
        message: "Login successful!",
        AuthToken:token,
        role: userRole,

      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Server error" });
      return; 
    }
  };
export const loginCompany = async (req: Request, res: Response)=> {
    try {
      const { email, password } = req.body;
      console.log(email);
  
      // Check if email and password are provided
      if (!email || !password) {
          res.status(400).json({ message: "Email and password are required" });
          return;
      }
  
         // Find the user by email in the database
            const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);
  
      // If user is not found, return error
      if (!user || user.length === 0) {
       res.status(401).json({ message: "Invalid email or password" });
       return;
      }
      if(user[0].role !== 'company')return ;
  
    //   Check the password with bcrypt
      const passwordMatch = await bcrypt.compare(password, user[0].password);
      if (!passwordMatch) {
          res.status(401).json({ message: "Invalid email or password" });
          return;
      }
  
    //   // Extract the user's role
      const userRole = user[0].role;
  
    //   // Create a JWT payload with user ID and role
      const token = jwt.sign(
        { id: user[0].id, role: userRole },
        JWT_SECRET,
        { expiresIn: "1h" } // Token expiration time
      );
  
      // Respond with the token and role
        res.status(200).json({
        message: "Login successful!",
        AuthToken:token,
        role: userRole,

      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Server error" });
      return; 
    }
  };
export const loginAdmin = async (req: Request, res: Response)=> {
    try {
      const { email, password } = req.body;
  
      // Check if email and password are provided
      if (!email || !password) {
          res.status(400).json({ message: "Email and password are required" });
          return;
      }
  
         // Find the user by email in the database
            const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);
  
      // If user is not found, return error
      if (!user || user.length === 0) {
       res.status(401).json({ message: "Invalid email or password" });
       return;
      }
      if(user[0].role !== 'admin')return ;
  
    //   Check the password with bcrypt
      const passwordMatch = await bcrypt.compare(password, user[0].password);
      if (!passwordMatch) {
          res.status(401).json({ message: "Invalid email or password" });
          return;
      }
  
    //   // Extract the user's role
      const userRole = user[0].role;  
    //   // Create a JWT payload with user ID and role
      const token = jwt.sign(
        { id: user[0].id, role: userRole },
        JWT_SECRET,
        { expiresIn: "1h" } // Token expiration time
      );
      const userDetails={
        id:user[0].id,
        name:user[0].name,
        email:user[0].email,
        role:user[0].role
      }
      // Respond with the token and role
        res.status(200).json({
        message: "Login successful!",
        AuthToken:token,
        role: userRole,
        userData:userDetails,
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Server error" });
      return; 
    }
  };

  // Register a job
export const registerJob = async (req: Request, res: Response) => {
  const { job_title, company_name, job_type, skills_required, location, job_description } = req.body;

  try {
      // Insert the job data into the `jobs` table
      await db.insert(jobs).values({
          job_title,
          company_name,
          job_type,
          skills_required,
          location,
          job_description,
      }).execute();

      // Send a success response
      res.status(201).json({ message: 'Job registered successfully!' });
  } catch (error) {
      console.error('Job registration error:', error);
      res.status(500).json({ message: 'Error registering job', error: error instanceof Error ? error.message : error });
  }
};

