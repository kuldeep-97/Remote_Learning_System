import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

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