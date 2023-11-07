import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import resultModel from "../models/resultModel.js";
import subjectModel from "../models/subjectModel.js";
import twilio from "twilio";
const client = twilio("AC2bbddaa930540c475a17461b6ca344e6", "288a60350888ffc558e900c250088a3a");

//REGISTER CONTROLLER
// export const registerController=async(req,res)=>{
//     try{
//         const {name,email,password,scholarid,branch}=req.body;
//         //VALIDATION (IF ANY FOLLOWING DETAIL NOT GIVEN)
//         if(!name){
//             return res.send({message:`name is required`});
//         }
//         if(!email){
//             return res.send({message:`email is required`});
//         }
//         if(!password){
//             return res.send({message:`password is required`});
//         }
//         if(!scholarid){
//             return res.send({message:`scholarid. is required`});
//         }
//         if(!branch){
//             return res.send({message:`branch is required`});
//         }
        
//         //will add this part later on
//         // if(password && password.length<6){
//         //     return res.send({message:`password must be atleast 6 characters long`});
//         // }
//         //CHECK USER
//         const existingUser=await userModel.findOne({email});
//         //EXISTING USER
//         if(existingUser){
//             return res.status(200).send({
//                 success:false,
//                 message:"Already registered please login",
//                 error
//             })
//         }
//         //IF NEW USER THEN REGISTER
//         //HASH THE PASSWORD
//         const hashedPassword=await hashPassword(password);
//         //SAVE
//         const user=await new userModel({name,email,password:hashedPassword,scholarid,branch}).save();
//         res.status(201).send({
//             success:true,
//             message:"user registered successfully",
//             user
//         });
//     }catch(error){
//         console.log(error);
//         res.status(500).send({
//             success:false,
//             message:"Error in registration",
//             error
//         })
//     }
// }
let OTP,user;
export const registerOtpController=async(req,res)=>{
    try{
        const {name,email,password,scholarid,branch,phone}=req.body;
        //VALIDATION (IF ANY FOLLOWING DETAIL NOT GIVEN)
        if(!name){
            return res.send({message:`name is required`});
        }
        if(!email){
            return res.send({message:`email is required`});
        }
        if(!password){
            return res.send({message:`password is required`});
        }
        if(!scholarid){
            return res.send({message:`scholarid. is required`});
        }
        if(!branch){
            return res.send({message:`branch is required`});
        }
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
        const hashedPassword=await hashPassword(password);
        user=await new userModel({name,email,password:hashedPassword,scholarid,branch,phone});
        let digits="0123456789";
        OTP="";
        for(let i=0;i<4;i++){
            OTP+=digits[Math.floor(Math.random()*10)];
        }
        await client.messages.create({
            body:`Your otp is ${OTP}`,
            from:"+16179368802",
            to:`+91${phone}`
        }).then(()=>res.status(200).send({
            success:true,
            message:"Otp sent successfully",
        }))

        
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in otp sending",
            error
        })
    }
}

export const registerOtpVerifyController=async(req,res)=>{
    try{
        const {otp}=req.body;
        if(otp!=OTP){
            return res.status(400).send({success:false,message:"Wrong otp"});
        }
        
        user.save();
        OTP="";
        return res.status(200).send({success:true,message:"Successfully registered user"});
        
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in otp sending",
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
                message:"Scholarid is not registered",
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
                scholarid:user.scholarid,
                branch:user.branch,
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

//RESULTS CONTROLLER
export const resultsController=async(req,res)=>{
    try{
        const {scholarid}=req.body;
        //VALIDATION
        if(!scholarid){
            return res.status(404).send({
                success:false,
                message:"Please provide scholarid"
            })
        }
        //CHECK USER BY Scholarid
        
        const user=await resultModel.findOne({scholarid});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Scholarid is not registered",
            })
        }
        //CHECK PASSWORD
        // const match=await comparePassword(password,user.password);
        // if(!match){
        //     return res.status(200).send({
        //         success:false,
        //         message:"Invalid password"
        //     })
        // }
        // //AFTER ALL VALIDATION DONE AND SUCCESSFUL CREATE TOKEN
        // const token=await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d",});
        res.status(200).send({
            success:true,
            message:"result successfully shown",
            user
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in result",
            error
        })
    }
}

