import React from 'react'

import Navbar from '../features/navbar/Navbar'
import AdminOrders from '../features/admin/component/AdminOrders'
import Footer from '../features/common/Footer'

const AdminOrdersPage = () => {
  return (
   <div>
    <Navbar>
        <AdminOrders></AdminOrders>
    </Navbar>
    <Footer></Footer>
   </div>
  )
}

export default AdminOrdersPage