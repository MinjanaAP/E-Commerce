import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children, role }) => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();
    const [isValid, setIsValid] = useState(null); 

    useEffect(() => {
        const axiosInstance = axios.create({
            baseURL: 'http://localhost:3000',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        const validateToken = async () => {
            const token = sessionStorage.getItem('token').replace(/^"(.*)"$/, '$1');
            
            console.log("Token that get from session storage for send to validate" + token);
            if (!token) {
                setIsValid(false); 
                return;
            }
        
            try {
                const response = await axiosInstance.post('/api/auth/validateToken', {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('Token validation response:', response.data);
                setIsValid(true);
            } catch (error) {
                console.error('Token validation failed:', error);
                setIsValid(false);
            }
        };
        

        validateToken();
    }, []);

    if (isValid === null) {
        return <div>Loading...</div>;
    }

    if (!isValid) {
        alert('You must be logged in!');
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role && user?.role !== role) {
        alert('You are not authorized to access this page!');
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
