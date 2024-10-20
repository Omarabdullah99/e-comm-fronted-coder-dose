import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedLoggedInUser } from "../../auth/authSlice";
import { fetchOrdersByUserIdAsync, selectedUserOrders, selectUserStatus } from "../userSlice";
import { discountedPrice } from "../../../app/constants";
import Navbar from "../../navbar/Navbar";
import Footer from "../../common/Footer";
import { Grid, TailSpin } from "react-loader-spinner";


const MyOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectedLoggedInUser);
  const userOrders = useSelector(selectedUserOrders);
  console.log('myorders',userOrders)
  const userStatus=useSelector(selectUserStatus)


  useEffect(() => {
    if (user?.user?.id) {
      dispatch(fetchOrdersByUserIdAsync(user?.user?.id));
    }
  }, [dispatch, user?.user?.id]);


  if (userStatus == 'loading') {
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

    <>
    <Navbar></Navbar>
    <div className="mb-5">
      {userOrders?.map((order) => (
       
            <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                  Order # {order.id}
                </h1>
                <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                  Order Status : {order.status}
                </h3>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order?.items?.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.product.thumbnail}
                            alt={item.product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={item.href}>{item.product.title}</a>
                              </h3>
                              <p className="ml-4">${discountedPrice(item.product)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.product.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty :{item.quantity}
                              </label>
                            </div>

                            <div className="flex"></div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>$ {order.totalAmount}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total Items in Cart</p>
                  <p>{order.totalItems} items</p>
                </div>
                <p className="mt-0.5 mb-4 text-sm text-gray-500">
                  Shipping Address :
                </p>
                <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                  <div className="flex gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order.selectedAddress.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectedAddress.address}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectedAddress.gpo}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone: {order.selectedAddress.number}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      {order.selectedAddress.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>
        
      ))}
    </div>
    <Footer></Footer>
    </>
  );
};

export default MyOrders;
