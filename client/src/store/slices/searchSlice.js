import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const globalSearch = createAsyncThunk(
  "search/global",
  async (query, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/product-search?q=${query}`);
      return res.data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: { results: [], loading: false, error: null },
  reducers: { resetSearch: (state) => { state.results = []; state.error = null; } },
  extraReducers: (builder) => {
    builder
      .addCase(globalSearch.pending, (state) => { state.loading = true; })
      .addCase(globalSearch.fulfilled, (state, action) => { state.loading = false; state.results = action.payload})
      .addCase(globalSearch.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { resetSearch } = searchSlice.actions;
export default searchSlice.reducer;