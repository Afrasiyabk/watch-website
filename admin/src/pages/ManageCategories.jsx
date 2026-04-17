import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryCreate, fetchAllCategories, categoryDelete, resetCategoryState } from "../store/slices/categorySlice";
import { FaTrash, FaCloudUploadAlt } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";

const ManageCategories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error, success } = useSelector((state) => state.category);

  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setName("");
      setFile(null);
      setPreview(null);
      dispatch(resetCategoryState());
    }
  }, [success, dispatch]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    //svg and png both
    if (selectedFile && selectedFile.type === "image/png") {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      alert("Please upload a PNG file only.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", file);
    dispatch(categoryCreate(formData));
  };

  const handleDelete = async (id) => {
    // 1. Ask for confirmation (good practice for delete)
    if (window.confirm("Are you sure you want to delete this watch?")) {
      try {
        // 2. Wait for the delete to finish in the backend
        await dispatch(categoryDelete(id)).unwrap();
        // 3. Only after success, fetch the updated list
        dispatch(fetchAllCategories());
        
        // Optional: Show a success message
        alert("Product deleted successfully");
      } catch (err) {
        // 4. If backend fails (e.g., database error), show the error
        alert("Delete failed: " + err);
      }
    }
  };
  

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-black mb-8 text-gray-800 uppercase tracking-tight">Category Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CREATE FORM */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold mb-4">Add New Category</h2>
          {error && <p className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded-lg">⚠️ {error}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer relative">
              {preview ? (
                <img src={preview} alt="preview" className="h-20 w-20 object-contain" />
              ) : (
                <div className="flex flex-col items-center">
                  <FaCloudUploadAlt className="text-3xl text-gray-400" />
                  <span className="text-xs font-bold text-gray-400">Upload SVG Icon</span>
                </div>
              )}
              <input type="file" accept=".png" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" required />
            </div>

            <input
              type="text"
              placeholder="Category Name (e.g. Luxury)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 bg-gray-50 border rounded-2xl focus:border-[#A14714] outline-none font-medium"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#A14714] text-white py-4 rounded-2xl font-black hover:bg-orange-900 transition-all disabled:bg-gray-300"
            >
              {loading ? <CircularProgress size={20} color="inherit" /> : "Save Category"}
            </button>
          </form>
        </div>

        {/* CATEGORY TABLE */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase">Icon</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase">Name / Slug</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {categories?.map((cat) => (
                <tr key={cat?._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl p-2">
                      <img src={cat?.image?.url} alt={cat?.name} className="w-full h-full object-contain" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-800">{cat?.name}</p>
                    <p className="text-[10px] text-gray-400 font-mono tracking-tighter italic">{cat?.slug}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() =>{handleDelete(cat?._id)}}
                      className="text-gray-300 hover:text-red-600 transition-all"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;