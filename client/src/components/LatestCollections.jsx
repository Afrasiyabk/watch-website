import React, { useRef } from 'react';
import Cards from './Cards.jsx'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/product.js';

const LatestCollections = (props) => {

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
      dispatch(fetchProducts());
    }, [dispatch]);

  return (
    <div className='flex flex-col pt-10!' >
        <h2 className='text-3xl font-bold text-center mb-2' >{props.title}</h2>
        <p className='text-center'>{props.desc}</p>
        <div className="flex flex-wrap justify-center gap-5 mt-5!">
          {products?.slice(2, 8).map((product,i) => (
            <Cards key={product?._id} item={product} i={i} />
          ))}
        </div>
    </div>
  )
}

export default LatestCollections;
