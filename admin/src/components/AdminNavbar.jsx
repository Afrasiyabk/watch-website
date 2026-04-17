import React from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  const {token,name,email} = useSelector((state) => state.auth);
  return (
    <div className="h-[80px]! bg-white border-b border-gray-100 shadow shadow-[0_2px_10px_rgba(0,0,0,0.1)] flex items-center justify-between px-[40px]! sticky top-0 z-10 gap-5">
      
      {/* Search Bar */}
      <div>
        <span className='logo text-4xl' >Luxury</span>
      </div>

     {/* If token exists, show the right side actions */}

      {/* Right Side Actions */}
      {token ? (
        <div className="flex items-center gap-[25px]!">
          {/* Notifications */}
          <button className="relative text-gray-400 hover:text-[#A14714] transition-colors">
            <FaBell size={20} />
            <span className="absolute -top-[5px]! -right-[5px]! bg-red-500 text-white text-[10px]! w-[18px]! h-[18px]! flex items-center justify-center rounded-full border-2 border-white">
            3
          </span>
        </button>

        {/* Admin Profile */}
        <div className="flex items-start gap-[12px]! border-l pl-[25px]! border-gray-100">
          <div className="text-start">
            <p className="text-sm font-black text-gray-800 leading-none"> {name} </p>
            <p className="text-[10px]! text-green-500 font-bold uppercase mt-[4px]!"> {email} </p>
          </div>
          <div className="text-gray-300">
            <FaUserCircle size={35} />
          </div>
        </div>

      </div>
      ) : (
        <Link to="/admin-login">
          <button  className="bg-[#A14714] text-white py-[10px]! px-[20px]! rounded-xl font-bold uppercase tracking-widest hover:bg-orange-800 transition-all">Login to Panel</button>
        </Link> 
      )}
    </div>
  );
};

export default AdminNavbar;