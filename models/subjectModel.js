import mongoose from "mongoose";

//RESULT SCHEMA
const subjectSchema = new mongoose.Schema(
  {
    scholarid:{
        type: Number,
        required: true,
        unique:true,
    },
    semester:{
      type:Number,
      required:true,
    },
    subject1:{
        type: String,
    },
    subject2:{
        type: String,
    },
    subject3:{
        type: String,
    },
    subject4:{
        type: String,
    },
    subject2:{
        type: String,
    },
    subject3:{
        type: String,
    },
    marks1:{
        type:Number,
    },
    marks2:{
        type:Number,
    },
    marks3:{
        type:Number,
    },
    marks4:{
        type:Number,
    }
  },
  { timestamps: true }
);

export default mongoose.model("subjects", subjectSchema);