import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  
  },
  address: {
    type: String,
    required: true
  },
  phonNo:{
    type: String,
    required: true,
    
  },
  qualification: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const Data = mongoose.model("data", dataSchema);


