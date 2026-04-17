import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const productCreate = createAsyncThunk('product/create' , async(form,thunkAPI) => {

    try {
        const res = await axios.post(`${API_URL}/product/create`, form ,
        {headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }}
        );
        
        return res.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || "Product creation failed");
    }

} )

export const productEdit = createAsyncThunk('product/edit' , async({id, form},thunkAPI) => {

    try {
        const res = await axios.put(`${API_URL}/product/edit/${id}`, form ,
        {headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }}
        );

        return res.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || "Product update failed");
        }
        }
    )

export const productDelete = createAsyncThunk('product/delete', async(id,thunkAPI) => {

    try {
        const res = await axios.delete(`${API_URL}/product/delete/${id}` , {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
        });

        return res.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || "Product deletion failed");  
    }
}
)

export const productFetchAll = createAsyncThunk('product/All', async(_,thunkAPI) => {

    try {
        const res = await axios.get(`${API_URL}/product/all` , {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
        });

        return res.data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || "Failed to fetch products");  
    }
}
)


export const productFetchById = createAsyncThunk('product/single', async(id,thunkAPI)=> {
    try {
        const res = await axios.get(`${API_URL}/product/${id}`)

        return res.data;

    } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data.message || "Failed to fetch products");  
    }
})


const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        error: null,
        success: false,
        product: null,
        productId:null,
        createBox: false,
        editBox: false,
        products:[]
    },
    reducers: {
        resetProductState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.product = null;
            state.createBox = false;
            state.editBox = false;
            state.productId = null
        },
        setCreateBox: (state, action) => {
            state.createBox = action.payload; 
        },
        setEditBox: (state, action) => {
            state.editBox = action.payload; 
        },
        setProductId: (state, action) => {
            state.productId = action.payload; 
        },
    },
        extraReducers: (builder) => {
            builder
            .addCase(productCreate.pending, (state)=>{
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(productCreate.fulfilled, (state, action)=>{
                state.loading = false;
                state.success = true;
                state.product = action.payload.product;
            })
            .addCase(productCreate.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload || "Product creation failed";
                state.success = false;
            })
        .addCase(productEdit.pending, (state)=>{
            state.loading = true;
            state.error = null;
            state.success = false;
        })
        .addCase(productEdit.fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.product = action.payload.product;
        })
        .addCase(productEdit.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload || "Product update failed";
            state.success = false;
        })
        .addCase(productDelete.pending, (state)=>{
            state.loading = true;
            state.error = null;
            state.success = false;
        })
        .addCase(productDelete.fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.product = null;
        })
        .addCase(productDelete.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload || "Product deletion failed";
            state.success = false;
        })
        .addCase(productFetchAll.pending, (state)=>{
            state.loading = true;
            state.error = null;
            state.success = false;
        })
        .addCase(productFetchAll.fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.products = action.payload.products || [];
        })
        .addCase(productFetchAll.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload || "Failed to fetch products";
            state.success = false;
        })
        .addCase(productFetchById.pending , (state,action)=> {
            state.error = null,
            state.loading = true,
            state.success = false
        })
        .addCase(productFetchById.fulfilled,  (state,action)=>{
            state.loading = false,
            state.error = null,
            state.success = true,
            state.product = action.payload.product || null
        })
        .addCase(productFetchById.rejected, (state,action)=>{
            state.loading = false,
            state.error = action.payload,
            state.success = false
        })
    }
});


export const { resetProductState, setCreateBox,setEditBox, setProductId } = productSlice.actions;
export default productSlice.reducer;