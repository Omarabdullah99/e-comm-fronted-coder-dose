import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import { fetchAllOrdersAsync, selectAllOrders, selectOrderStatus, updateOrderAsync } from '../../orders/orderSlice';
import { discountedPrice } from '../../../app/constants';
import { TailSpin } from 'react-loader-spinner';

function AdminOrders() {

  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
    // console.log('seletctallorders',orders)
  const orderStatus=useSelector(selectOrderStatus)
  const [editableOrderId, setEditableOrderId] = useState(-1);

  const handleEdit = (order) => {
    // console.log('hadnleEdit',order)
    setEditableOrderId(order.id)
  };
  const handleShow = () => {
    console.log('handleShow');
  };

  const handleUpdate = (e, order) => {
    // console.log('handleUpdate', e.target.value)
    const updatedOrder={...order, status: e.target.value }
    // console.log('handleupate',updatedOrder)
    dispatch(updateOrderAsync(updatedOrder))
    setEditableOrderId(-1)
  };



  const chooseColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-purple-200 text-purple-600';
      case 'dispatched':
        return 'bg-yellow-200 text-yellow-600';
      case 'delivered':
        return 'bg-green-200 text-green-600';
      case 'cancelled':
        return 'bg-red-200 text-red-600';
      default:
        return 'bg-purple-200 text-purple-600';
    }
  };

  useEffect(() => {
    dispatch(fetchAllOrdersAsync());
  }, [dispatch]);

  if (orderStatus == 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-5xl">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </div>
    ); // ডেটা ফেচ হওয়ার সময় লোডিং মেসেজ দেখান
  }

  return (
    <div className="overflow-x-auto">
      <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Order#</th>
                  <th className="py-3 px-6 text-left">Items</th>
                  <th className="py-3 px-6 text-center">Total Amount </th>
                  <th className="py-3 px-6 text-center">Shipping Address</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      
                        <span className="font-medium">{order.id}</span> 
                    </td>
                    <td className="py-3 px-6 text-left">
                      {order.items.map((item) => (
                        <div className="flex items-center my-3">
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src={item.product.thumbnail}
                            />
                          </div>
                          <span>
                            {item.product.title} - #{item.quantity} - $
                            {discountedPrice(item.product)}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        ${order.totalAmount}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="">
                        <div>
                          <strong>{order.selectedAddress.name}</strong>,
                        </div>
                        <div>{order.selectedAddress.address},</div>
                        <div>{order.selectedAddress.city}, </div>
                        <div>{order.selectedAddress.gpo}, </div>
                        <div>{order.selectedAddress.number}, </div>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {order.id === editableOrderId ? (
                        <select onChange={(e) => handleUpdate(e, order)}>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-6 mr-4 cursor-pointer transform hover:text-purple-500 hover:scale-120">
                          <EyeIcon
                            className="w-8 h-8"
                            onClick={(e) => handleShow(order)}
                          ></EyeIcon>
                        </div>
                        <div className="w-6 mr-2 cursor-pointer transform hover:text-purple-500 hover:scale-120">
                          <PencilIcon
                            className="w-8 h-8"
                            onClick={(e) => handleEdit(order)}
                          ></PencilIcon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;