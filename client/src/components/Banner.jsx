import React from 'react';
import img from '../assets/hero-img.png';

const Banner = () => {
  return (
    <section className="w-full bg-[#222] mt-10! rounded-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
        
        {/* Left Side: content */}
        <div className="flex flex-col w-full md:w-1/2 items-center text-center md:items-start md:text-start p-4! md
        :p-4! lg:p-8!">
          <div className="inline-block  rounded-full bg-orange-100 text-[#A14714] text-sm font-bold tracking-widest uppercase mb-4!">
            New Arrival
          </div>
          
          <h2 className="text-4xl md:text-3xl lg:text-4xl font-extrabold! text-gray-800 leading-tight mb-3!">
            SYNCWATCH: <br />
            <span className="text-orange-400">STYLE & PERFORMANCE</span> UNIFIED
          </h2>
          
          <p className="text-gray-600 text-lg md:text-sm lg:text-xl leading-relaxed mb-3! max-w-lg text-center md:text-start">
            Designed for the active lifestyle and modern aesthetic. 
            Experience complete integration with 10-day battery life, 
            precision health tracking, and seamless connectivity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-orange-400 hover:bg-orange-800 text-white px-8! py-4! md:px-3! md:py-2! lg:px-8! lg:py-4! rounded-xl font-bold text-lg md:text-md lg:text-lg shadow-lg transition-all transform hover:-translate-y-1">
              Shop The Collection
            </button>
            <button className="border-2 border-[#A14714] text-[#A14714] hover:bg-[#A14714] hover:text-white px-8! py-4! md:px-3! md:py-2! lg:px-8! lg:py-4! rounded-xl font-bold text-lg md:text-md lg:text-lg transition-all">
              Learn More
            </button>
          </div>

          {/* Small Feature Tags */}
          <div className="mt-10! flex gap-6 border-t border-orange-200 pt-6!">
            <div className="flex flex-col">
              <span className="text-1xl md:text-2xl font-bold text-white">10 Days</span>
              <span className="text-sm text-gray-500">Battery Life</span>
            </div>
            <div className="h-10 w-[1px] bg-orange-200"></div>
            <div className="flex flex-col">
              <span className="text-1xl md:text-2xl font-bold text-white">50m</span>
              <span className="text-sm text-gray-500">Waterproof</span>
            </div>
            <div className="h-10 w-[1px] bg-orange-200"></div>
            <div className="flex flex-col">
              <span className="text-1xl md:text-2xl font-bold text-white">AMOLED</span>
              <span className="text-sm text-gray-500">Ultra-HD</span>
            </div>
          </div>
        </div>
        
        <hr className='w-[90%] h-full text-orange-800 md:hidden' />

        {/* Right Side: image */}
        
        <div className="w-full md:w-1/2 flex justify-center p-3! group">
          <div className="relative">
            {/* Soft decorative glow behind watch */}
            <div className="absolute inset-0 bg-black  rounded-2xl w-[550] h-[550]"></div>
            <img 
              src={img} 
              alt="SyncWatch Premium" 
              className="relative w-[100%] object-cover group-hover:scale-105 transition-transform duration-300 h-[560px] rounded-2xl shadow-2xl shadow-gray-800"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Banner;