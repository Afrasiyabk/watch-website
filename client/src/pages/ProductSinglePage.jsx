// src/pages/ProductSinglePage.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById, fetchProducts } from '../store/slices/product';
import { addToCart } from '../store/slices/cartSlice';
import Cards from '../components/Cards';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const ProductSinglePage = () => {

  const dispatch = useDispatch();
  const { id } = useParams();

  const { product, products } = useSelector(state => state.product);
  const { cartItems } = useSelector(state => state.cart);

  const [url, setUrl] = useState('');

  // ✅ REVIEW STATE
  const [review, setReview] = useState({
    rating: 5,
    comment: ''
  });

  // ✅ CHECK PRODUCT IN CART
  const isInCart = cartItems.some(item => item._id === product?._id);

  // ✅ ADD TO CART
  const handleAddToCart = () => {
    if (isInCart) return;

    dispatch(addToCart({
      _id: product._id,
      name: product.name,
      image: product.images[0]?.url,
      price: product.price
    }));
  };

  // ✅ FETCH DATA
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchProductById({ id }));
    dispatch(fetchProducts()); // for related
  }, [dispatch, id]);

  // ✅ RELATED PRODUCTS
const relatedProducts = products
  ?.filter(p => {
    const pCat = typeof p.category === "object" ? p.category._id : p.category;
    const prodCat = typeof product?.category === "object"
      ? product.category._id
      : product?.category;

    return pCat === prodCat && p._id !== product?._id;
  })
  .slice(0, 4);

  // ✅ REVIEW SUBMIT
  const submitReview = async (e)  => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/review/write`, review);
      return res
    } catch (error) {
      console.log(res.error.message);
    }
  };

  return (
    <div className="p-5! md:p-8! lg:p-[70px]!">

      {/* PRODUCT SECTION */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* LEFT IMAGE */}
        <div className="w-full lg:w-1/2 flex flex-col gap-3">

          <img
            src={url || product?.images?.[0]?.url}
            className="w-full h-[400px] object-cover rounded-lg border"
          />

          <div className="flex gap-2">
            {product?.images?.map(img => (
              <img
                key={img?._id}
                src={img?.url}
                onClick={() => setUrl(img?.url)}
                className="w-20 h-20 object-cover border rounded cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* RIGHT DETAILS */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">

          <span className="bg-amber-400 text-white px-3! py-1! rounded w-fit">
            {product?.category?.name}
          </span>
           <span className="bg-amber-400 text-white px-3! py-1! rounded w-fit">
            {product?.brand}
          </span>

          <h1 className="text-3xl font-bold">{product?.name}</h1>

          <p className="text-gray-600">{product?.description}</p>

          <p className="text-xl font-semibold">${product?.price}</p>

          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`px-5! py-2! rounded ${
              isInCart
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-amber-500 text-white hover:scale-105'
            }`}
          >
            {isInCart ? "Already in Cart" : "Add to Cart"}
          </button>

        </div>
      </div>

      {/* REVIEW SECTION */}
      <div className="mt-10!">
        <h2 className="text-xl font-bold mb-3!">Write a Review</h2>
        <form onSubmit={submitReview}>
        <select
          value={review.rating}
          onChange={(e) => setReview({ ...review, rating: e.target.value })}
          className="border p-2! rounded mb-2!"
        >
          {[5,4,3,2,1].map(n => (
            <option key={n} value={n}>{n} ⭐</option>
          ))}
        </select>

        <textarea
          className="w-full border p-2! rounded mb-2!"
          placeholder="Write your review..."
          value={review.comment}
          onChange={(e) => setReview({ ...review, comment: e.target.value })}
        />

        <button
          className="bg-green-500 text-white px-4! py-2! rounded"
        >
          Submit Review
        </button>
        </form>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-10!">
        <h2 className="text-xl font-bold mb-4!">Related Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts?.map(item => (
            <Cards item={item} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProductSinglePage;