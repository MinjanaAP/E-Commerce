import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartModel from '../pages/shop/productDetails/cartModel';
import avatarImg from "../assets/avatar.png";
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setisCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  const adminDropDownMenus = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Items", path: "/dashboard/manage-products" },
    { label: "All Orders", path: "/dashboard/manage-orders" },
    { label: "Add Product", path: "/dashboard/add-product" }
  ];
  
  const userDropDownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" }
  ];

  const dropdownMenus = user?.role === 'admin' ? adminDropDownMenus : userDropDownMenus;

  const handleCartToggle = () => setisCartOpen(!isCartOpen);
  const handleSidebarToggle = () => setIsSidebarOpen(!isSidebarOpen);
  const handleDropDownToggle = () => setIsDropDownOpen(!isDropDownOpen);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="flex items-center justify-between px-4 mx-auto max-w-screen-2xl">
        {/* Hamburger Menu for Mobile */}
        <button
          aria-label="Toggle Sidebar"
          className="absolute z-50 text-2xl md:hidden left-4 top-4"
          onClick={handleSidebarToggle}
        >
          <i className="ri-menu-line"></i>
        </button>

        {/* Desktop Logo */}
        <div className="hidden md:block nav__logo">
          <Link to="/">DressMore</Link>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="items-center justify-between hidden ml-32 md:flex nav__links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/aboutUs">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Icons Section */}
        <div className="relative flex items-center gap-4 nav__icons">
          <span>
            <Link to="/search">
              <i className="ri-search-line"></i>
            </Link>
          </span>

          <span>
            <button
              aria-label="Shopping Bag"
              onClick={handleCartToggle}
              className="hover:text-primary"
            >
              <i className="ri-shopping-bag-line"></i>
              <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center">{products.length}</sup>
            </button>
          </span>

          <span>
            {user ? (
              <>
                <img
                  role="img"
                  onClick={handleDropDownToggle}
                  src={user?.profileImage || avatarImg}
                  alt="Profile"
                  className="rounded-full cursor-pointer size-6"
                />
                {isDropDownOpen && (
                  <div className="absolute right-0 z-50 w-48 p-4 mt-3 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <ul className="p-2 space-y-4 font-medium">
                      {dropdownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setIsDropDownOpen(false)}
                            className="dropdown-items"
                            to={menu.path}
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li><Link onClick={handleLogout} className="dropdown-items">Logout</Link></li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" aria-label="Login">
                <i className="ri-user-line"></i>
              </Link>
            )}
          </span>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed top-0 left-0 z-50 w-2/4 h-full p-4 bg-white shadow-lg">
          <button
            aria-label="Close Sidebar"
            className="mb-4 text-xl"
            onClick={handleSidebarToggle}
          >
            <i className="ri-close-line"></i>
          </button>
          <ul className="flex flex-col items-center justify-center space-y-4">
            <li><Link to="/" onClick={handleSidebarToggle}>Home</Link></li>
            <li><Link to="/shop" onClick={handleSidebarToggle}>Shop</Link></li>
            <li><Link to="/aboutUs" onClick={handleSidebarToggle}>About Us</Link></li>
            <li><Link to="/contact" onClick={handleSidebarToggle}>Contact</Link></li>
          </ul>
        </div>
      )}

      {/* Cart Modal */}
      {isCartOpen && <CartModel products={products} isOpen={isCartOpen} onClose={handleCartToggle} />}
    </header>
  );
};

export default Navbar;
