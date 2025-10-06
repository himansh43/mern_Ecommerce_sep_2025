import React, { useEffect } from 'react'
import { useStoreContext } from '../Context/StoreContext'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const RelatedProducts = ({productId,category,subCategory}) => {
    const {products}= useStoreContext()
    const [related,setRelated]= useState([])
    useEffect(()=>{
        if(products.length>0){
            let productsCopy= products.slice()
            productsCopy= productsCopy.filter((item)=>{return category===item.category})
            productsCopy= productsCopy.filter((item)=>{return subCategory===item.subCategory})
            setRelated(productsCopy.slice(0,5))
        }
    },[products])


  return (
    <div className='flex items-center justify-center mt-20 mb-20'>
        <div className='flex flex-col'>
            <p className='sm:text-center mb-5 text-2xl sm:text-3xl font-sm text-gray-500'>Related <span className='font-medium text-gray-700'>Products</span></p>
            <div className='grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 gap-5 '>
                {
                    related.map((item,index)=>(
                        <div key={index}>
                                                    <Link to={`/product/${item._id}`}>
                            <div key={item._id} className=' flex flex-col justify-center gap-3 '>
                                <img src={item.image[0]} alt="item-image"  className='w-full'/>
                                <p className='text-[12px] text-gray-600'>{item.name}</p>
                                <p className='font-medium text'>${item.price}</p>
                            </div>
                        </Link>
                        </div>
                    ))
                }
            </div>     
        </div>
    </div>
  )
}

export default RelatedProducts