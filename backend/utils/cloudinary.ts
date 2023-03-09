import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";
dotenv.config();

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
});

export const uploadImage = async (filePath: string) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: "authenticationApp",
    });
};
