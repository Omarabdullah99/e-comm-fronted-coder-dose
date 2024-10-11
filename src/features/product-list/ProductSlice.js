import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {createProduct,  fetchBrands, fetchCategories,  fetchProductById,  fetchProductsByFilters, updateProduct} from './ProductApi'

const initialState = {
    products: [],
    totalItems:0,
    categories:[],
    brands:[],
    status: 'idle',
    selectedProduct:null
  };

  // export const fetchAllProductsAsync = createAsyncThunk(
  //   'product/fetchAllProducts',
  //   async () => {
  //     const response = await fetchAllProducts();
  //     // The value we return becomes the `fulfilled` action payload
  //     return response.data;
  //   }
  // );

  export const createProductAsync=createAsyncThunk(
    'product/createproduct',
    async(product)=>{
      const response= await createProduct(product)
      return response.data
    }
  )

  export const updateProductAsync=createAsyncThunk(
    'product/updateProduct',
    async(update)=>{
      const response= await updateProduct(update)
      return response.data

    }
  )


  export const fetchProductByIdAsync=createAsyncThunk(
    'product/fetchProductById',
    async(id)=>{
      const response= await fetchProductById(id)
      return response.data

    }
  )
 

  export const fetchProductsByFiltersAsync = createAsyncThunk(
    'product/fetchProductsByFilters',
    async ({filter, sort,pagination}) => {
      
      const response = await fetchProductsByFilters(filter,sort,pagination);
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
        // .addCase(fetchAllProductsAsync.pending, (state) => {
        //   state.status = 'loading';
        // })
        // .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        //   state.status = 'idle';
        //   state.products = action.payload;
        // })
        .addCase(fetchProductsByFiltersAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.products = action.payload.products;
          state.totalItems = action.payload.totalItems;
          console.log('slice check',action.payload.totalItems)
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
        .addCase(fetchProductByIdAsync.pending, (state)=>{
          state.status='loading'
        })
        .addCase(fetchProductByIdAsync.fulfilled, (state, action)=>{
          state.selectedProduct= action.payload
        })
       .addCase(createProductAsync.pending, (state)=>{
            state.status= 'loading'
        })
        .addCase(createProductAsync.fulfilled, (state,action)=>{
            state.status='fulfilled',
            state.products.push(action.payload)
        })
        .addCase(updateProductAsync.pending, (state)=>{
          state.status= 'loading'
      })
      .addCase(updateProductAsync.fulfilled, (state,action)=>{
          state.status= 'fulfilled';
          const index= state.products.findIndex(product => product.id === action.payload.id)
          // console.log('finde index slice.jsx', index)
          // console.log('action slice.jsx', action.payload)
          state.products[index]= action.payload
      })
        
    },
  });

   export const selectAllProducts = (state) => state.product.products;
   export const selectTotalItems  = (state) => state.product.totalItems;
   export const selectProductStatus=(state)=> state.product.status
   export const selectAllCategories= (state) => state.product.categories
   export const selectAllBrands= (state)=> state.product.brands
   export const selectedProduct=(state)=> state.product.selectedProduct
  export default productSlice.reducer