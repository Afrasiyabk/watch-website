import React from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../store/slices/cartSlice";
import { useDispatch} from 'react-redux';

const Cards = ({ item}) => {

  const dispatch = useDispatch();

  const AddToCart = () => {
    const data = {
      _id : item?._id,
      name: item?.name,
      image: item?.images[0]?.url,
      price: item?.price
    }
    dispatch(addToCart(data))
  } 

  return (
    <>
      <div className="w-100 md:w-80 lg:w-70 bg-[#222] p-2! rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-200">
        <div className="relative w-full overflow-hidden border-1 border-gray-500 rounded-2xl">
          <span className="absolute top-2 left-2 p-2! bg-amber-400 text-black rounded-[10px] text-sm" >{item?.category?.name}</span>
          <span className="absolute top-2 right-2 text-sm pl-3! pr-3! pt-1! pb-1! bg-white text-black rounded-[10px]">{item?.stock}</span>
          <Link to={`/product/${item._id}`}>
        <img
          src={item?.images[0]?.url}
          alt="Collection 1"
          className="w-full h-50 object-cover group-hover:scale-105 transition-transform duration-300"
        />
          </Link>
        </div>
        <div className="flex flex-col gap-2 p-4!">
          <h3 className="text-lg font-semibold">{item?.name}</h3>
          <h4 className="text-sm font-bold">Price: <span className="text-gray-400">${item?.price?.toFixed(2)}</span></h4>
            <p className="flex text-sm">Brand:<span className="ml-2! text-sm p-1! bg-amber-400 text-black rounded-[10px]">{item?.brand}</span></p>
        
          <span className="text-sm text-gray-400">{item?.description?.substring(0, 100)}......</span>
          <button className="btn-primary" onClick={AddToCart}>Add To Cart</button>
        </div>
      </div>

    </>
  );
};

export default Cards;
