// // src/store/slices/cartSlice.js

import { createSlice } from "@reduxjs/toolkit";


const saveCartToStorage = (cartItems) => {
    localStorage.setItem('cartItems' , JSON.stringify(cartItems))
};

const getCartFromStorage = () => {
  try {
    const data = localStorage.getItem('cartItems');
    return data ? JSON.parse(data) : []
  } catch (error) {
    return []
  }
}


const cartSlice = createSlice({
name:'cart',
initialState:{
    cartItems: getCartFromStorage()
},
reducers:{

  addToCart:(state,action) => {
        const item = action.payload;
        const exist = state.cartItems.find(i=> i._id === item._id);
        
        if (exist) {
            exist.qty += 1;
        } else {
            state.cartItems.push({
                ...item,
             qty:1
            })
        }
        saveCartToStorage(state.cartItems)
    },
increaseQty:(state,action)=>{
  const data = state.cartItems.find(i=> i._id === action.payload);
  if (data) {
    data.qty += 1
  }  
  saveCartToStorage(state.cartItems)
},
decreaseQty:(state,action)=>{
  const data = state.cartItems.find(i=> i._id === action.payload);
  if (data && data.qty > 1) {
    data.qty -= 1
  }  
  saveCartToStorage(state.cartItems)
},
removeFromCart:(state,action)=> {
    state.cartItems = state.cartItems.filter(i=> i._id !== action.payload);
    saveCartToStorage(state.cartItems);
},
clearCart:(state,action) => {
    state.cartItems = [];
    localStorage.removeItem('cartItems')
},
}
})

export const {
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart
} = cartSlice.actions;
export default cartSlice.reducer; 