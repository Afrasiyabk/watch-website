import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Grab the status from Redux Store
  const { loading, error, token } = useSelector((state) => state.auth);

  // If token exists (login successful), move to dashboard
  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatching the async function with user credentials
    dispatch(loginAdmin({ email, password }));
     if (token) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-[20px]!">
      <form onSubmit={handleSubmit} className="bg-white p-[40px]! rounded-3xl w-full max-w-[400px]!">
        <h2 className="text-2xl font-black mb-[20px]! text-center">ADMIN LOGIN</h2>
        
        {/* Show error from Redux if login fails */}
        {error && <p className="bg-red-100 text-red-600 p-[10px]! rounded-lg mb-[15px]! text-sm font-bold">{error}</p>}

        <input 
          type="email" 
          placeholder="Email" 
          className="w-full mb-[15px]! p-[15px]! bg-gray-100 rounded-xl outline-none"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full mb-[20px]! p-[15px]! bg-gray-100 rounded-xl outline-none"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button 
          disabled={loading}
          className="w-full bg-[#A14714] text-white py-[15px]! rounded-xl font-bold uppercase tracking-widest hover:bg-orange-800 transition-all disabled:bg-gray-400"
        >
          {loading ? "Authenticating..." : "Login to Panel"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;