import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCart, getCartItemByUserId } from "./cartApi";

const initialState={
    status:'idel',
    item:[]
}
export const createCartByAsync=createAsyncThunk(
    'cart/addToCart',
    async(cartItem)=>{
        const response= await createCart(cartItem)
        return response.data

    }
)

export const getCartItemByUserIdAsync=createAsyncThunk(
    'cart/getCartItemByUserId',
    async(userId)=>{
        const response= await getCartItemByUserId(userId)
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
        .addCase(getCartItemByUserIdAsync.pending, (state)=>{
            state.status='loading'
        })
        .addCase(getCartItemByUserIdAsync.fulfilled, (state,action)=>{
            state.status= 'fulfiled',
            state.item = action.payload
        })

    }
})
export const selectedCartItemByUserId=(state)=> state.cart.item
export default cartSlice.reducer