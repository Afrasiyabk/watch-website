import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar'; // Make sure to import your AdminSidebar component
import AdminNavbar from '../components/AdminNavbar'; // Import it here

const AdminLayout = () => {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <div className="flex bg-[#F8F9FA] min-h-screen">
      {/* 1. SIDEBAR (Left) */}
      <AdminSidebar />

      {/* 2. RIGHT SIDE WRAPPER */}
      <div className="flex-1 ml-[260px]! flex flex-col">
        
        {/* 3. NAVBAR (Top) */}
        <AdminNavbar />

        {/* 4. CONTENT AREA (Bottom) */}
        <main className="p-[40px]!">
          <div className="max-w-7xl mx-auto!">
            <Outlet /> 
          </div>
        </main>
        
      </div>
    </div>
  );
};

export default AdminLayout;