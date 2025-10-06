
const express= require("express")

const router= express.Router()

const {placeOrder,placeStripeOrder,placeRazorPayOrder,allOrders,userOrders,updateOrderStatus,verifyStripe,verifyRazorPay}= require('../controllers/orderControllers')
const verifyAdmin= require('../middlewares/adminAuth')
const verifyUser= require('../middlewares/userAuth')

//Payment features
router.post('/',verifyUser,placeOrder)
router.post('/stripe',verifyUser,placeStripeOrder)
router.post('/razorpay',verifyUser,placeRazorPayOrder)
//Admin featured
router.get('/allOrders',verifyAdmin,allOrders)
router.put('/updateOrderStatus',verifyAdmin,updateOrderStatus)


//user features
router.get('/userOrders',verifyUser,userOrders)

//verify Payment
router.post('/verifyStripe',verifyUser, verifyStripe)
router.post('/verifyRazorPay',verifyUser, verifyRazorPay)

module.exports=router