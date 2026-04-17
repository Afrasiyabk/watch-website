import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import productReducer from "./slices/product";
import searchReducer from './slices/searchSlice';
import categoryReducer from './slices/categorySlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
    reducer: {
        user: authReducer, // The 'auth' key is what we use in useSelector
        product: productReducer,
        category: categoryReducer,
        search: searchReducer,
        cart: cartReducer,
        order: orderReducer,
    },
});

