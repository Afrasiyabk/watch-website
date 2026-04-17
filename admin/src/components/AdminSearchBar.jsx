// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { globalSearch } from "../store/slices/searchSlice";
// import { useNavigate } from "react-router-dom";

// const AdminSearchBar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { results, loading } = useSelector(state => state.search);

//   const [query, setQuery] = useState("");

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!query) return;
//     const res = await dispatch(globalSearch(query)).unwrap();
//     console.log(res); // Check search results
//   };

//   const handleSelect = (item) => {
//     if (item.type === "product") navigate(`/admin/products/${item._id}`);
//     if (item.type === "category") navigate(`/admin/categories/${item._id}`);
//     if (item.type === "user") navigate(`/admin/users/${item._id}`);
//     if (item.type === "order") navigate(`/admin/orders/${item._id}`);
//   };

//   return (
//     <div className="relative">
//       <form onSubmit={handleSearch}>
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search products, categories, users, orders..."
//           className="p-2 border rounded w-full"
//         />
//       </form>
//       {results.length > 0 && (
//         <div className="absolute bg-white shadow-lg w-full max-h-60 overflow-auto mt-1 rounded">
//           {results.map(item => (
//             <div key={item._id} onClick={() => handleSelect(item)} className="p-2 cursor-pointer hover:bg-amber-100">
//               <span className="font-bold">{item.name || item.fullName || item._id}</span>
//               <span className="ml-2 text-gray-400 text-xs">({item.type})</span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminSearchBar;