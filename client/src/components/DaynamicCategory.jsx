import React, { useEffect } from 'react';
import { fetchAllCategories } from '../store/slices/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DaynamicCategory = (props) => {

    const {categories} = useSelector(state=>state.category);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchAllCategories())
    }, []);

  return (
   <div className='flex flex-col pt-10!' >
        <h2 className='text-3xl font-bold text-center mb-2' >{props.title}</h2>
        <p className='text-center'>{props.desc}</p>
        <div className="flex flex-wrap justify-center gap-5 mt-5!">
            {categories?.map((item,i) => (
                <div key={item?._id} onClick={()=>{Navigate(`/search-results?search=${item?.name}`)}} className='flex flex-col items-center gap-3 p-5! rounded-2xl bg-[#222] border border-gray-300 hover:scale-105 duration-200 transition-all cursor-pointer' >
                    <img src={item?.image?.url} alt={item?.name} className='w-32! h-32! object-cover' />
                    <h3>{item?.name}</h3>
                </div>
            ))}
        </div>
    </div>
  )
}

export default DaynamicCategory
