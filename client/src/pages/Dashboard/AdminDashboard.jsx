import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '../../redux/features/auth/authApi';
import { logout } from '../../redux/features/auth/authSlice';

const navItems = [
    {
        path: '/dashboard/admin/#stats',
        label: 'Dashboard',
        icon: 'fa-solid fa-chart-line',
        subItems: [
            { path: '/dashboard/admin/#weekly-admin-stats', label: 'Weekly Report', icon: 'fa-solid fa-calendar-week' },
            { path: '/dashboard/admin/#order-stats', label: 'Weekly Orders', icon: 'fa-solid fa-box' },
        ],
    },
    {
        path: '/dashboard/manage-products',
        label: 'Products',
        icon: 'fa-solid fa-boxes',
        subItems: [
            { path: '/dashboard/manage-products', label: 'Manage Product', icon: 'fa-solid fa-tools' },
            { path: '/dashboard/add-product', label: 'Add Product', icon: 'fa-solid fa-plus' },
        ],
    },
    { path: '/dashboard/users', label: 'Users', icon: 'fa-solid fa-users' },
    { path: '/dashboard/manage-orders', label: 'Manage Orders', icon: 'fa-solid fa-file-invoice' },
    { path: '/dashboard/categories', label: 'Categories', icon: 'fa-solid fa-layer-group' },
    { path: '/dashboard/messages', label: 'Messages', icon: 'fa-solid fa-envelope' },
];


function AdminDashboard() {
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(null);

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
            alert('Logged out successfully');
            navigate('/');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    const toggleMenu = (label) => {
        setOpenMenu(openMenu === label ? null : label);
    };

    return (
        <div className="space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between">
            <div>
                <div className="nav__logo">
                    <Link to="/">
                        Fashion House<span>.</span>
                    </Link>
                    <p className="text-xs italic">Admin Dashboard</p>
                </div>
                <hr className="mt-5" />
                <ul className="space-y-5 pt-5">
                {navItems.map((item) => (
                    <li key={item.path} className="relative">
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? 'text-blue-600 font-medium flex items-center shadow-md rounded-lg p-2 border border-gray-200 ' : 'text-black flex items-center'
                            }
                            end
                            to={item.path}
                            onClick={() => toggleMenu(item.label)}
                        >
                            <i className={`${item.icon} mr-2` } style={{ color: '#0F305DFF' }}></i>
                            {item.label}
                        </NavLink>
                        {/* Render Subitems */}
                        {item.subItems && openMenu === item.label && (
                            <ul className="ml-5 mt-2 space-y-3">
                                {item.subItems.map((subItem) => (
                                    <li key={subItem.path}>
                                        <NavLink
                                            className={({ isActive }) =>
                                                isActive ? 'text-blue-500 flex items-center' : 'text-gray-700 flex items-center'
                                            }
                                            to={subItem.path}
                                        >
                                            <i className={`${subItem.icon} mr-2`} style={{ color: '#0F305D77' }}></i>
                                            {subItem.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>

            </div>

            <div className="mb-3">
                <hr className="mb-3" />
                <button
                    onClick={handleLogout}
                    className="text-white bg-primary font-medium px-5 py-1 rounded-sm"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default AdminDashboard;
