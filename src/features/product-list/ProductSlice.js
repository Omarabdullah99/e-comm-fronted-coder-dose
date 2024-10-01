import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {fetchAllProducts, fetchBrands, fetchCategories, fetchProductsByFilters} from './ProductApi'

const initialState = {
    products: [],
    categories:[],
    brands:[],
    status: 'idle',
  };

  export const fetchAllProductsAsync = createAsyncThunk(
    'product/fetchAllProducts',
    async () => {
      const response = await fetchAllProducts();
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

  export const fetchProductsByFiltersAsync = createAsyncThunk(
    'product/fetchProductsByFilters',
    async ({filter, sort}) => {
      
      const response = await fetchProductsByFilters(filter,sort);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

  export const fetchAllCategoriesAsync=createAsyncThunk(
    'product/fetchAllCategories',
    async ()=>{
      const response= await fetchCategories()
      return response.data
    }
  
  )

  export const fetchAllBrandsAsync= createAsyncThunk(
    'product/fetchAllBrand',
    async()=>{
      const response= await fetchBrands()
      return response.data

    }
  )


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
        .addCase(fetchProductsByFiltersAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.products = action.payload;
        })
        .addCase(fetchAllCategoriesAsync.pending, (state)=>{
          state.status= 'loading'
        })
        .addCase(fetchAllCategoriesAsync.fulfilled, (state,action)=>{
          state.categories= action.payload
        })
        .addCase(fetchAllBrandsAsync.pending, (state)=>{
          state.status= 'loading'
        })
        .addCase(fetchAllBrandsAsync.fulfilled, (state,action)=>{
          state.brands= action.payload
        })
       
        
    },
  });

   export const selectAllProducts = (state) => state.product.products;
   export const selectAllCategories= (state) => state.product.categories
   export const selectAllBrands= (state)=> state.product.brands
  export default productSlice.reducer