import { v2 as cloudinary } from "cloudinary";

export class CloudinaryConfigError extends Error {
  constructor(message) {
    super(message);
    this.name = "CloudinaryConfigError";
  }
}

export class CloudinaryUploadError extends Error {
  constructor(message) {
    super(message);
    this.name = "CloudinaryUploadError";
  }
}

const configureCloudinary = () => {
  const cloudinaryUrl = process.env.CLOUDINARY_URL;

  if (!cloudinaryUrl) {
    throw new CloudinaryConfigError("CLOUDINARY_URL is not set");
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(cloudinaryUrl);
  } catch {
    throw new CloudinaryConfigError("CLOUDINARY_URL is invalid");
  }

  if (parsedUrl.protocol !== "cloudinary:") {
    throw new CloudinaryConfigError("CLOUDINARY_URL must start with cloudinary://");
  }

  const apiKey = decodeURIComponent(parsedUrl.username);
  const apiSecret = decodeURIComponent(parsedUrl.password);
  const cloudName = parsedUrl.hostname;

  if (!apiKey || !apiSecret || !cloudName) {
    throw new CloudinaryConfigError(
      "CLOUDINARY_URL must include api_key, api_secret and cloud_name",
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
};

export const uploadImage = (file) => {
  if (!file?.mimetype?.startsWith("image/")) {
    throw new Error("Only image files are allowed");
  }

  configureCloudinary();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "posthub/posts",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(new CloudinaryUploadError(error.message));
          return;
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      },
    );

    stream.end(file.data);
  });
};

export const deleteImage = async (publicId) => {
  if (!publicId) {
    return;
  }

  configureCloudinary();

  await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });
};
