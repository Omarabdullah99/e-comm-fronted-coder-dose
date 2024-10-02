import { configureStore} from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import productReducer from '../features/product-list/ProductSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    auth: authReducer

  },
})