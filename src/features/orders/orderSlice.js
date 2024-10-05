import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createOrders } from "./ordersApi"

const initialState={
    status:'idel',
    orders:[]
}

export const createOrderAsync=createAsyncThunk(
    'orders/createorder',
    async(order)=>{
        const response= await createOrders(order)
        return response.data
    }
)

export const ordersSlice= createSlice({
    name:'orders',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(createOrderAsync.pending, (state)=>{
            state.status= 'loading'
        })
        .addCase(createOrderAsync.fulfilled, (state,action)=>{
            state.status= 'fullfiled'
            state.orders.push(action.payload)
        })
    }
})

export default ordersSlice.reducer