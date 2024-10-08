import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchOrdersByUserId } from "./userApi"

const initialState={
    status:'idel',
    userOrders:[],
}

export const fetchOrdersByUserIdAsync=createAsyncThunk(
    'user/userOrders',
    async(userId)=>{
        // console.log('slice user id',userId)
        const response= await fetchOrdersByUserId(userId)
        // console.log('slice response',response)
        return response.data
    }
)


export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(fetchOrdersByUserIdAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchOrdersByUserIdAsync.fulfilled, (state,action)=>{
            state.status='fullfiled'
            state.userOrders= action.payload
            // console.log('user slice',action.payload)
          })
          
    }
  })

  export const selectedUserOrders=(state)=> state.user.userOrders
  export const selectUserStatus=(state)=> state.user.status
  export default userSlice.reducer;