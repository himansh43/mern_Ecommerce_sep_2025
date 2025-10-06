import React from 'react'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import NavBar from './Components/NavBar'
import { Route, Routes } from 'react-router-dom'
import About from './Pages/About'
import ContactUs from './Pages/ContactUs'
import Login from './Pages/Login'
import Collections from './Pages/Collections'
import Product from './Pages/Product'
import PlaceOrder from './Pages/PlaceOrder'
import Cart from './Pages/Cart'
import Orders from './Pages/Orders'
import Error from './Pages/Error'
import { useStoreContext } from './Context/StoreContext'
import Verify from './Pages/Verify'

const App = () => {
  const {token}= useStoreContext()
  
  return (
    <div className='w-[90%] m-auto'>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/collections' element={<Collections/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contactus' element={<ContactUs/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/product/:id' element={<Product/>}/>
        <Route path='/placeorder' element={<PlaceOrder/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='*' element={<Error/>}/>
        <Route path='/verify' element={<Verify/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App