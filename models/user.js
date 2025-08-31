import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 100,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
    },
    password: {
        type:String,
        required:true
    }
},{
    timestamps:true
});

export const User=mongoose.model("user",UserSchema);