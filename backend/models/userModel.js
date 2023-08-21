const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileimg: {
    type: String
  },
  coverphoto: {
    type: String 
  },
  highestqualification: {
    type: String
  },
  Resume: {
    type: String
  },
  Coverletter: {
    type: String
  },
  gender: {
    type: String
  },
  socials: {
    type: [String]
  },
  skills: {
    type: [String]
  },
  languages: {
    type: [String]
  },
  bio: {
    type: String
  }
})

// static user signup method 
userSchema.statics.signup= async function(name ,email, password ){

    //valoidation
    if(!email || !password || !name){
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

    const user = await this.create({email,password: hash ,name}) //can also use save

    return user
}

// static user login method 
userSchema.statics.login =async function(email,password){
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

module.exports = mongoose.model('User', userSchema)