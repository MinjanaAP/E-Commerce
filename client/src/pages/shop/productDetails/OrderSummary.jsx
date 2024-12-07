import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../../redux/features/cart/cartSlice';
import { loadStripe } from '@stripe/stripe-js';
import { getBaseUrl } from '../../../utils/baseURL';

function OrderSummary() {
    const dispatch = useDispatch();
    const { selectedItems, totalPrice, tax, taxRate, grandTotal, products } = useSelector((store) => store.cart); // Added `products` from the Redux store
    const { user } = useSelector((state) => state.auth); // Added `user` from the Redux store

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    // Payment integration
    const makePayment = async (e) => {
        e.stopPropagation(); // Ensure propagation is stopped for the event

        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
        const body = {
            products, // Use products from Redux store
            userId: user?._id, // Use user ID from Redux store
        };

        const headers = {
            'Content-Type': 'application/json',
        };

        try {
            const response = await fetch(`${getBaseUrl()}/api/orders/create-checkout-session`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body),
            });

            const session = await response.json();

            // Redirect to Stripe checkout page
            if (response.ok) {
                await stripe.redirectToCheckout({ sessionId: session.id });
            } else {
                console.error("Payment initiation failed.");
            }
        } catch (error) {
            console.error("Error during payment:", error);
        }
    };

    return (
        <div className='bg-primary-light mt-5 rounded text-base'>
            <div className='px-6 py-4 space-y-5'>
                <h2 className='text-2xl text-dark'>Order Summary</h2>
                <p className='text-text-dark mt-2'>Selected Items: {selectedItems}</p>
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
                <p>Tax {taxRate * 100}% : ${tax.toFixed(2)}</p>
                <h3 className='font-bold'>Grand Total: ${grandTotal.toFixed(2)}</h3>

                <div className='px-4 mb-6'>
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent default event propagation
                            handleClearCart();
                        }}
                        className='bg-red-500 px-3 py-1.5 
                        text-white mt-2 rounded-md flex justify-between items-center mb-4'>
                        <span className='mr-2'>Clear cart</span>
                        <i className="ri-delete-bin-7-line"></i>
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Pass `e` to `makePayment` function
                            makePayment(e); // Added `e` as a parameter when calling `makePayment`
                        }}
                        className='bg-green-500 px-3 py-1.5 
                        text-white mt-2 rounded-md flex justify-between items-center mb-4'>
                        <span className='mr-2'>Proceed Checkout</span>
                        <i className="ri-bank-card-line"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderSummary;
