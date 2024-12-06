import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
import Home from '../pages/home/Home';
import Login from '../Components/Login';
import Register from '../Components/Register';
import DashboardLayout from '../pages/Dashboard/DashboardLayout';
import PaymentSuccess from '../Components/PaymentSuccess';
import React from 'react'
import PrivateRoute from "./PrivateRoute";
import UserDMain from "../pages/Dashboard/user/dashboard/UserDMain";
import UserOrders from "../pages/Dashboard/user/UserOrders";
import OrderDetails from "../pages/Dashboard/user/OrderDetails";
import UserPayments from "../pages/Dashboard/user/UserPayments";
import UserReviews from "../pages/Dashboard/user/UserReviews";
import UserProfile from "../pages/Dashboard/user/UserProfile";

import AdminDMain from "../pages/Dashboard/Admin/Dashboard/AdminDMain";
import AddProduct from "../pages/Dashboard/Admin/addProduct/AddProduct";
import ManageProduct from "../pages/Dashboard/Admin/manageProduct/ManageProduct";
import UpdateProduct from "../pages/Dashboard/Admin/manageProduct/UpdateProduct";
import ManageUser from "../pages/Dashboard/Admin/users/ManageUser";
import ManageOrders from "../pages/Dashboard/Admin/manageOrders/ManageOrder";
import Contact from "../Components/Contact";
import AboutUs from "../Components/AboutUs";
import TermsAndConditions from "../Components/TermsAndConditions";
import TrackingOrderPage from "../Components/TrackingOrderPage";
import Messages from "../pages/Dashboard/Admin/messages/Messages";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: "/categories/:categoryName", element: <CategoryPage /> },
      { path: "/search", element: <Search /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/contact", element: <Contact /> },
      { path: "/aboutUs", element: <AboutUs /> },
      { path: "/shop/:id", element: <SingleProduct /> },
      { path: "/success", element: <PaymentSuccess /> }, 
      { path: "/termsandconditions", element: <TermsAndConditions /> }, 
      { path: "/trackingorderpage", element: <TrackingOrderPage /> }, 

      {
        path: "orders/:orderId",
        element: <OrderDetails />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout/></PrivateRoute>, // TODO: user private routes here
    children: [
      // user routes
      { path: '', element: <UserDMain /> },
      { path: "orders", element: <UserOrders /> },
      { path: "payments", element: <UserPayments /> },
      { path: "profile", element: <UserProfile /> },
      { path: "reviews", element: <UserReviews /> },

        // admin routes (only accessible by admin) TODO: private routes with role field
        { path: "admin", element: <PrivateRoute role="admin"><AdminDMain/></PrivateRoute> },
        { path: "add-product", element:<PrivateRoute role="admin"><AddProduct/></PrivateRoute>  },
        { path: "manage-products", element: <PrivateRoute role="admin"><div><ManageProduct/></div></PrivateRoute> },
        { path: "update-product/:id", element:<PrivateRoute role="admin"><div><UpdateProduct/></div></PrivateRoute>},
        { path: "users", element:<PrivateRoute role="admin"><ManageUser/></PrivateRoute> },
        { path: "manage-orders", element:<PrivateRoute role="admin"><ManageOrders/></PrivateRoute>},
        { path: "messages", element:<Messages/>}
    ]
  }

]);

export default router;