import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createOrders, fetchAllOrders, updateOrder } from "./ordersApi"

const initialState={
    status:'idel',
    orders:[],
    totalItems:0,
    currentOrder:null
}

export const createOrderAsync=createAsyncThunk(
    'orders/createorder',
    async(order)=>{
        const response= await createOrders(order)
        return response.data
    }
)

export const updateOrderAsync=createAsyncThunk(
    'order/updateOrder',
    async(order)=>{
        const response= await updateOrder(order)
        return response.data
    }
)

export const fetchAllOrdersAsync=createAsyncThunk(
    'order/fetchAllOrders',
    async(pagination)=>{
        const response= await fetchAllOrders(pagination)
        return response.data
    },
    
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
            state.status='loading'
        })
        .addCase(fetchAllOrdersAsync.fulfilled,(state,action)=>{
            state.status= 'fullfiled'
            state.orders= action.payload.orders
            state.totalItems= action.payload.totalItems
        })
        .addCase(updateOrderAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(updateOrderAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            const index =  state.orders.findIndex(order=>order.id===action.payload.id)
            state.orders[index] = action.payload;
          })
        
    }
})

export const { resetOrder } = ordersSlice.actions;
export const selectCurrentOrder=(state)=>state.orders.currentOrder
export const selectOrderStatus=(state)=>state.orders.status
export const selectAllOrders=(state)=> state.orders.orders
export const selectTotalItemOrder=(state)=> state.orders.totalItems
export default ordersSlice.reducer