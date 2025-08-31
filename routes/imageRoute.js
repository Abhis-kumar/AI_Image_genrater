import express from "express";
import { createImage, deleteImage, getImages } from "../controllers/imageController.js";
const router = express.Router();

router.post("/generate-image", createImage);
router.get("/get-images", getImages);
router.delete("/delete-image/:id", deleteImage);

export const ImageRouter = router;