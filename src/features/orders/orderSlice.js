import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createOrders, fetchAllOrders } from "./ordersApi"

const initialState={
    status:'idel',
    orders:[],
    currentOrder:null
}

export const createOrderAsync=createAsyncThunk(
    'orders/createorder',
    async(order)=>{
        const response= await createOrders(order)
        return response.data
    }
)

export const fetchAllOrdersAsync=createAsyncThunk(
    'order/fetchAllOrders',
    async()=>{
        const response= await fetchAllOrders()
        return response.data
    }
)

export const ordersSlice= createSlice({
    name:'orders',
    initialState,
    reducers: {
        resetOrder: (state) => {
          state.currentOrder = null;
        },
      },
    extraReducers: (builder) => {
        builder
        .addCase(createOrderAsync.pending, (state)=>{
            state.status= 'loading'
        })
        .addCase(createOrderAsync.fulfilled, (state,action)=>{
            state.status= 'fullfiled'
            state.orders.push(action.payload)
            state.currentOrder= action.payload
        })
        .addCase(fetchAllOrdersAsync.pending,(state)=>{
            state.status='pending'
        })
        .addCase(fetchAllOrdersAsync.fulfilled,(state,action)=>{
            state.status= 'fullfiled'
            state.orders= action.payload
        })
        
    }
})

export const { resetOrder } = ordersSlice.actions;
export const selectCurrentOrder=(state)=>state.orders.currentOrder
export const selectAllOrders=(state)=> state.orders.orders
export default ordersSlice.reducer