import React from 'react'
import Hero from '../components/Hero'
import Category from '../components/Category'
import PopularCollection from '../components/PopularCollection'
import Banner from '../components/Banner'
import LatestCollections from '../components/LatestCollections'
import Testimonial from '../components/Testimonial'
import DaynamicCategory from '../components/DaynamicCategory'

const Home = () => {
  return (
        <div>
            <Hero />
            <div className='flex flex-col gap-10 p-5! md:p-8! lg:p-[70px]!' >
            <Category />
            <DaynamicCategory title={'Categories'} desc={'Explore our wide range of categories.'} />
            <PopularCollection title={'Our Popular Collections'} desc={'Discover our most sought-after products and collections.'} />   
        <Banner /> 
         <LatestCollections title={'Our Latest Collections'} desc={'Check out our newest arrivals and latest designs.'} /> 
         <Testimonial />
            </div>

    </div>
  )
}

export default Home
