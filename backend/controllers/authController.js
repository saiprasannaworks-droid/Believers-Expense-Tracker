const User= require('../models/User')

const jwt = require("jsonwebtoken");

// generate jwt Token

const generateToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1hr"});
};

//Register User

exports.registerUser = async (req,res)=>{

  console.log("REQ BODY:", req.body);

  const {fullName,email,password,profileImageUrl }= req.body;

  // validation for missing fields
    if(!fullName || !email || !password ){
    return res.status(400).json({
      message:"All Fields are required"
    });
    }
    
    // check if email is already exists
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
          return res.status(400).json({
          message:"Email already In use "
        });
        }

        //create the user 
        const user =await User.create({
          fullName,
          email,
          password,
          profileImageUrl,
        });

        res.status(201).json({
          id:user._id,
          user,
          token:generateToken(user._id),
        });

    } catch(err){
      res
        .status(500)
        .json({message:"Error registering user",error:err.message});
    }

};

//Login User

exports.loginUser = async (req,res)=>{
  const {email,password}=req.body;
  if(!email||!password){
    return res.status(400).json({message:"All fields are required"}); 
  }
  try{
    const user =await User.findOne({email})
    if(!user || !(await user.comparePassword(password)))
    {
      return res.status(400).json({message:"Invalid Credentials"})
    }

    res.status(200).json({
      id:user._id,
      user,
      token:generateToken(user._id),
    });
  }

  catch(err){
      res
        .status(500)
        .json({message:"Error registering user",error:err.message});
    }


};


//getting user info

exports.getUserInfo = async (req,res)=>{

  try{
    const user =await User.findById(req.user.id).select("-password");

    if(!user){
      return res.status(404).json({message:"User is not found"});
    }
    res.status(200).json(user);
  }

  catch(err){
    res
      .status(500)
      .json({message:"Error registering user",error:err.message});
  }


};