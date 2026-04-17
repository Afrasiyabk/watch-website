import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// We can use VITE_API_URL from .env for better maintainability
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/admin/admin-login`, credentials);
      
      // Save all info to localStorage so it persists on page refresh
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminName', response.data.user.name);
      localStorage.setItem('adminEmail', response.data.user.email);
      
      return response.data; // This includes { token, user: { name, email } }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || "Login Failed");
    }
  }
);

export const DashboardData = createAsyncThunk(
  'auth/DashboardData',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/admin/dashboard`,
        {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || "Login Failed");
    }
  }
);

export const DashChartData = createAsyncThunk(
  'auth/DashChartData',
  async (filter, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/admin/chartData?filter=${filter}`,
        {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || "Login Failed");
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    // Pull from localStorage so data stays even if we refresh the page
    name: localStorage.getItem('adminName') || null,
    email: localStorage.getItem('adminEmail') || null,
    token: localStorage.getItem('adminToken') || null,
    loading: false,
    error: null,
    usersCount: 0,
    ordersCount: 0,
    productsCount: 0,
    activeOrdersCount: 0,
    totalRevenue: 0,
    recentOrders: [],
    activeOrders: [],
    ChartData: [],
    AllUsers: [],
  },
  reducers: {
    logout: (state) => {
      state.name = null;
      state.email = null;
      state.token = null;
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminName');
        localStorage.removeItem('adminEmail');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        // Update state with data from the API response
        state.token = action.payload.token;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(DashboardData.pending, (state) => {
        state.loading = true;
      })
       .addCase(DashboardData.fulfilled, (state,action) => {
        state.loading = false;
        state.AllUsers = action.payload.users;
       state.usersCount = action.payload.stats.usersCount;
        state.ordersCount = action.payload.stats.ordersCount;
        state.productsCount = action.payload.stats.productsCount;
        state.activeOrdersCount = action.payload.stats.activeOrdersCount;
        state.totalRevenue = action.payload.stats.totalRevenue;

        state.recentOrders = action.payload.recentOrders;
        state.activeOrders = action.payload.activeOrders;
      })
      .addCase(DashChartData.fulfilled , (state,action)=>{
        state.ChartData = action.payload.ordersChart;
      })
      .addCase(DashboardData.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;