import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TrackingOrderPage = () => {
    const [orderId, setOrderId] = useState('');
    const navigate = useNavigate();

    const handleTrackOrder = () => {
        if (orderId.trim() === '') {
            alert('Please enter a valid Order ID.');
            return;
        }
        navigate(`/orders/${orderId}`);
    };

    return (
        <section className="section__container bg-primary-light py-12">
            <h2 className="section__header text-3xl font-bold text-center text-gray-800">
                Track Your Order
            </h2>
            <p className="section__subheader text-center text-lg text-gray-600 mt-4 mb-8">
                Enter your Order ID to track the status of your order.
            </p>

            <div className="flex flex-col items-center justify-center">
                <input
                    type="text"
                    placeholder="Enter tracking ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="border border-gray-300 rounded-md w-80 p-3 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                />
                <button
                    onClick={handleTrackOrder}
                    className='btn'
                >
                    Track Order
                </button>
            </div>
        </section>
    );
};

export default TrackingOrderPage;
