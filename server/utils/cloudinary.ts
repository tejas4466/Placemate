// Configuration
import cloudinary from 'cloudinary';
import fs from 'fs';

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
        // Upload the file to Cloudinary as an image
        const response = await cloudinary.v2.uploader.upload(localFilePath, {
            resource_type: "image", // Ensure the resource type is image
        });

        // Modify the URL for inline display
        const modifiedUrl = response.url.replace("/upload/", "/upload/fl_attachment/");
        console.log("File successfully uploaded to Cloudinary:", modifiedUrl);

        // Remove the temporary file
        fs.unlinkSync(localFilePath);

        return {
            ...response,
            modifiedUrl, // Include the modified URL in the response
        }; // Return the response containing the uploaded file info and modified URL
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error); // Log the error for debugging

        // Attempt to remove the locally saved temporary file if upload fails
        try {
            fs.unlinkSync(localFilePath);
        } catch (cleanupError) {
            console.error("Error removing local file after upload failure:", cleanupError);
        }

        return null; // Return null if the upload operation failed
    }
};