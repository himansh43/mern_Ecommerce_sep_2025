import React from 'react'
import OurPolicy from '../Components/OurPolicy'
import NewsLetter from '../Components/NewsLetter'
import BestSellers from '../Components/BestSellers'
import LatestCollections from '../Components/LatestCollections'
import HeroSection from '../Components/HeroSection'


const Home = () => {
 console.log(" home is running ");
  return (
    <div>
        <HeroSection/>
        <LatestCollections/>
        <BestSellers/>       
        <OurPolicy/>
        <NewsLetter/>
    </div>
  )
}

export default Home