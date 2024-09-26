import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import {increment, decrement} from './features/counter/counterSlice'
import ProductList from './features/product-list/ProductList'
import Home from './page/Home'



function App() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <>
    <Home ></Home>
 
    </>
  )
}

export default App
