const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema;

const companySchema = new Schema({
    companyname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
        type: String,
    },
    employees: {
        type: String,
    },
    weblink: {
        type: String,
    },
    profile: {
        type: String,
    },
    coverphoto: {
        type: String 
    },
    socials: {
        type: [String]
    },
    bio: {
        type: String
    }
  });

  // static signup method 
  companySchema.statics.signup= async function(companyname ,email, password ){

    //valoidation
    if(!email || !password || !companyname){
        throw Error("all fields must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password is not Strong")
    }

    const exists = await this.findOne({ email })

    if(exists){
        throw Error("Email already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const company = await this.create({email,password: hash ,companyname}) //can also use save

    return company
}

// statuc login method 
companySchema.statics.login =async function(email,password){
      //validation
    if(!email || !password){
        throw Error("all fields must be filled")
    }
    const user = await this.findOne({ email })

    if(!user){
        throw Error("Incorrect email")
    }

    const match = await bcrypt.compare(password,user.password)

    if(!match){
      throw Error("Incorrect Password")
    }

    return user
}

module.exports = mongoose.model('Company', companySchema)
  