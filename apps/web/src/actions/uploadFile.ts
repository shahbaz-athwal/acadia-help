"use server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

interface CloudinaryUploadResult {
  url: string;
  secure_url: string;
  version: number;
  public_id: string;
}

export async function uploadProfilePicture(
  formData: FormData
): Promise<string> {
  const file = formData.get("file") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  try {
    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({}, (err, result) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(result as CloudinaryUploadResult);
          })
          .end(buffer);
      }
    );

    console.log("Uploaded to Cloudinary:", result.secure_url);
    return result.secure_url;
    
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload image");
  }
}
