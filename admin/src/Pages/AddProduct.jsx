import {assets} from '../assets/assets'
import { useState } from 'react'
import axios from 'axios';
import {toast} from 'react-toastify'
import { useStoreContext } from '../Context/StoreContext';


const AddProduct = () => {
    const [image1,setImage1]= useState(false)
    const [image2,setImage2]= useState(false)
    const [image3,setImage3]= useState(false)
    const [image4,setImage4]= useState(false)
    const [sizes,setSizes]= useState([])
    const [name,setName]= useState("")
    const [description,setDescription]= useState("")
    const [price,setPrice]= useState("")
    const [bestSeller,setBestSeller]= useState(false)
    const [category,setCategory]= useState("Men")
    const [subCategory,setSubCategory]= useState("TopWear")
    const {backend_url}= useStoreContext()
    


    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
        const formData= new FormData()
        formData.append("name",name)
        formData.append('description',description)
        formData.append("category",category)
        formData.append("subCategory",subCategory)
        formData.append("price",price)
        formData.append("bestSeller",bestSeller)
        formData.append("sizes",JSON.stringify(sizes)) //as we can't send an array to Backend Api through formData 
        image1 && formData.append("image1", image1)
        image2 && formData.append("image2", image2)
        image3 && formData.append("image3", image3)
        image4 && formData.append("image4", image4)

        const url=`${backend_url}/api/v1/ecommerce/products/add`
        const response= await axios.post(url,formData)
        const {success,message}= response.data
        if(success===true){
            toast.success(message)
            setBestSeller(false)
            setName("")
            setDescription("")
            setPrice("")
            setSizes([])
            setCategory('Men')
            setSubCategory("TopWear")
            setImage1(false)
            setImage2(false)
            setImage3(false)
            setImage4(false)
        }else{
            toast.error(message)
        }
        } catch (error) {
            console.log(error)
            return error
        }

    }
  return (
    <div className='w-full sm:w-[90%] md:w-[80%] lg:w-[50%]'>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

            <div className='w-full'>
                <p>Upload image</p>
                <div className='flex gap-3'>
                    <div>
                        <label htmlFor='image1'>
                            <img src={image1?URL.createObjectURL(image1):assets.upload_area} alt="upload-image" className='w-20 h-20 sm:w-22 sm:h-24 cursor-pointer'/>
                            <input type="file" hidden id='image1' onChange={(e)=>setImage1(e.target.files[0])}/>
                        </label>
                    </div>

                    <div>
                        <label htmlFor='image2'>
                            <img src={image2?URL.createObjectURL(image2):assets.upload_area} alt="upload-image" className='w-20 h-20 sm:w-22 sm:h-24 cursor-pointer'/>
                            <input type="file" hidden id='image2' onChange={(e)=>setImage2(e.target.files[0])}/>
                        </label>
                    </div>

                    <div>
                        <label htmlFor='image3'>
                            <img src={image3?URL.createObjectURL(image3):assets.upload_area} alt="upload-image" className='w-20 h-20 sm:w-22 sm:h-24 cursor-pointer'/>
                            <input type="file" hidden id='image3' onChange={(e)=>setImage3(e.target.files[0])}/>
                        </label>
                    </div>

                    <div>
                        <label htmlFor='image4'>
                            <img src={image4?URL.createObjectURL(image4):assets.upload_area} alt="upload-image" className='w-20 h-20 sm:w-22 sm:h-24 cursor-pointer'/>
                            <input type="file" hidden id='image4' onChange={(e)=>setImage4(e.target.files[0])}/>
                        </label>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center">
                <label htmlFor="name">Product name</label>
                <input id="name" type="text" placeholder="Type here" name="name" className="border border-gray-300 rounded-sm px-3 py-1" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>

            <div className="flex flex-col justify-center">
                <label htmlFor="description">Product Description</label>
                <textarea name="description" id="description" className="border border-gray-300 rounded-sm px-3 py-3" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
            </div>

            <div className="w-full flex flex-col md:flex-row   gap-5 ">
                <div className="flex flex-col justify-center">
                    <label htmlFor="category">Product Category</label>
                    <select name="category" id="category" className="border px-1 py-1 border-gray-300 "  onChange={(e)=>setCategory(e.target.value)} >
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>

                <div className="flex flex-col justify-center">
                    <label htmlFor="subCategory">Sub Category</label>
                    <select name="subCategory" id="subCategory" className="border px-1 py-1 border-gray-300 " onChange={(e)=>setSubCategory(e.target.value)}>
                        <option value="TopWear">TopWear</option>
                        <option value="BottomWear">BottomWear</option>
                        <option value="WinterWear">WinterWear</option>
                    </select>
                </div>

                <div className="flex flex-col justify-center">
                    <label htmlFor="">Price</label>
                    <input type="text" placeholder="25" name='price' className="border px-1 py-1 border-gray-300 w-20"  onChange={(e)=>setPrice(e.target.value)} value={price}/>
                </div>
            </div>


            <div className="flex flex-col justify-center ">
                <label htmlFor="">Product sizes</label>
                <div className="flex gap-5 flex-wrap">
                    <p className={`px-3 py-1 bg-gray-300 cursor-pointer ${sizes.includes('S')?" bg-red-300":""}`} onClick={()=>setSizes((prev)=>prev.includes("S")?prev.filter((item)=>item!=="S"):[...prev,'S'])}>S</p>
                    <p className={`px-3 py-1 bg-gray-300 cursor-pointer ${sizes.includes('M')?" bg-red-300":""}`} onClick={()=>setSizes((prev)=>prev.includes("M")?prev.filter((item)=>item!=="M"):[...prev,'M'])}>M</p>
                    <p className={`px-3 py-1 bg-gray-300 cursor-pointer ${sizes.includes('L')?" bg-red-300":""}`} onClick={()=>setSizes((prev)=>prev.includes("L")?prev.filter((item)=>item!=="L"):[...prev,'L'])}>L</p>
                    <p className={`px-3 py-1 bg-gray-300 cursor-pointer ${sizes.includes('XL')?" bg-red-300":""}`} onClick={()=>setSizes((prev)=>prev.includes("XL")?prev.filter((item)=>item!=="XL"):[...prev,'XL'])}>XL</p>
                    <p className={`px-3 py-1 bg-gray-300 cursor-pointer ${sizes.includes('XXL')?" bg-red-300":""}`} onClick={()=>setSizes((prev)=>prev.includes("XXL")?prev.filter((item)=>item!=="XXL"):[...prev,'XXL'])}>XXL</p>
                </div>
            </div>

            <div className="flex gap-3 items-center">
                <input checked={bestSeller} type="checkbox"  id='bestSeller' className='accent-red-500' onChange={()=>setBestSeller(prev=> !prev)}/>
                <label htmlFor="bestSeller">Add to Bestseller</label>
            </div>

            <div>
                <button className="bg-black text-white px-5 py-2 w-full cursor-pointer">Submit</button>
            </div>

        </form>
    </div>
  )
}

export default AddProduct