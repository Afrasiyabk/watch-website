import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import ManageProducts from './pages/ManageProducts';
import ManageCategories from './pages/ManageCategories';
import Orders from './pages/Orders';
import AdminLayout from './pages/AdminLayout';
import Users from './pages/Users';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Login Page (No Sidebar) */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/" element={<AdminLayout />}>
          {/* Automatically show Dashboard when arriving at "/" */}
          <Route index element={<Dashboard />} />
          
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="categories" element={<ManageCategories />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          
          {/* Catch-all: Redirect unknown paths to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;