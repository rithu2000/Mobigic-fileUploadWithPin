import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    originalname: {
      type: String,
      required: true,
    },
    code: {
      type: Number,
      required: true,
      unique: true,
    },
    path: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);


export const fileModel = mongoose.model('File', fileSchema)