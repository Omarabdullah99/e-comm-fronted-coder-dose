import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import Home from "./page/Home";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from "./page/CartPage";
import Checkout from "./page/CheckoutPage";
import ProductDetailsPage from "./page/ProductDetailsPage";
import { Protected } from "./features/auth/component/Protected";
import PageNotFound from "./page/404";
import OrderSuccessPage from "./page/OrderSuccessPage";
import MyOrders from "./features/user/component/MyOrders";
import MyProfilePage from "./page/MyProfilePage";
import Logout from "./features/auth/component/LogOut";
import ForgotPassword from "./features/auth/component/ForgotPassword";
import AdminHome from "./page/AdminHome";
import { ProtectedAdmin } from "./features/auth/component/ProtectedAdmin";
import AdminProductForm from "./features/admin/component/AdminProductForm";
import AdminOrdersPage from "./page/AdminOrdersPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // CSS ইমপোর্ট করুন
import { setUser } from "./features/auth/authSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "/productdetails/:id",
    element: <ProductDetailsPage></ProductDetailsPage>,
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage></OrderSuccessPage>,
  },

  //user path link start
  {
    path: "/my-orders",
    element: <MyOrders></MyOrders>,
  },
  {
    path: "/my-profile",
    element: <MyProfilePage></MyProfilePage>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword></ForgotPassword>,
  },
  //user path link end

  //admin path link start
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductForm></AdminProductForm>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductForm></AdminProductForm>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    ),
  },

  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  const dispatch = useDispatch();

  //!register/login korar por refresh korle oita chole jay. ai problem solve korar jonno
  const user = JSON.parse(localStorage.getItem("ecommerceProfile"));
  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);

  console.log("app", user);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
