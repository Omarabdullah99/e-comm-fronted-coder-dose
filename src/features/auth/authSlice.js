import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { checkUser, createUser, fetchUserById, signOut, updateUser } from './authApi';

const initialState={
    status:'idel',
    loggedInUser:null,
    userByIdDetails:null,
    error:null
}

export const createUserAsync= createAsyncThunk(
    'user/createUser',
    async(userData,{rejectWithValue})=>{
      try {
        const respose= await createUser(userData)
        return respose.data
        
      } catch (error) {
        return rejectWithValue(error)
      }
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

export const fetchUserByIdAsync=createAsyncThunk(
  'user/fetchUserById',
  async(userId)=>{
    const response= await fetchUserById(userId)
    return response.data

  }
)

export const updateUserAsync=createAsyncThunk(
  'user/updateUser',
  async(update)=>{
    const response= await updateUser(update)
    return response.data
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
    reducers:{
      //!register/login korar por refresh korle oita chole jay. ai problem solve korar jonno
      setUser:(state,action)=>{
        state.loggedInUser=action.payload
      },

      //!logout action
      setLogout: (state, action) => {
        localStorage.clear()
        state.loggedInUser = null;
      },
    },
    extraReducers: (builder) => {
        builder
        .addCase(createUserAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(createUserAsync.fulfilled, (state,action)=>{
            state.status='fullfiled'
            localStorage.setItem('ecommerceProfile', JSON.stringify({ ...action.payload }));
            state.loggedInUser= action.payload
          })
          .addCase(createUserAsync.rejected, (state,action)=>{
            state.status='reject'
            state.error=action.payload
          })
          .addCase(checkUserAsync.pending, (state)=>{
            state.status='loading'
          })
          .addCase(checkUserAsync.fulfilled, (state, action)=>{
            state.status='fullfiled'
            localStorage.setItem('ecommerceProfile', JSON.stringify({ ...action.payload }));
            state.loggedInUser= action.payload
          })
          .addCase(checkUserAsync.rejected, (state,action)=>{
            state.status='reject';
            state.error= action.payload
            // console.log('error action payload', action.payload)

          })
          .addCase(fetchUserByIdAsync.pending, (state)=>{
            state.status= 'loading'
          })
          .addCase(fetchUserByIdAsync.fulfilled, (state,action)=>{
            state.status='fullfiled',
            state.userByIdDetails= action.payload
          })
          .addCase(updateUserAsync.pending, (state)=>{
            state.status= 'loading'
          })
          .addCase(updateUserAsync.fulfilled, (state,action)=>{
            state.status='fullfiled',
            state.userByIdDetails= action.payload
            console.log('authslice for updateuser', action.payload)
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
  export const selectedUserDetails=(state)=> state.auth.userByIdDetails
  export const selectError=(state)=> state.auth.error
  export const {setUser,setLogout}= userSlice.actions
  export default userSlice.reducer;
  

