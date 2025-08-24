import mongoose from "mongoose"
import "dotenv/config"
const mongoUrl = process.env.MONGO_DB_URI

export const connectDB = async () => {
  try {
    const res = await mongoose.connect(mongoUrl)
    if (!res) {
      console.log("mongodb not connect")
      return
    }
    console.log("mongodb  connected")
    return
  } catch (error) {
    console.log("error:", error)

  }
}