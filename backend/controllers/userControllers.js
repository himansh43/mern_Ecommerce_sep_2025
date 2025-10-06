const userModel = require("../models/userModels")
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')
const validator= require('validator')


const userSignup=async(req,res)=>{
    try {
        const {name,email,password}= req.body
        if(!name || !email || !password){
            return res.json({message:"All fields are required",success:false})
        }
        if(!validator.isEmail(email)){
            return res.json({message:"Enter valid email",success:false})
        }
        if(password.length<8){
            return res.json({message:"Enter strong password",success:false})
        }
        const exisitingUser= await userModel.findOne({email})
        if(exisitingUser){
            return res.json({message:"User already exists",success:false})
        }
        const genSalt=await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(password,genSalt)
        const user= new userModel({name,email,password:hashedPassword})
        const newUser=await user.save()
        if(newUser){
            const token=  jwt.sign({id:newUser._id,email:newUser.email},process.env.JWT_SECRET_KEY)
            res.json({message:"Signup successfull", success:true, newUser:newUser,token})
        }

    } catch (error) {
        console.log(error)
        res.json({message:"Internal server error",success:false})
    }
}

const userLogin=async(req,res)=>{
    try {
        const {email,password}= req.body
        if(!email|| !password){
            res.json({message:"All fields are required", success:false})
        }
        if(!validator.isEmail(email)){
            res.json({message:"Enter valid email", succcess:false})
        }
        const existingUser=await userModel.findOne({email})
        if(!existingUser){
            res.json({message:"User doesn't exist", succcess:false})
        }else{
            const matchPassword= await bcrypt.compare(password,existingUser.password)
            if(matchPassword){
            const token=await jwt.sign({id:existingUser._id,email:existingUser.email},process.env.JWT_SECRET_KEY)
            res.json({message:"Login successfull", success:true, user:existingUser,token})
        }else{
            res.json({message:"Invalid credentials", success:false})
        }
        }
    } catch (error) {
        console.log(error)
        res.json({message:"Internal server error",success:false,error:error})
    }
}

const AdminLogin=async(req,res)=>{
    try {
        const {email,password}= req.body
        if(!email || !password){
            res.json({message:"All fields are required", success:false})
        }
     
        if(email===process.env.adminEmail && password===process.env.adminPassword){
           const token=  jwt.sign({email:process.env.adminEmail},process.env.JWT_SECRET_KEY)
            res.json({message:"Successfully signup", success:true,token})
        }else{
            res.json({message:"Invalid credentials",success:false})
        }
    } catch (error) {
        console.log(error)
        res.json({message:"Internal server error",success:false})
    }
}


module.exports={userLogin,userSignup,AdminLogin}