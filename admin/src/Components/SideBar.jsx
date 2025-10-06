import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='flex flex-col gap-5 w-full h-full border-r border-r-gray-400'>
        <NavLink to='/add' >
        <div className='flex items-center gap-3 border border-gray-400 px-5 py-2 border-r-0 cursor-pointer hover:bg-pink-200 hover:border-pink-200 '>
            <img src={assets.add_icon} alt="add-product" className='w-5 h-5'/>
            <p className='hidden md:block'>Add Items</p>
        </div>
        </NavLink>
        <NavLink to='/list'>
        <div className='flex gap-3 border border-gray-400 px-5 py-2 border-r-0 cursor-pointer hover:bg-pink-200 hover:border-pink-200'>
            <img src={assets.order_icon} alt="add-product" className='w-5 h-5'/>
            <p className='hidden md:block'>List Items</p>
        </div>
        </NavLink>
        <NavLink to="/orders">
        <div className='flex gap-3 border border-gray-400 px-5 py-2 border-r-0 cursor-pointer hover:bg-pink-200 hover:border-pink-200'>
            <img src={assets.order_icon} alt="add-product" className='w-5 h-5'/>
            <p className='hidden md:block'>Orders</p>
        </div>
        </NavLink>
    </div>
  )
}

export default SideBar