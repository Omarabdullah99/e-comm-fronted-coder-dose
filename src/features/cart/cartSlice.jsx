import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCart } from "./cartApi";

const initialState={
    status:'idel',
    item:[]
}
export const createCartByAsync=createAsyncThunk(
    'cart/addToCart',
    async(cartItem)=>{
        const response= await createCart(cartItem)
        console.log('response check cartSlice,js', response)
        return response.data

    }
)


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    extraReducers: (builder) => { 
        builder
        .addCase(createCartByAsync.pending, (state)=>{
            state.status= 'loading'
        })
        .addCase(createCartByAsync.fulfilled, (state,action)=>{
            state.status='fulfilled',
            state.item.push(action.payload)
        })

    }
})

export default cartSlice.reducer