import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { globalSearch } from "../store/slices/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";

export default function SearchBar() {

  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {results, loading} = useSelector(state=> state.search);

  // 🔥 debounce
  useEffect(() => {
    const timer = setTimeout(async () => {

      if (!query.trim()) {
        return;
      }
      try {
        dispatch(globalSearch(query));
        setShow(true);
      } catch (err) {
        console.error(err);
      }

    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // 🔥 click product
  const handleClick = (p) => {
    setShow(false);
    setQuery("");
    navigate(`/search-results?search=${p.name}`);
  };

  return (
    <div className="relative w-full max-w-xl">
        <div className="flex flex-row w-fit rounded-full border border-gray-400">
      <input
        type="search"
        placeholder="Search watches..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='p-3! rounded-full outline-0'
      />
      <button className="flex items-center justify-center p-4! bg-amber-400 rounded-full" ><BsSearch size={'20px'}/> </button>
        </div>


      {/* 🔥 DROPDOWN */}
      {show && results.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-2xl mt-2 z-50">
          {loading ? 
          (
            <div className="p-3! text-center text-gray-500">Loading...</div>
          )
          :
          (
          results?.map((p) => (
            <div
              key={p._id}
              onClick={() => handleClick(p)}
              className="flex items-center gap-3 p-3! hover:bg-amber-100 cursor-pointer rounded-2xl"
            >
              <img
                src={p?.images[0]?.url}
                alt={p?.name}
                className="w-10 h-10 object-cover rounded"
              />
              <span className="font-medium text-black">{p?.name}</span>
            </div>
          ))
        )
      }

        </div>
      )}

    </div>
  );
}