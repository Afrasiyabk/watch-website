import React from "react";
import { BsSmartwatch } from "react-icons/bs";
import { IoIosFitness } from "react-icons/io";
import { FaHeadphones } from "react-icons/fa";

const Category = () => {
  return (
      <div className="flex flex-col md:flex-row items-center justify-center w-full md:w-full gap-5 bg-[#222] p-4! rounded-2xl mt-[-150px]! z-10 relative border border-gray-100">
        <div className="flex flex-col items-start justify-center border border-gray-400 p-2! shadow-2xl shadow-gray-700 rounded-2xl gap-2">
          <button className="flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-100 p-3!">
            <BsSmartwatch className="text-[50px] text-orange-400" />
          </button>
          <h3 className="text-2xl font-bold">Smartwatches</h3>
          <p className="text-sm text-gray-500">
            Discover our range of smartwatches designed to keep you connected
            and on track.
          </p>
        </div>
          <div className="flex flex-col items-start justify-center border border-gray-400 p-2! shadow-2xl shadow-gray-700 rounded-2xl  gap-2">
            <button className="flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-100 p-3!">
              <IoIosFitness className="text-[30px] text-orange-400" />
            </button>
            <h3 className="text-2xl font-bold">Fitness Trackers</h3>
            <p className="text-sm text-gray-500">
              Explore our fitness trackers that help you monitor your health and
              achieve your fitness goals.
            </p>
          </div>
          <div className="flex flex-col items-start justify-center border border-gray-400 p-2! shadow-2xl shadow-gray-700 rounded-2xl gap-2">
            <button className="flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-100 p-3!">
              <FaHeadphones className="text-[50px] text-orange-400" />
            </button>
            <h3 className="text-2xl font-bold">Headphones</h3>
            <p className="text-sm text-gray-500">
              Experience high-quality sound with our range of headphones,
              perfect for music lovers and audiophiles.
            </p>
          </div>
        
      </div>

  );
};

export default Category;
