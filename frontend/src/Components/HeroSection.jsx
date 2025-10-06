import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const HeroSection = () => {
  return (
    <div className='flex  justify-center items-center w-full border border-gray-100 border-t-0 '>

        <div className=' flex-col sm:flex-row w-full flex justify-between items-center py-10 sm:py-0'>
            {/* Hero left side */}
            <div className='flex sm:justify-center items-center justify-center py-10 sm:items-center w-full '>
                <div className='flex flex-col gap-1'>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                        <p className='font-medium text-sm md:text-base text-gray-600'>OUR BESTSELLERS</p>
                    </div>
                    
                    <h1 className='text-4xl text-gray-600 prata-regular sm:py-3 lg-text-5xl leading-relaxed'>Latest Arrivals</h1>
                    <div className='flex items-center gap-2'>
                        <p className='font-medium text-sm md:text-base text-gray-600'>SHOP NOW</p>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    </div>
                </div>
            </div>
            {/* Hero right side */}
            <div className='w-[100%]'>
                <img src={assets.hero_img} alt="" className='w-full'/>
            </div>
        </div>
    </div>
  )
}

export default HeroSection