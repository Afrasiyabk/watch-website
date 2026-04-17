import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';


export const fetchOrderData = createAsyncThunk('order/fetchOrderData', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/order/`, { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
}
);


export const orderDelete = createAsyncThunk('order/orderDelete', async (id, thunkAPI) => {
  try {
    const response = await axios.delete(`${VITE_API_URL}/order/delete/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
}
);

export const EditISDelever = createAsyncThunk('order/editIsDelever', async (id, thunkAPI) => {
  try {
    const response = await axios.put(`${VITE_API_URL}/order/isDeliver/${id}`, {} , { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
}
);



export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    loading: false,
    orderData: null,
    error: null,
    success: false,
    allOrders: [],
  },
 
   extraReducers: (builder) => {
        builder
        .addCase(fetchOrderData.pending, (state,action)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(fetchOrderData.fulfilled, (state, action) => {
            state.loading = false,
            state.error = null,
            state.allOrders = action.payload.orders
        })
        .addCase(fetchOrderData.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload
        })
        .addCase(orderDelete.fulfilled, (state,action)=>{
          state.loading = false,
          state.error = null
        })
        .addCase(orderDelete.pending, (state,action)=>{
          state.loading = true,
          state.error = action.payload
        })
        .addCase(EditISDelever.pending, (state,action)=>{
          state.loading = true,
          state.error = null
        })
         .addCase(EditISDelever.fulfilled, (state,action)=>{
          state.loading = false,
          state.error = null
        })
         .addCase(EditISDelever.rejected, (state,action)=>{
          state.loading = false,
          state.error = action.payload
        })

    }

});

export default orderSlice.reducer;

