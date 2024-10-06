import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCart, deleteCart, getCartItemByUserId, resetCart, updateCartItem } from "./cartApi";

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

export const updateCartItemAsync=createAsyncThunk(
    'cart/updatecartItem',
    async(update)=>{
        const response= await updateCartItem(update)
        return response.data

    }
)
export const deleteCartItemAsync=createAsyncThunk(
    'cart/deleteCartItem',
    async(itemid)=>{
        const response= await deleteCart(itemid)
        return response.data

    }
)

export const resetCartAsync=createAsyncThunk(
    'cart/resetCart',
    async(userId)=>{
        const response= await resetCart(userId)
        console.log('response cartSlice')
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
            // console.log('getcartiembyuserid', action.payload)
        })
        .addCase(updateCartItemAsync.pending, (state)=>{
            state.status= 'loading'
        })
        .addCase(updateCartItemAsync.fulfilled, (state,action)=>{
            state.status= 'fulfilled';
            const index= state.item.findIndex(item => item.id === action.payload.id)
            // console.log('finde index slice.jsx', index)
            // console.log('action slice.jsx', action.payload)
            state.item[index]= action.payload
        })
        .addCase(deleteCartItemAsync.pending,(state)=>{
            state.status='pending'
        })
        .addCase(deleteCartItemAsync.fulfilled, (state,action)=>{
            state.status='fulfilled';
            const index= state.item.findIndex(item => item.id === action.payload.id)
            state.item.splice(index,1)
        })

        .addCase(resetCartAsync.pending, (state)=>{
            state.status='loading'
        })
        .addCase(resetCartAsync.fulfilled, (state,action)=>{
            state.status= 'fulfiled',
            state.item = []
            
        })

    }
})
export const selectedCartItemByUserId=(state)=> state.cart.item
export default cartSlice.reducer