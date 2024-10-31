import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../config/drizzle';
// import { uploadOnCloudinary } from '../utils/cloudinary';
import { applicants } from '../models/schema';

const saltRounds = 10;

// Register an applicant
export const registerApplicant = async (req: Request, res: Response)=> {
    const { name, email, password, contact_no, address, dob, college_nm, qualification } = req.body;

    // // Access files uploaded by Multer
    // const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    // const imagePath = files['image'] ? files['image'][0].path : null;
    // const resumePath = files['resume'] ? files['resume'][0].path : null;

    try {
        // // Check if the applicant already exists
        // const existingApplicant = await db
        //     .select()
        //     .from(applicants)
        //     .where(email)
        //     .execute();

        // if (existingApplicant.length > 0) {
        //     return res.status(400).json({ message: 'Applicant already exists with this email.' });
        // }

        // // Upload image and resume to Cloudinary
        // const imageResponse = await uploadOnCloudinary(imagePath);
        // const resumeResponse = await uploadOnCloudinary(resumePath);

        // // Get URLs from Cloudinary responses
        // const imageUrl = imageResponse ? imageResponse.secure_url : null;
        // const resumeUrl = resumeResponse ? resumeResponse.secure_url : null;

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
            // image: imageUrl,
            // resume: resumeUrl,
        }).execute();

        // Send a success response
        res.status(201).json({ message: 'Applicant registered successfully!' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering applicant', error });
    }
};
