import { configureStore} from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import productReducer from '../features/product-list/ProductSlice'
import authReducer from '../features/auth/authSlice'
import cartReducer from '../features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    auth: authReducer,
    cart:cartReducer

  },
})