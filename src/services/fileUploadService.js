// src/services/fileUploadService.js
import path from "path";
import fs from "fs";

const generateUniqueFilename = (originalFilename) => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 90000) + 10000;
  const fileExtension = path.extname(originalFilename);
  return `${random}-${timestamp}${fileExtension}`;
};

export const processFile = async (file) => {
  const { createReadStream, filename, mimetype, encoding } = await file;
  const uploadsPath = path.join(process.cwd(), "uploads");
  const uniqueFilename = generateUniqueFilename(filename);
  const filePath = path.join(uploadsPath, uniqueFilename);

  // Check if the file path is valid
  if (typeof filePath !== "string") {
    throw new Error("Invalid file path");
  }

  // Create a write stream and save the file
  const stream = await createReadStream();
  const writeStream = fs.createWriteStream(filePath);
  await new Promise((resolve, reject) => {
    stream.pipe(writeStream).on("finish", resolve).on("error", reject);
  });

  const baseUrl = process.env.BASE_URL || "";
  return {
    uniqueFilename,
    filePath: path.join(baseUrl, uniqueFilename),
    mimetype,
    encoding,
  };

  // return { uniqueFilename, uploadsPath,filePath,mimetype,encoding, createReadStream, };
};
