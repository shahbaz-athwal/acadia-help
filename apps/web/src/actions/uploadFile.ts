"use server";
import { v2 as cloudinary } from "cloudinary";
import db from "@repo/db/client";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

interface CloudinaryUploadResult {
  secure_url: string;
}

export async function uploadProfilePicture(formData: FormData, id: number) {
  const file = formData.get("file") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  try {
    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "Professors" }, (err, result) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(result as CloudinaryUploadResult);
          })
          .end(buffer);
      }
    );

    const { image: imageUrl } = await db.professor.update({
      where: { id },
      data: {
        image: result.secure_url,
      },
    });

    return imageUrl;
  } catch (error) {
    console.error("Server Error Image Upload:", error);
  }
}
