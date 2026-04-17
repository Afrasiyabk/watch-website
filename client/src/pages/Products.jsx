
import React,{useState} from "react";
import Cards from "../components/Cards";
import { fetchProducts } from "../store/slices/product";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllCategories } from "../store/slices/categorySlice";

export default function Collections(){

    const {products,loading,error} = useSelector(state=>state.product);
    const {categories} = useSelector(state=>state.category);
    const dispatch = useDispatch();
    const [filter, setFilter] = useState('All');

useEffect(() => {
    dispatch(fetchAllCategories())
    dispatch(fetchProducts());
}, [dispatch]);

const [search,setSearch]=useState("");

const filteredProducts = products.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
   const matchesFilter = filter === 'All' || item.category?.name === filter;
    return matchesSearch && matchesFilter;
});

return(

<div className='flex flex-col gap-10 p-5! md:p-8! lg:p-[70px]!' >

<div>

<h1 className="text-4xl font-bold text-center mb-2!">
Watch Collections
</h1>
<p className=" text-sm md:text-xl text-center mb-10!">
Explore our diverse range of watch collections, from timeless classics to cutting-edge smartwatches, designed to suit every style and occasion.
</p>

{/* search + filters */}

<div className="flex flex-col md:flex-row gap-4 mb-12! bg-[#222] p-2! rounded">
<input
type="text"
placeholder="Search watches..."
className=" outline-0 rounded p-4! flex-1"
onChange={(e)=>setSearch(e.target.value)}
/>

<select
className="bg-amber-400 text-black rounded p-4! w-48! outline-0 hover:scale-105 duration-200 transition-all cursor-pointer"
onChange={(e)=>setFilter(e.target.value)}
>

<option>All</option>
{categories?.map((item)=>(
    <option value={item?.name}>{item?.name}</option>
))}
</select>

</div>

{/* products */}

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

{filteredProducts?.map((item,index)=>(
<Cards item={item} i={index}  key={item?._id}/>
 ))}

</div>

</div>
</div>

)
}