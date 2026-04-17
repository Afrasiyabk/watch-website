import React, { useEffect} from "react";
import { useLocation} from "react-router-dom";
//import { globalSearch } from "../store/slices/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../components/Cards";
import { fetchProducts } from "../store/slices/product";


const SearchPage = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search');

    //const {results} = useSelector(state=> state.search);
    const {products} = useSelector(state=> state.product);
    const dispatch = useDispatch();

    useEffect(() => {
      window.scrollTo(0, 0);
        dispatch(fetchProducts());
        //dispatch(globalSearch(search));
    }, [search]);


   const filterdata = products.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()) || item.category?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col gap-10 p-5! md:p-8! lg:p-[70px]!">
        <h1 className="text-4xl font-bold text-center mb-2!">Search Page</h1>
        <p className=" text-sm md:text-xl text-center mb-10!">
          Explore our diverse range of watch collections, from timeless classics
          to cutting-edge smartwatches, designed to suit every style and
          occasion.
        </p>

        <div className="flex flex-col md:flex-row flex-wrap gap-10" >
            {filterdata.length > 0 ?
            (
              filterdata?.map((item,i)=>( 
               <Cards item={item} i={i} key={i} />
              ))
            )
            :
            (
            <p className="text-lg text-center">
            No watches found matching your search criteria.
          </p>
            )
            }
        </div>

      </div>
    </>
  );
};

export default SearchPage;
