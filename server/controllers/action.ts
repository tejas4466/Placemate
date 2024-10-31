import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../config/drizzle';
import { uploadOnCloudinary } from '../utils/cloudinary';
import { applicants } from '../models/schema';

const saltRounds = 10;

// Define a type for req.files
type FilesType = {
    image?: Express.Multer.File[]; // Define the type for image files
    resume?: Express.Multer.File[]; // Define the type for resume files
};

// Register an applicant
export const registerApplicant = async (req: Request, res: Response) => {
    const { name, email, password, contact_no, address, dob, college_nm, qualification } = req.body;

    let imageUrl: string | null = null;
    let resumeUrl: string | null = null;

    try {
        const files = req.files as FilesType; // Assert the type of req.files

        // Upload image to Cloudinary if provided
        if (files && files.image && files.image[0]) {
            const imageFile = files.image[0].path; // Use the path to access the file
            const imageUploadResponse = await uploadOnCloudinary(imageFile);
            if (imageUploadResponse && imageUploadResponse.url) {
                imageUrl = imageUploadResponse.url; // Store the uploaded image URL
            }
        }

        // Upload resume to Cloudinary if provided
        if (files?.resume && files.resume[0]) {
            const resumeFile = files.resume[0].path; // Use the path to access the resume file
            const resumeUploadResponse = await uploadOnCloudinary(resumeFile);
            if (resumeUploadResponse && resumeUploadResponse.url) {
                resumeUrl = resumeUploadResponse.url; // Store the uploaded resume URL
            }
        }

        console.log(req.files); // Log the uploaded files for debugging

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
        console.error('Registration error:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error registering applicant', error: error instanceof Error ? error.message : error });
    }
};
