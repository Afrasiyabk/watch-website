import React from 'react'
import './index.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Products from './pages/Products'
import Services from './pages/Services'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProductSinglePage from './pages/ProductSinglePage'
import Searchdata from './pages/SearchData'
import CartPage from './pages/CartPage'
import Orders from './pages/Orders'

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<Products />} />
          <Route path="/search-results" element={<Searchdata />} />
          <Route path="/product/:id" element={<ProductSinglePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/cart-page" element={<CartPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
