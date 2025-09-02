import cloudinary from "../config/cloudinary.js";
import { Image } from "../models/image.js";
import { generateImage } from "../utils/genrateimage.js";

export const createImage = async (req, res) => {
  const { name, prompt } = req.body;

  const generatedImageUrl = await generateImage(prompt);
  if (!generatedImageUrl) {
    return res.json({ message: "image not generated in controller" });
  }

  let cloudinaryResponse;
  try {
    cloudinaryResponse = await cloudinary.uploader.upload(generatedImageUrl);
  } catch (error) {
    return res.json({
      message: "image storage problem on cloudinary",
      error: error.message
    });
  }

  if (!cloudinaryResponse) {
    return res.json({ message: "image storage problem on cloudinary" });
  }

  let image;
  try {
    image = await Image.create({
      name,
      url: cloudinaryResponse.secure_url,
      prompt,
      publicId: cloudinaryResponse.public_id
    });
  } catch (error) {
    return res.json({ message: "server error", error: error.message });
  }

  if (!image) {
    return res.json({ message: "Image storage problem" });
  }

  return res.json({
    message: "Image stored successfully",
    image
  });
};

export const getImages = async (req, res) => {
  try {
    const images = await Image.find({});
    if (!images || images.length === 0) {
      return res.json({ message: "images not found" });
    }
    return res.json({
      message: "All images fetched successfully",
      images
    });
  } catch (error) {
    return res.json({
      message: "Error fetching images",
      error: error.message
    });
  }
};

export const deleteImage = async (req, res) => {
  const { id } = req.params;

  let image;
  try {
    image = await Image.findById(id);
    if (!image) {
      return res.json({ message: "image not found" });
    }
  } catch (error) {
    return res.json({ message: "Error finding image", error: error.message });
  }

  try {
    const isDeleted = await cloudinary.uploader.destroy(image.publicId);
    if (isDeleted.result !== "ok") {
      return res.json({ message: "image not deleted from cloudinary" });
    }
  } catch (error) {
    return res.json({ message: "Cloudinary delete error", error: error.message });
  }

  try {
    const deleted = await Image.findByIdAndDelete(id);
    if (!deleted) {
      return res.json({ message: "image not deleted from mongo" });
    }
  } catch (error) {
    return res.json({ message: "Mongo delete error", error: error.message });
  }

  return res.json({ message: "Image deleted successfully" });
};
