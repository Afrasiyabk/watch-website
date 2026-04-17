import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBox, FaShoppingCart, FaUsers, FaChartLine, FaSignOutAlt, FaWatchmanMonitoring, FaClock } from 'react-icons/fa';
import { useDispatch} from 'react-redux';
import { logout } from '../store/slices/authSlice';

const AdminSidebar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // 1. Tell Redux to clear the state
    dispatch(logout());
    // 2. Send the user back to the login page
    navigate('/admin-login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: <FaChartLine />, path: '/dashboard' },
    { name: 'Watches', icon: <FaClock />, path: '/products' },
    { name: 'Categories', icon: <FaBox />, path: '/categories' },
    { name: 'Orders', icon: <FaShoppingCart />, path: '/orders' },
    { name: 'Users', icon: <FaUsers />, path: '/users' },
  ];

  return (
    <div className="w-[260px]! h-screen bg-gray-900 text-white fixed left-0 top-0 flex flex-col">
      {/* Brand Header */}
      <div className="p-[24px]! border-b border-gray-800">
        <h2 className="text-xl font-black text-[#A14714] tracking-wider">SYNCWATCH ADMIN</h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 mt-[20px]!">
        {menuItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.path} 
            className={location.pathname === item.path ? `flex items-center gap-[15px]! px-[24px]! py-[15px]! bg-[#A14714]` : `flex items-center gap-[15px]! px-[24px]! py-[15px]! hover:bg-[#9647193b] transition-colors font-semibold`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Logout at Bottom */}
      <div className="p-[20px]! border-t border-gray-800">
        <button onClick={handleLogout} className="flex items-center gap-[10px]! text-red-400 hover:text-red-300 font-bold transition-all">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;