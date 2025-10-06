import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const NavBar = ({token,setToken}) => {
  const handleLogout=()=>{
    setToken("")
    // localStorage.removeItem("E-commerce-Admin-Token")
  }
  return (
    <div className='max-w-[90%] m-auto flex  justify-between items-center px-3 w-full h-16 mt-3 border-b   border-b-gray-400'>
        <NavLink to="/add">
            <img src={assets.logo} alt="" className='w-32 '/>
        </NavLink>
        <button className='bg-slate-600 text-white px-5 h-10 rounded-4xl cursor-pointer' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default NavBar