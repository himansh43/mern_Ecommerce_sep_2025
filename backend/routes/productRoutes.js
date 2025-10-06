const express= require('express')
const {addProduct,deleteProduct,singleProduct,allProducts}= require('../controllers/productControllers')
const router= express.Router()
const upload= require('../middlewares/multer')
router.post('/add',upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addProduct)
router.delete('/delete/:id',deleteProduct)
router.get('/singleProduct/:id',singleProduct)
router.get('/allProducts',allProducts)
module.exports= router