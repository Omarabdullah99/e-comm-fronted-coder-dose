import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrdersAsync, selectAllOrders } from '../../orders/orderSlice'

const AdminOrders = () => {
    const allOrders=useSelector(selectAllOrders)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(fetchAllOrdersAsync())
    },[dispatch])

    console.log('allorders',allOrders)
  return (
    <div>
        <h1>hello</h1>
    </div>
  )
}

export default AdminOrders