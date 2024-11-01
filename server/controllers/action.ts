import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../config/drizzle';
import { uploadOnCloudinary } from '../utils/cloudinary';
import { applicants, companies } from '../models/schema';

const saltRounds = 10;

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