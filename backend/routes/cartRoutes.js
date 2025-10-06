const express= require('express')
const router= express.Router()
const {getUserCart,addToCart,removeFromCart,updateCart}= require('../controllers/cartControllers')
const verifyUser= require('../middlewares/userAuth')

router.post('/getUserCart',verifyUser,getUserCart)
router.post('/addToCart',verifyUser,addToCart)
router.post('/updateCart',verifyUser,updateCart)
router.post('/removeFromCart',verifyUser,removeFromCart)

module.exports= router