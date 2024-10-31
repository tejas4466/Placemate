import cloudinary from 'cloudinary';
import fs from 'fs';

// Configuration
cloudinary.v2.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Uploads a file to Cloudinary.
 * @param localFilePath - The local path of the file to upload.
 * @returns The response from Cloudinary, or null if the upload failed.
 */
export const uploadOnCloudinary = async (localFilePath: string | null): Promise<any | null> => {
    if (!localFilePath) {
        console.error("No file path provided for upload.");
        return null; // Return null if no file path is provided
    }

    try {
        // Upload the file to Cloudinary
        const response = await cloudinary.v2.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        console.log("File successfully uploaded to Cloudinary:", response.url);
        fs.unlinkSync(localFilePath);
        return response; // Return the response containing the uploaded file info
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error); // Log the error for debugging
        fs.unlinkSync(localFilePath); // Remove the locally saved temporary file if upload fails
        return null; // Return null if the upload operation failed
    }
};
