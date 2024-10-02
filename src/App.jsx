import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import Home from './page/Home'
import LoginPage from './page/LoginPage'
import SignupPage from './page/SignupPage'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';
import CartPage from './page/CartPage'
import Checkout from './page/CheckoutPage'
import ProductDetailsPage from './page/ProductDetailsPage'
import { Protected } from './features/auth/component/Protected'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
  {
    path: '/signup',
    element: <SignupPage></SignupPage>,
  },
  {
    path: '/cart',
    element: <Protected><CartPage></CartPage></Protected>,
  },
  {
    path: '/checkout',
    element: <Checkout></Checkout>,
  },
  {
    path: '/productdetails',
    element: <ProductDetailsPage></ProductDetailsPage>,
  },
]);


function App() {

  return (
    <>
   
   <RouterProvider router={router}></RouterProvider>
 
    </>
  )
}

export default App
