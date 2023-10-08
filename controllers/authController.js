import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

//REGISTER CONTROLLER
export const registerController=async(req,res)=>{
    try{
        const {name,scholarid,email,password,branch}=req.body;
        //VALIDATION (IF ANY FOLLOWING DETAIL NOT GIVEN)
        if(!name){
            return res.send({message:`name is required`});
        }
        if(!scholarid){
            return res.send({message:`scholarid is required`});
        }
        if(!email){
            return res.send({message:`email is required`});
        }
        if(!password){
            return res.send({message:`password is required`});
        }
        if(!branch){
            return res.send({message:`branch is required`});
        }
        //will add this part later on
        // if(password && password.length<6){
        //     return res.send({message:`password must be atleast 6 characters long`});
        // }
        //CHECK USER
        const existingUser=await userModel.findOne({scholarid});
        //EXISTING USER
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:"Already registered please login",
                error
            })
        }
        //IF NEW USER THEN REGISTER
        //HASH THE PASSWORD
        const hashedPassword=await hashPassword(password);
        //SAVE
        const user=await new userModel({name,scholarid,email,password:hashedPassword,branch}).save();
        res.status(201).send({
            success:true,
            message:"user registered successfully",
            user
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in registration",
            error
        })
    }
}

// -------------------------------------------------------------------------------------------------------//

//LOGIN CONTROLLER
export const loginController=async(req,res)=>{
    try{
        const {scholarid,password}=req.body;
        //VALIDATION
        if(!scholarid||!password){
            return res.status(404).send({
                success:false,
                message:"Please provide scholarid or password"
            })
        }
        //CHECK USER BY EMAIL
        const user=await userModel.findOne({scholarid});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"scholarid is not registered",
            })
        }
        //CHECK PASSWORD
        const match=await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid password"
            })
        }
        //AFTER ALL VALIDATION DONE AND SUCCESSFUL CREATE TOKEN
        const token=await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d",});
        res.status(200).send({
            success:true,
            message:"login successfully",
            user:{
                name: user.name,
                email:user.email,
                branch:user.branch,
                scholarid:user.scholarid,
                role:user.role,
            },
            token
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in login",
            error
        })
    }
}