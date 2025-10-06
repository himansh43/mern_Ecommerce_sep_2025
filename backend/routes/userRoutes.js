const express= require('express')
const router= express.Router()
const {userLogin,userSignup,AdminLogin}= require('../controllers/userControllers')
router.post('/login',userLogin)
router.post('/signup',userSignup)
router.post('/adminLogin',AdminLogin)

module.exports= router