//SUBJECTS CONTROLLER

export const subjectController=async(req,res)=>{
    try{
        const {scholarid}=req.body;
        //VALIDATION
        if(!scholarid){
            return res.status(404).send({
                success:false,
                message:"Please provide scholarid"
            })
        }
        //CHECK USER BY Scholarid
        const userData=await subjectModel.findOne({scholarid});
        if(!userData){
            return res.status(404).send({
                success:false,
                message:"Scholarid is not registered",
            })
        }
        //CHECK PASSWORD
        // const match=await comparePassword(password,user.password);
        // if(!match){
        //     return res.status(200).send({
        //         success:false,
        //         message:"Invalid password"
        //     })
        // }
        // //AFTER ALL VALIDATION DONE AND SUCCESSFUL CREATE TOKEN
        // const token=await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d",});
        res.status(200).send({
            success:true,
            message:"result successfully shown",
            userData
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in result",
            error
        })
    }
}





// -----------------------------------------------------------------------------
//FORGOT PASSWORD CONTROLLER
// export const forgotPasswordController=async(req,res)=>{
//     try{
//         const {email,answer,newPassword}=req.body
//         if(!email){
//             res.status(400).send({message:"Email is required"});
//         }
//         if(!answer){
//             res.status(400).send({message:"answer is required"});
//         }
//         if(!newPassword){
//             res.status(400).send({message:"newPassword is required"});
//         }
//         //CHECK EMAIL AND PASSWORD
//         const user=await userModel.findOne({email,answer});
//         //VALIDATION
//         if(!user){
//             res.status(404).send({success:false,message:"Wrong email or answer"});
//         }
//         const hashed=await hashPassword(newPassword);
//         //UPDATE PASSWORD
//         await userModel.findByIdAndUpdate(user._id,{password:hashed});
//         res.status(200).send({
//             success:true,
//             message:"Password changed successfully",
//         });
//     }catch(error){
//         console.log(error);
//         res.status(500).send({
//             success:false,
//             message:"Something went wrong",
//             error
//         })
//     }
// }


//testController
// export const testController=(req,res)=>{
//     res.send("protected route");
// }


// //update profile controller
// export const updateProfileController = async (req, res) => {
//     try {
//       const { name, email, password, address, phone } = req.body
//       const user = await userModel.findById(req.user._id);
//     //will add this part later on
//     //password
//     //   if (password ) {
//     //     return res.json({ error: "Passsword is required" });
//     //   }
//       const hashedPassword = password ? await hashPassword(password) : undefined;
//       const updatedUser = await userModel.findByIdAndUpdate(
//         req.user._id,
//         {
//           name: name || user.name,
//           password: hashedPassword || user.password,
//           phone: phone || user.phone,
//           address: address || user.address,
//         },
//         { new: true }
//       );
//       res.status(200).send({
//         success: true,
//         message: "Profile Updated SUccessfully",
//         updatedUser,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(400).send({
//         success: false,
//         message: "Error While Update profile",
//         error,
//       });
//     }
//   };

//   //ORDERS
//   export const getOrdersController=async(req,res)=>{
//     try{
//         const orders=await orderModel.find({buyer:req.user._id}).populate("products","-photo").populate("buyer","name");
//         res.json(orders);
//     }catch(error){
//         console.log(error);
//         res.status(500).send({
//             success:false,
//             message:"Error while getting orders",
//             error
//         })
//     }
//   }

//   //ALL ORDERS
//   export const getAllOrdersController=async(req,res)=>{
//     try{
//         const orders=await orderModel.find({}).populate("products","-photo").populate("buyer","name").sort({createAt:"-1"});
//         res.json(orders);
//     }catch(error){
//         console.log(error);
//         res.status(500).send({
//             success:false,
//             message:"Error while getting all orders",
//             error
//         })
//     }
//   }
// //   ORDER STATUS CONTROLLER
//   export const orderStatusController=async(req,res)=>{
//     try{
//         const {orderId } =req.params
//         const { status } = req.body
//         const orders = await orderModel.findByIdAndUpdate(
//             orderId,
//             { status },
//             { new: true }
//           );
//           res.json(orders);
//     }catch(error){
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Error While Updating Order",
//             error,
//           });
//     }
//   }
