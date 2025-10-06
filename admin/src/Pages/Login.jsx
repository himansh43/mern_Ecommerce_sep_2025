import React from "react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {toast} from 'react-toastify'

const Login = ({token,setToken}) => {
    const [showPassword,setShowPassword]= useState(false)
    const [inputs,setInputs]= useState({
        email:"",
        password:""
    })

    const handleInputs=(e)=>{
        const value= e.target.value
        const name= e.target.name
        setInputs((prev)=>({...prev,[name]:value}))
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
        const url=`http://localhost:3000/api/v1/ecommerce/users/adminLogin`
        const options= {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(inputs)
        }
        const response= await fetch(url,options)
        const data= await response.json()
        console.log(data)
        const {success,message}= data
        if(success){
            toast.success(message)
            setInputs({
                email:"",
                password:""
            })
            setToken(data.token)
            // localStorage.setItem("E-commerce-Admin-Token",JSON.stringify(data.token))
        }else{
            toast.error(message)
        }
        } catch (error) {
            console.log(error)
            return error
        }
    }

  return (
    <div className="flex justify-center h-screen items-start py-20 bg-gray-700">
       <form className="flex flex-col w-96  mt-20 px-5 py-5 border border-gray-400 rounded-md gap-4 bg-white shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-center text-2xl font-semibold">Admin Panel</h2>
        <div className="w-full flex flex-col">
            <label htmlFor="">Email:</label>
            <input required type="email" placeholder="johnDoe@gmail.com" className="px-3 py-1 border border-gray-400 rounded-sm outline-none" onChange={handleInputs} value={inputs.email} name="email"/>
        </div>

        <div className="w-full flex flex-col">
            <label htmlFor="">Password:</label>
            <div className="flex justify-between border items-center  pr-3 border-gray-400 rounded-sm">
                <input required type={showPassword?"text":"password"} placeholder="john_123" className="px-3 py-1 outline-none"  onChange={handleInputs} value={inputs.password} name="password"/>
                {
                    !showPassword?<FaEyeSlash className="cursor-pointer" onClick={()=>setShowPassword(true)}/>:<FaEye className="cursor-pointer" onClick={()=>setShowPassword(false)}/>
                }
            </div>
        </div>


        <div className="w-full">
            <button type="submit" className="bg-red-600 font-medium text-[18px] text-white cursor-pointer w-full px-3 py-2 rounded-sm ">Submit</button>
        </div>
        </form>
    </div>
  );
};

export default Login;
