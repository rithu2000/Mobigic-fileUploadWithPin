import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    uploadedFiles: [{
        type: String
    }],
});


export const userModel = mongoose.model('User', userSchema)