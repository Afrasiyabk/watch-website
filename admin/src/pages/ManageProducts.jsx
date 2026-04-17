import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaMinus,
  FaCloudUploadAlt,
  FaTrash,
  FaEdit,
  FaEye,
  FaSearch,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  productCreate,
  setCreateBox,
  productFetchAll,
  productDelete,
  resetProductState,
  setEditBox,
  productFetchById,
  setProductId,
  productEdit,
} from "../store/slices/productSlice"; // Add fetchAllProducts if you have it
import Rating from "@mui/material/Rating";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import { fetchAllCategories } from "../store/slices/categorySlice";

const ManageProducts = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  // Add a state to track existing images from the DB
  const [existingImages, setExistingImages] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  // Get data from Redux
  const {
    createBox,
    loading,
    products,
    product,
    success,
    error,
    editBox,
    productId,
  } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    ratings: 1,
  });
  const [editform, setEditForm] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    ratings: 1,
  });

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(productFetchAll());
  }, [dispatch]);

  const filterProducts = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || item.category?.name === filter;
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);
  // NEW: Effect to fill the edit form whenever the 'product' data changes in Redux
  useEffect(() => {
    if (product && editBox) {
      setEditForm({
        name: product.name || "",
        description: product.description || "",
        brand: product.brand || "",
        category: product.category || "",
        price: product.price || "",
        stock: product.stock || "",
        ratings: Number(product.ratings) || 1,
      });
      setExistingImages(product.images || []);
      setSelectedFiles([]);
      setPreviews([]);
    }
  }, [product, editBox]);
  // FIXED: Handle Edit function
  const handleedit = (id) => {
    dispatch(setProductId(id)); // Save ID to store
    dispatch(setEditBox(true)); // Open modal
    dispatch(productFetchById(id)); // Pass 'id' directly here instead of 'productId' from state
  };
  const handlecloseeditform = () => {
    dispatch(setEditBox(false));
    dispatch(resetProductState());
  };
  useEffect(() => {
    if (success && !createBox) {
      dispatch(productFetchAll);
    }
  }, [success, dispatch]);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onEditChange = (e) => {
    setEditForm({ ...editform, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedFiles.length > 4) {
      alert("Maximum 4 images allowed");
      return;
    }
    setSelectedFiles([...selectedFiles, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };
  const removeImage = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };
  const handleDelete = async (id) => {
    // 1. Ask for confirmation (good practice for delete)
    if (window.confirm("Are you sure you want to delete this watch?")) {
      try {
        // 2. Wait for the delete to finish in the backend
        await dispatch(productDelete(id)).unwrap();

        // 3. Only after success, fetch the updated list
        dispatch(productFetchAll());

        // Optional: Show a success message
        alert("Product deleted successfully");
      } catch (err) {
        // 4. If backend fails (e.g., database error), show the error
        alert("Delete failed: " + err);
      }
    }
  };
  const handleOpenCreateBox = () => {
    dispatch(resetProductState()); // Clear old errors/success
    dispatch(setCreateBox(true));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    selectedFiles.forEach((file) => data.append("images", file));

    // 3. Use .unwrap() to handle the result locally
    try {
      await dispatch(productCreate(data)).unwrap();

      // ONLY if successful:
      dispatch(setCreateBox(false));
      setFormData({
        name: "",
        description: "",
        brand: "",
        category: "",
        price: "",
        stock: "",
        ratings: 1,
      });
      setSelectedFiles([]);
      setPreviews([]);
      dispatch(productFetchAll()); // Refresh table
    } catch (err) {
      // Logic stays here if it fails. The box stays open.
      console.error("Upload failed:", err);
    }
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!productId) {
      alert("Product ID is missing!");
      return;
    }

    const data = new FormData();
    Object.keys(editform).forEach((key) => data.append(key, editform[key]));

    selectedFiles.forEach((file) => {
      data.append("newImg", file);
    });

    // 3. Logic for Deletion:
    // Your backend looks for 'imagesToDelete'.
    // We calculate which images were removed by comparing the original product images
    // with your 'existingImages' state.
    const originalImages = product.images.map((img) => img.url);
    const currentImages = existingImages.map((img) => img.url);
    const deletedUrls = originalImages.filter(
      (url) => !currentImages.includes(url),
    );

    data.append("imagesToDelete", JSON.stringify(deletedUrls));

    // 3. Use .unwrap() to handle the result locally
    try {
      await dispatch(productEdit({ id: productId, form: data })).unwrap();
      // ONLY if successful:
      dispatch(setEditBox(false));
      setEditForm({
        name: "",
        description: "",
        brand: "",
        category: "",
        price: "",
        stock: "",
        ratings: 1,
      });
      setSelectedFiles([]);
      setPreviews([]);
      dispatch(productFetchAll()); // Refresh table
    } catch (err) {
      // Logic stays here if it fails. The box stays open.
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Modal for Create Product */}
      {createBox && (
        <div className="fixed inset-0 flex items-center justify-center p-5 z-50 backdrop-blur-sm bg-black/40">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-gray-800">
                Create New Watch
              </h2>
              <button
                onClick={() => dispatch(setCreateBox(false))}
                className="text-white p-3 bg-orange-700 rounded-[4px] hover:scale-110 transition-all duration-300"
              >
                <FaMinus />
              </button>
            </div>
            {error && (
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-bold rounded-r-lg">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-2 border-dashed border-gray-200 p-4 rounded-2xl bg-gray-50">
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {previews.map((url, index) => (
                    <div key={index} className="relative group h-24">
                      <img
                        src={url}
                        className="h-full w-full object-cover rounded-lg border"
                        alt="preview"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md"
                      >
                        <FaTrash size={10} />
                      </button>
                    </div>
                  ))}
                  {selectedFiles.length < 4 && (
                    <label className="h-24 flex flex-col items-center justify-center border-2 border-gray-200 border-dotted rounded-lg cursor-pointer hover:bg-white transition-all">
                      <FaCloudUploadAlt className="text-gray-400 text-xl" />
                      <span className="text-[10px] font-bold text-gray-400">
                        Add Image
                      </span>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Watch Name"
                  value={formData.name}
                  onChange={onChange}
                  className="p-3 bg-gray-50 border rounded-xl outline-none focus:border-orange-500"
                  required
                />
                <input
                  type="text"
                  name="brand"
                  placeholder="Watch brand"
                  value={formData.brand}
                  onChange={onChange}
                  className="p-3 bg-gray-50 border rounded-xl outline-none focus:border-orange-500"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={onChange}
                  className="col-span-2 p-3 bg-gray-50 border rounded-xl h-24"
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={onChange}
                  className="p-3 bg-gray-50 border rounded-xl"
                  required
                />
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={onChange}
                  className="p-3 bg-gray-50 border rounded-xl"
                  required
                />
                {categories && (
                  <select
                    name="category"
                    value={formData.category}
                    onChange={onChange}
                    className="p-3 bg-gray-50 border rounded-xl"
                  >
                    <option value="">Select Category</option>
                    {categories?.map((category) => (
                      <option key={category?._id} value={category?._id}>
                        {category?.name}
                      </option>
                    ))}
                  </select>
                )}
                <div className="flex flex-col justify-center">
                  <span className="text-xs font-bold text-gray-400 ml-1">
                    Rating
                  </span>
                  <Rating
                    precision={0.5}
                    value={Number(formData.ratings)}
                    onChange={(e, val) =>
                      setFormData({ ...formData, ratings: val })
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#A14714] text-white py-4 rounded-2xl font-black hover:bg-orange-800 transition-all shadow-lg shadow-orange-100 uppercase"
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Publish Product"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {editBox && (
        <div className="fixed inset-0 flex items-center justify-center p-5 z-50 backdrop-blur-sm bg-black/40">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-gray-800">Edit Watch</h2>
              <button
                onClick={handlecloseeditform}
                className="text-white p-3 bg-orange-700 rounded-[4px] hover:scale-110 transition-all duration-300"
              >
                <FaMinus />
              </button>
            </div>
            {error && (
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-bold rounded-r-lg">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="border-2 border-dashed border-gray-200 p-4 rounded-2xl bg-gray-50">
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {/* 1. Show Existing Images from DB */}
                  {existingImages.map((img, index) => (
                    <div key={`old-${index}`} className="relative group h-24">
                      <img
                        src={img.url}
                        className="h-full w-full object-cover rounded-lg border opacity-70"
                        alt="existing"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setExistingImages(
                            existingImages.filter((_, i) => i !== index),
                          )
                        }
                        className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full shadow-md hover:bg-red-800"
                      >
                        <FaTrash size={10} />
                      </button>
                    </div>
                  ))}

                  {/* 2. Show Previews of newly selected files */}
                  {previews.map((url, index) => (
                    <div key={`new-${index}`} className="relative group h-24">
                      <img
                        src={url}
                        className="h-full w-full object-cover rounded-lg border border-orange-400"
                        alt="new preview"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)} // Use your existing removeImage function
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <FaTrash size={10} />
                      </button>
                    </div>
                  ))}

                  {/* 3. Upload Button (Hide if total images >= 4) */}
                  {existingImages.length + selectedFiles.length < 4 && (
                    <label className="h-24 flex flex-col items-center justify-center border-2 border-gray-200 border-dotted rounded-lg cursor-pointer hover:bg-white transition-all">
                      <FaCloudUploadAlt className="text-gray-400 text-xl" />
                      <span className="text-[10px] font-bold text-gray-400">
                        Add Image
                      </span>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Watch Name"
                  value={editform.name}
                  onChange={onEditChange}
                  className="p-3 bg-gray-50 border rounded-xl outline-none focus:border-orange-500"
                  required
                />
                <input
                  type="text"
                  name="brand"
                  placeholder="Watch brand"
                  value={editform.brand}
                  onChange={onEditChange}
                  className="p-3 bg-gray-50 border rounded-xl outline-none focus:border-orange-500"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={editform.description}
                  onChange={onEditChange}
                  className="col-span-2 p-3 bg-gray-50 border rounded-xl h-24"
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={editform.price}
                  onChange={onEditChange}
                  className="p-3 bg-gray-50 border rounded-xl"
                  required
                />
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={editform.stock}
                  onChange={onEditChange}
                  className="p-3 bg-gray-50 border rounded-xl"
                  required
                />
                {categories && (
                  <select
                    name="category"
                    value={editform.category}
                    onChange={onEditChange}
                    className="p-3 bg-gray-50 border rounded-xl"
                  >
                    <option value="">Select Category</option>
                    {categories?.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )}
                <div className="flex flex-col justify-center">
                  <span className="text-xs font-bold text-gray-400 ml-1">
                    Rating
                  </span>
                  <Rating
                    precision={0.5}
                    value={Number(editform.ratings)}
                    onChange={(e, val) =>
                      setEditForm({ ...editform, ratings: val })
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#A14714] text-white py-4 rounded-2xl font-black hover:bg-orange-800 transition-all shadow-lg shadow-orange-100 uppercase"
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Publish Product"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-800">
            Inventory Management
          </h1>
          <p className="text-gray-500">
            Track and manage your watch stock levels
          </p>
        </div>
        <button
          onClick={handleOpenCreateBox}
          className="bg-[#A14714] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg"
        >
          <FaPlus /> Create Product
        </button>
      </div>

      <div className="relative flex flex-row items-center justify-between gap-4 bg-gray-100 rounded border border-gray-500 p-2!">
        <input
          type="text"
          className="w-[90%] pl-4! pt-4! pb-4! pr-6! rounded outline-0"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search products....."
        />
        <select
          className="bg-amber-400 text-white roundedl p-4! w-48! outline-1 outline-amber-400 cursor-pointer"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          {categories?.map((item) => (
            <option value={item?.name}>{item?.name}</option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-widest border-b">
              <th className="px-6 py-5">Product</th>
              <th className="px-6 py-5">Category</th>
              <th className="px-6 py-5">Price</th>
              <th className="px-6 py-5">Stock</th>
              <th className="px-6 py-5">Rating</th>
              <th className="px-6 py-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filterProducts && filterProducts.length > 0 ? (
              filterProducts.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                        {/* Show first image from the array of objects */}
                        <img
                          src={
                            item.images?.[0]?.url ||
                            "https://via.placeholder.com/50"
                          }
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-bold text-gray-700">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-orange-50 text-[#A14714] px-3 py-1 rounded-full text-[10px] font-black uppercase">
                      {item?.category?.name || "Uncategorized"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-black text-gray-800">
                    ${item.price}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`text-sm font-bold ${item.stock < 10 ? "text-red-500" : "text-gray-600"}`}
                      >
                        {item.stock} units
                      </span>
                      <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="bg-[#A14714] h-full"
                          style={{ width: `${Math.min(item.stock, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-orange-500 font-bold">
                      ⭐ {item.ratings}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-4 text-gray-400">
                      <button className="hover:text-blue-500 transition-colors">
                        <FaEye size={16} />
                      </button>
                      <button
                        onClick={() => {
                          handleedit(item?._id);
                        }}
                        className="hover:text-green-500 transition-colors"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(item._id);
                        }}
                        className="hover:text-red-500 transition-colors"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-20 text-gray-400 font-medium"
                >
                  No products found. Start by adding your first watch!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
