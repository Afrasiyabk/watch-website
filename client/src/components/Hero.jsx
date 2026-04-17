import React from 'react';
import { Link } from 'react-router-dom';
import { TiShoppingCart, TiVideo } from "react-icons/ti";
import img from '../assets/hero-sec-img.png';

const Hero = () => {
  return (
    <>
      <div>
    <div className='relative flex flex-col lg:flex-row items-center pl-5! pr-5! rounded-2xl! h-[650px] z-10 border-b border-gray-500'
    style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'left' }}
    >

        <div className="flex flex-col text-center lg:text-start justify-center md:item-start w-full lg:w-[70%] p-5! md:p-8! lg:p-[70px]! gap-5">
            <h1 className='hero-title text-4xl! md:text-6xl! font-bold w-[90%]'>
               <span className='text-amber-400'>Luxury Black Watches</span> - Where Elegance Meets Innovation
               </h1>
            <p className="hero-description text-gray-50 w-[90%]">Track your heart rate, monitor your sleep, and stay connected—all with a 10-day battery life and a design that refuses to be ignored. Experience the perfect blend of high-performance tech and vibrant aesthetics.</p>
            <div className='flex flex-row gap-4'>
              <button className='btn-primary'>
                <Link to="/products">Shop Now</Link>
              </button>
              <button className='btn-secondary'>
                <TiVideo /> Watch Demo
              </button>
            </div>
        </div>
    </div>
    </div>
    </>

  )
}

export default Hero
