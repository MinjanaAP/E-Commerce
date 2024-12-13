import React from 'react';
import { useSelector } from 'react-redux';
import { useGetOrdersByIdQuery } from '../../../redux/features/orders/ordersApi';
import { useParams } from 'react-router-dom';
import { FaClock, FaBoxOpen, FaTruck, FaCheckCircle } from 'react-icons/fa'; // Import appropriate icons

function OrderDetails() {
    const { user } = useSelector((state) => state.auth);
    const { orderId } = useParams();
    const { data: order, error, isLoading } = useGetOrdersByIdQuery(orderId);

    if (isLoading) return <div className="text-center py-6 text-lg text-gray-700">Loading...</div>;
    if (error) return <div className="text-center py-6 text-lg text-red-500">No orders found!</div>;

    const isCompleted = (status) => {
        const statuses = ["pending", "processing", "shipped", "completed"];
        return statuses.indexOf(order.status) >= statuses.indexOf(status);
    };

    const isCurrent = (status) => order.status === status;

    const steps = [
        {
            status: 'pending',
            label: 'Pending',
            description: 'Your order has been created and is awaiting processing.',
            icon: <FaClock />,
            bgColor: 'bg-red-500',
        },
        {
            status: 'processing',
            label: 'Processing',
            description: 'Your order is currently being processed.',
            icon: <FaBoxOpen />,
            bgColor: 'bg-yellow-500',
        },
        {
            status: 'shipped',
            label: 'Shipped',
            description: 'Your order has been shipped.',
            icon: <FaTruck />,
            bgColor: 'bg-blue-500',
        },
        {
            status: 'completed',
            label: 'Completed',
            description: 'Your order has been successfully completed.',
            icon: <FaCheckCircle />,
            bgColor: 'bg-green-500',
        },
    ];

    return (
        <section className="section__container rounded p-8 bg-white shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Order Details
            </h2>
            <div className="mb-6 text-lg text-gray-600">
                <p><strong>Order ID:</strong> {order?.orderId}</p>
                <p><strong>Payment Status:</strong> {order?.status}</p>
            </div>
            <ol className="relative space-y-8 sm:flex sm:items-center sm:space-y-0">
                {steps.map((step, index) => (
                    <TimelineStep
                        key={index}
                        step={step}
                        isCompleted={isCompleted(step.status)}
                        isCurrent={isCurrent(step.status)}
                        isLastStep={index === steps.length - 1}
                    />
                ))}
            </ol>
        </section>
    );
}

function TimelineStep({ step, isCompleted, isCurrent, isLastStep }) {
    return (
        <li className="relative flex-1 sm:flex sm:items-center">
            <div className="flex items-center">
                <div
                    className={`rounded-full h-12 w-12 flex items-center justify-center ${
                        isCompleted ? 'bg-green-500' : isCurrent ? step.bgColor : 'bg-gray-300'
                    } text-white text-xl transition-all duration-300 transform ${
                        isCurrent ? 'scale-110' : ''
                    }`}
                >
                    {step.icon}
                </div>
                {!isLastStep && (
                    <span
                        className={`hidden sm:block flex-1 h-2 ${
                            isCompleted || isCurrent ? 'bg-green-500' : 'bg-gray-300'
                        } transition-colors duration-300`}
                    ></span>
                )}
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                <h4
                    className={`text-lg font-semibold ${
                        isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'
                    } transition-colors duration-300`}
                >
                    {step.label}
                </h4>
                <p className="text-sm text-gray-500">{step.description}</p>
            </div>
        </li>
    );
}

export default OrderDetails;
