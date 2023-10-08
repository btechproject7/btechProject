import express from "express";
import {loginController,registerController} from "../controllers/authController.js";
// import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


//ROUTER OBJECT
const router = express.Router();

//ROUTES
//REGISTER||METHOD POST
router.post("/register",registerController);
//LOGIN||METHOD POST
router.post("/login",loginController);



export default router;
