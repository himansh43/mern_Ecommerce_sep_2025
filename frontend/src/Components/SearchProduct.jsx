import React, { useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { useStoreContext } from '../Context/StoreContext'

const SearchProduct = () => {
    const {showSearch,setShowSearch}= useStoreContext()

    const {searchInput,setSearchInput}= useStoreContext()
  return (
    <div>
    {
        showSearch?    <div className='flex justify-center items-center w-full'>
        <div className='w-[100%] flex justify-center  items-center gap-4'>
            <div className='border border-gray-600 flex justify-between items-center px-3 w-full rounded-full bg-gray-100'>
                <input type="text" placeholder='search ' className='w-full  py-1 outline-none' onChange={(e)=>setSearchInput(e.target.value)}/>
                <img src={assets.search_icon} alt="search-image" className='w-4 h-4'/>
            </div>
            <img src={assets.cross_icon} alt="cancel-search" className='w-4 h-4 cursor-pointer' onClick={()=>setShowSearch(false)}/>
        </div>
    </div>:""
    }
    </div>
  )
}

export default SearchProduct