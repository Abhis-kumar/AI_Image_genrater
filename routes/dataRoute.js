import express from "express"
import { createdata, getdata } from "../controllers/dataController.js"
const router = express.Router()

router.post("/createdata", createdata)
router.get("/getdata", getdata)


export const dataRoute = router