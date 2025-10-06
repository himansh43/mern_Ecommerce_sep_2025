import React, { useEffect, useState } from 'react'
import {assets} from "../assets/frontend_assets/assets"
import { products } from '../assets/frontend_assets/assets'
import { useStoreContext } from '../Context/StoreContext'
import RelatedProducts from '../Components/RelatedProducts'
import { useLocation } from 'react-router-dom'



const Product = () => {
  const location= useLocation()
  const productId= location.pathname.split('/')[2]
  const [imageIndex,setImageIndex]= useState(0)
  const {addToCart,products}= useStoreContext()
  const singleProduct= products.filter((item)=>{return item._id===productId})
  const [size,setSize]= useState("")


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

 
  return (
    <div className='flex w-full justify-center items-center'>
      <div className='w-full flex flex-col'>
        <div className='grid grid-cols-1 sm:grid-cols-[1fr_2.5fr_3fr] justify-start gap-10 sm:justify-center mt-10'>
          <div className='flex flex-col gap-3 justify-start  sm:items-center'>
            {
              singleProduct[0]?.image.map((item,index)=>(
                <img key={index} src={item} alt="product-image" className='w-25 cursor-pointer' onClick={()=>setImageIndex(index)}/>
              ))
            }
          </div>
          <div className='w-full'>
            <img src={singleProduct[0]?.image[imageIndex]} alt="" className='w-full cursor-pointer' />
          </div>
          {/* description */}
          <div className='flex flex-col gap-3  pl-10'>
            <h2 className='text-2xl font-medium'>{singleProduct[0]?.name}</h2>
            <div className='flex items-center gap-3'>
              <div className='flex items-center'>
                <img src={assets.star_icon} alt="star-image" className='w-3 cursor-pointer' />
                <img src={assets.star_icon} alt="star-image" className='w-3 cursor-pointer'/>
                <img src={assets.star_icon} alt="star-image" className='w-3 cursor-pointer'/>
                <img src={assets.star_icon} alt="star-image" className='w-3 cursor-pointer'/>
                <img src={assets.star_dull_icon} alt="star-image" className='w-3 cursor-pointer'/>
              </div>
              <div>
                <p>(122)</p>
              </div>
            </div>
            <div>
              <p  className='text-xl font-medium'>${singleProduct[0]?.price}</p>
            </div>
            <div>
              <p className='text-sm text-gray-600'>{singleProduct[0]?.description}</p>            
            </div>
            <div className='flex flex-col justify-center gap-3'>
              <p>Select size</p>
              <div className='flex gap-1 sm:gap-4 w-full  items-center'>
                {
                  singleProduct[0]?.sizes.map((item,index)=>(
                    <p key={index} className={`px-3 py-1 bg-gray-300 cursor-pointer ${item===size?"bg-pink-300":""}`} onClick={()=>setSize(item)}>{item}</p>
                  ))
                }
              </div>
              <div >
                <button className='bg-black text-white px-3 py-2 cursor-pointer' onClick={()=>addToCart(productId,size)}>ADD TO CART</button>
              </div>
              <div className='flex flex-col gap-1 '>
                <p className='text-sm text-gray-500'>100% Original Product</p>
                <p className='text-sm text-gray-500'>Cash on Delivery is available on this product</p>
                <p className='text-sm text-gray-500'>Ease Return and exchange policy within 7days</p>
              </div>
            </div>
          </div>
        </div>



        {/* Description and Reviews */}
        <div className='w-full flex flex-col mt-20'>
          <div className='w-full flex '>
            <p className='w-full sm:w-40 border border-gray-300 px-3  py-2 cursor-pointer'>Description</p>
            <p className='w-full sm:w-40 border border-gray-300 px-3 py-2 cursor-pointer'>Reviews(122)</p>
          </div>
        <div className="w-full flex flex-col gap-4 border border-gray-300 px-6 py-6 text-sm text-gray-600">
          <p className='w-full'>An e-commerce website is an online platform that facilitates the buying and selling of products or servies over the internet. It serves as a virtual marketplace where business and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce website have gained immense popularity due to their convenience, accessiblity, and the global reach they offer.</p>
          <p className='w-full'>E-commerce websites typically display products or services along with detailed description, images, prices and any available variations(eg.. sizes. colours)/ Each product usually has its own dedicated page with relevant information.</p>
        </div>
        </div>


        {/* Related Products */}
        <div>
          <RelatedProducts productId={productId} category={singleProduct[0]?.category} subCategory={singleProduct[0]?.subCategory}/>
        </div>
      </div>
    </div>
  )
}

export default Product