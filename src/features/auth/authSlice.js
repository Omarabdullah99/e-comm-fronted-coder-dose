import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { checkUser, createUser, signOut, updateUser } from './authApi';

const initialState={
    status:'idel',
    loggedInUser:null,
    error:null
}

export const createUserAsync= createAsyncThunk(
    'user/createUser',
    async(userData)=>{
        const respose= await createUser(userData)
        return respose.data
    }
)

export const updateUserAsync=createAsyncThunk(
  'user/updateUser',
  async(update)=>{
    const response= await updateUser(update)
    return response.data
  }
)

export const checkUserAsync=createAsyncThunk(
    'user/checkUser',
    async(loginInfo, {rejectWithValue})=>{
        try {
          const response= await checkUser(loginInfo)
        return response.data
          
        } catch (error) {
          // console.log('login error authslice',error)
          return rejectWithValue(error)
          
        }
    }
)

export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (loginInfo) => {
    const response = await signOut(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const userSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(createUserAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(createUserAsync.fulfilled, (state,action)=>{
            state.status='fullfiled'
            state.loggedInUser= action.payload
          })
          .addCase(checkUserAsync.pending, (state)=>{
            state.status='loading'
          })
          .addCase(checkUserAsync.fulfilled, (state, action)=>{
            state.status='fullfiled'
            state.loggedInUser= action.payload
          })
          .addCase(checkUserAsync.rejected, (state,action)=>{
            state.status='reject';
            state.error= action.payload
            // console.log('error action payload', action.payload)

          })
          .addCase(updateUserAsync.pending, (state)=>{
            state.status= 'loading'
          })
          .addCase(updateUserAsync.fulfilled, (state,action)=>{
            state.status='fullfiled',
            state.loggedInUser= action.payload
          })
          .addCase(signOutAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(signOutAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.loggedInUser = null;
          })
    }
  })

  export const selectedLoggedInUser=(state)=> state.auth.loggedInUser
  export const selectError=(state)=> state.auth.error
  export default userSlice.reducer;
  

