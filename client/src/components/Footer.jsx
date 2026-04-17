import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import logo from '../assets/logo.png'; // Using your logo

const Footer = () => {
  return (
    <footer className="bg-[#222] pt-16! pb-8! border-t border-orange-100">
      <div className="max-w-7xl mx-auto px-6! md:px-12!">
        
        {/* Top Section: Newsletter & Branding */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16!">
          <div className="col-span-1">
              <p id='logo' className=" logo text-5xl! text-white! mb-2!">Luxury</p>
            <p className="text-gray-600 leading-relaxed">
              Elevate your daily rhythm with cutting-edge technology and vibrant style. Precision tracking for the modern life.
            </p>
          </div>

          <div className="col-span-2 flex flex-col md:flex-row justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#A14714] mb-6! uppercase tracking-wider">Join the Movement</h3>
              <p className="text-gray-600 mb-4! text-sm">Subscribe to get special offers and first looks at new colors.</p>
              <form className="flex w-full max-w-md">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4! py-3! rounded-l-xl focus:outline-none border-2 border-transparent focus:border-[#A14714] bg-white text-gray-800"
                />
                <button className="bg-[#A14714] text-white px-6! py-3! rounded-r-xl font-bold hover:bg-orange-800 transition-colors">
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12! border-y border-orange-200 py-12!">
          <div>
            <h4 className="font-bold text-gray-800 mb-4!">Shop</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-[#A14714] cursor-pointer">Orange Series</li>
              <li className="hover:text-[#A14714] cursor-pointer">Pink Edition</li>
              <li className="hover:text-[#A14714] cursor-pointer">Accessories</li>
              <li className="hover:text-[#A14714] cursor-pointer">Gift Cards</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-4!">Company</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-[#A14714] cursor-pointer">About Us</li>
              <li className="hover:text-[#A14714] cursor-pointer">Sustainability</li>
              <li className="hover:text-[#A14714] cursor-pointer">Careers</li>
              <li className="hover:text-[#A14714] cursor-pointer">Blog</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-4!">Support</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-[#A14714] cursor-pointer">Help Center</li>
              <li className="hover:text-[#A14714] cursor-pointer">Shipping</li>
              <li className="hover:text-[#A14714] cursor-pointer">Returns</li>
              <li className="hover:text-[#A14714] cursor-pointer">Warranty</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-4!">Connect</h4>
            <div className="flex gap-4 mt-2">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#A14714] hover:bg-[#A14714] hover:text-white transition-all cursor-pointer shadow-sm">
                <FaFacebookF />
              </div>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#A14714] hover:bg-[#A14714] hover:text-white transition-all cursor-pointer shadow-sm">
                <FaTwitter />
              </div>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#A14714] hover:bg-[#A14714] hover:text-white transition-all cursor-pointer shadow-sm">
                <FaInstagram />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 SyncWatch Labs. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-[#A14714] cursor-pointer underline underline-offset-4">Privacy Policy</span>
            <span className="hover:text-[#A14714] cursor-pointer underline underline-offset-4">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;