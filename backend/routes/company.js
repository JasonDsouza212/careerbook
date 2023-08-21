const express = require('express')
const {

} = require('../controllers/companyController')
const {

} = require('../controllers/jobController')
const requireAuth = require("../middleware/requireAuth")
const { signupUser,loginUser }= require("../controllers/companyController")

const router = express.Router()
router.post("/login",loginUser)

router.post("/signup",signupUser)

// require auth 
router.use(requireAuth)



module.exports = router