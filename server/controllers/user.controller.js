import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";


// Signup/Register bussnes logic : Backed logic 
export const register = async (req,res) => {
    try {
        // console.log(req.body);
        const {name,email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success: false,
                message: "User already exist with this email."
            })
        }
        // new user forword to regstion
        const hashedPassword = await bcrypt.hash(password,10)
        await User.create({
            name,
            email,
            password : hashedPassword
        })// jab bhi key value same hoti hai tab ek hi value do
        return res.status(201).json({
            success : true,
            message: "Account Created Successfully."
        })
    } catch (error) {
        console.log(error)
           return res.status(500).json({
             success : false,
             message : "Failed to register",
             
           })
    }
}



// Login busness logic 
export const login = async (req,res) => {
       try {
        const {name,email, password} = req.body;
        if( !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            })
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message: "Incorrect email or password"
            })
        }
        const isPasswordMatch = await 
        bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }
        // tokan genrat , cookis  , authentication , jwt
        generateToken(res,user, `Welcome back ${user.name}`)
     } catch (error) {
           return res.status(500).json({
             success : false,
             message : "Failed to login"
           })
       }   
}


// logout logic
export const logout = async (_,res) => {
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"LogOut Successfully",
            success:"true"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to logout"
        })
    }
}

// get user profile
export const getUserProfile = async (req,res) => {
    try {
        // Middlware
        const userId = req.id;
        const user = await User.findById(userId).select("-password").populate("enrolledCourses")
        if(!user){
            return res.status(400).json({
                message:"Profile not found",
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to load user"
        })
    }
}


// user Profile Edit logic 
export const updateProfile = async (req,res) => {
    try {
        const userId = req.id;
        const {name} = req.body;
        const profilePhoto = req.file;

        // find user 
        const user = await User.findById(userId)
        if(!user){
               return res.status(400).json({
                message:"User not found",
                success:false
            })
        }

        // update data
        if(user.photoUrl){
            const publicId = user.photoUrl.split("/").pop().split(".")[0]; // extract public id
            deleteMediaFromCloudinary(publicId);
        } 

        // upload new photo
        const cloudResponse = await uploadMedia(profilePhoto.path);
        const photoUrl = cloudResponse.secure_url;

        const updateData = {name, photoUrl}
        const updateUser = await User.findByIdAndUpdate(userId,updateData, {new:true}).select("-password");

        return res.status(200).json({
            success:true,
            user:updateUser,
            message:"Profile updated successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed to update Profile"
        })
    }
}