import express from "express";
import { createUser, getUsers } from "../controllers/userController.js";
const router=express.Router();

router.post("/sign-up",createUser);
router.get("/",getUsers);

export const userRouter=router;