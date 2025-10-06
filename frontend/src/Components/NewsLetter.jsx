import React from 'react'

const NewsLetter = () => {
  return (
    <div className='flex justify-center items-center w-full mt-30 mb-30'>
        <div className='flex flex-col gap-5 w-full items-center justify-center'>
            <p className='font-semibold text-2xl'>Subscribe now & get 20% off</p>
            <p className='text-gray-400'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className='w-full flex flex-col sm:flex-row gap-2 sm:gap-0  items-center justify-center'>
                <input type="text" className='border border-gray-300 px-3 py-1 w-full sm:w-96' placeholder='Enter your email'/>
                <button className='bg-black text-white cursor-pointer px-3 py-1 border w-full sm:w-60  border-black'>SUBSCRIBE</button>
            </div>
        </div>
    </div>
  )
}

export default NewsLetter