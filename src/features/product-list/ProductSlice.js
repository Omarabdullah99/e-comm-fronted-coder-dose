import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {fetchAllProducts} from './ProductApi'

const initialState = {
    products: [],
    status: 'idle',
  };

  export const fetchAllProductsAsync = createAsyncThunk(
    'product/fetchAllProducts',
    async () => {
      const response = await fetchAllProducts();
      // The value we return becomes the `fulfilled` action payload
      console.log('slice',response)
      return response.data;
    }
  );


  export const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllProductsAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.products = action.payload;
        })
        
    },
  });

   export const selectAllProducts = (state) => state.product.products;
  export default productSlice.reducer