import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {toast} from 'react-toastify'

const ListProduct = () => {
    const [products,setProducts]= useState([])
    const fetchAllProducts=async()=>{
        const url=`http://localhost:3000/api/v1/ecommerce/products/allProducts`
        const options={
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }
        const response= await fetch(url,options)
        const data = await response.json()
        console.log(data)
        setProducts(data.productList)
    }

    useEffect(()=>{fetchAllProducts()},[])
    console.log("products are",products)

    const handleDeleteProduct=async(id)=>{
        const url=`http://localhost:3000/api/v1/ecommerce/products/delete/${id}`
        const options={
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        }
        const response= await fetch(url,options)
        const data = await response.json()
        console.log("Data is ", data)
        const {success,message}= data
        if(success){
          toast.success(message)
          fetchAllProducts()
        }else{
          toast.error(message)
        }
       
    }
  return (
    <div className='w-full h-full'>
      <div>
        <p>All Products List</p>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] border-gray-300 bg-gray-300 px-3 py-4 justify-center items-center  my-2'>
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>

        <div>
          {
            products.map((item)=>(
              <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] justify-center items-center hover:bg-gray-200 cursor-pointer border px-3 py-1 my-2 border-gray-300' key={item._id}>
                <img src={item.image[0]} alt="" className='w-10'/>
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p onClick={()=>handleDeleteProduct(item._id)}>X</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ListProduct