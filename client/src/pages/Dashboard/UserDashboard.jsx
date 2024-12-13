import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '../../redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/auth/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTachometerAlt,
    faShoppingCart,
    faCreditCard,
    faUser,
    faStar,
    faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: faTachometerAlt },
    { path: '/dashboard/orders', label: 'Order', icon: faShoppingCart },
    { path: '/dashboard/payments', label: 'Payments', icon: faCreditCard },
    { path: '/dashboard/profile', label: 'Profile', icon: faUser },
    { path: '/dashboard/reviews', label: 'Reviews', icon: faStar },
];

const UserDashboard = () => {
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            alert('Logged out successfully');
            dispatch(logout());
            navigate('/');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    return (
        <div className="space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between border-r border-gray-300">
            {/* Logo Section */}
            <div>
                <div className="nav__logo text-center">
                    <Link to="/" className="text-2xl font-bold text-gray-800">
                        Dress<span className="text-red-500">More</span>
                    </Link>
                    <p className="text-xs italic mt-1 text-gray-500">User Dashboard</p>
                </div>
                <hr className="mt-5" />
                {/* Navigation Items */}
                <ul className="space-y-5 pt-5">
                    {navItems.map((item) => (
                        <li key={item.path} className="flex items-center gap-3">
                            <FontAwesomeIcon icon={item.icon} className="text-gray-600 text-lg" />
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-blue-600 font-semibold'
                                        : 'text-gray-800 hover:text-blue-600'
                                }
                                end
                                to={item.path}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Logout Button */}
            <div className="mb-3">
                <hr className="mb-3" />
                <button
                    onClick={handleLogout}
                    className="w-full text-white bg-red-500 hover:bg-red-600 font-medium px-5 py-2 rounded-lg flex items-center justify-center gap-2"
                >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserDashboard;
