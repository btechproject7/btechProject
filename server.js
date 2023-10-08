import express from "express";
import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";


//CONFIGURE DOTENV
dotenv.config();

//DB CONNECTION
connectDB();


const app=express();

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//ROUTES
app.use("/api/v1/auth",authRoutes);

//PORT
const PORT=process.env.PORT||8080;

//APP LISTEN
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`.bgBlue.white);
})