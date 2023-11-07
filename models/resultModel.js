import mongoose from "mongoose";

//RESULT SCHEMA
const resultSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    scholarid:{
        type: Number,
        required: true,
        unique:true,
    },
    branch: {
      type: String,
      required: true,
    },
    semester:{
      type:Number,
      required:true,
    },
    sgpa:{
        type: Number,
        required: true,
    },
    cgpa:{
        type: Number,
        required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("results", resultSchema);