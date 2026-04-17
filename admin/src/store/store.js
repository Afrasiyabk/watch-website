import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';
import orderReducer from './slices/orderSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer, // The 'auth' key is what we use in useSelector
    product: productReducer,
    category: categoryReducer,
    order: orderReducer
  },
});