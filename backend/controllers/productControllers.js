const productModel= require('../models/productModels')
const cloudinary = require("cloudinary").v2;

const addProduct=async(req,res)=>{
    try {
    const {name,description,sizes,price,category,subCategory,bestSeller}= req.body
    console.log("type of bestseller",typeof bestSeller)
    if(!name || !description || !sizes  || !price || !category || !subCategory ){
        return res.json({message:"All fields are required",success:false})
    }
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    console.log("image1 to image 4", image1,image2,image3,image4)

    const images=[image1,image2,image3,image4].filter((item)=>{return item!==undefined})
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    console.log("imagesUrl is",imagesUrl)
    const product= new productModel({
        name,description,sizes:JSON.parse(sizes),price:Number(price),category,subCategory,bestSeller:bestSeller==="true"?true:false,image:imagesUrl,date:Date.now()
    })

    const newProduct= await product.save()
    res.json({message:"Product added",success:true,product:newProduct})
   
    } catch (error) {
        console.log(error)
        res.json({message:"Internal server error", success:false})
    }
}

const deleteProduct=async(req,res)=>{
    try {
     const id=req.params.id
     console.log("delete id is ",id)
     const deletedProduct= await productModel.findByIdAndDelete(id)
    res.json({message:"Product deleted successfully", success:true,deletedProduct})
    } catch (error) {
        console.log(error)
        res.json({message:"Internal server error",success:false})
    }
}

const singleProduct= async(req,res)=>{
    try {
     const id=req.params.id
     const singleProduct= await productModel.find({id})
    res.json({message:"Single Product Fetched", success:true,singleProduct})
    } catch (error) {
        console.log(error)
        res.json({message:"Internal server error",success:false})
    }
}

const allProducts= async(req,res)=>{
    try {
        const productList= await productModel.find({})
        res.json({message:"Fetched Products", success:true, productList})
    } catch (error) {
        console.log(error)
        res.json({message:"Internal server error",success:false})
    }

}

module.exports= {addProduct,deleteProduct,singleProduct,allProducts}