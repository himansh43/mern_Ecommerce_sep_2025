import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex justify-center items-center w-full mt-25 mb-10'>
        <div className='w-[100%] flex flex-col gap-5 sm:flex-row justify-center sm:gap-20'>
            <div className='flex flex-col justify-center items-center'>
                <img src={assets.exchange_icon} alt="exchange-icon"  className='w-8'/>
                <p>Easy Exchange Policy</p>
                <p className='text-gray-400 text-sm'>We offer hassle free exchange policy</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <img src={assets.quality_icon} alt="exchange-icon"  className='w-8'/>
                <p>7 days return policy</p>
                <p className='text-gray-400 text-sm'>We provide 7 days return policy</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <img src={assets.support_img} alt="exchange-icon"  className='w-8'/>
                <p>Best customer support</p>
                <p className='text-gray-400 text-sm'>We provide 24/7 customer support</p>
            </div>
        </div>

    </div>
  )
}

export default OurPolicy