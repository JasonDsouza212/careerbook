const Company =require("../models/companyModel")
const jwt= require('jsonwebtoken')

const createToken = (_id)=>{
    return jwt.sign({_id}, process.env.SECRET,{expiresIn:'3d'})
}
//login user
  
const loginUser= async(req,res)=>{
    const {email,password}=req.body;

    try{
        const company= await Company.login( email, password )
        const token = createToken(company._id)
        res.status(200).json({email,token , company})

    }catch(error){
        res.status(400).json({error: error.message})
    }

}

// signup user 
const signupUser= async(req,res)=>{
    const{email,password , companyname}=req.body

    try{
        const company= await Company.signup(companyname ,email, password)
        const token = createToken(company._id)
        res.status(200).json({email,token , company})

    }catch(error){
        res.status(400).json({error: error.message})
    }

}

module.exports= {
    signupUser,
    loginUser
}