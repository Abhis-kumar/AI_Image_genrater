import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    prompt: {
        type: String,
        required: true,
        maxLength: 1000,
        minLength: 3
    },

}, {
    timestamps: true
});

export const Image = mongoose.model("image", ImageSchema);