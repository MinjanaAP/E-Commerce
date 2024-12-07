import React from 'react';
import { useSelector } from 'react-redux';
import { useGetReviewsByUserIdQuery } from '../../../redux/features/reviews/reviewsApi';
import { useNavigate } from 'react-router-dom';

const UserReviews = () => {
    const { user } = useSelector((state) => state.auth); // Get the logged-in user
    const { data: reviewsData, error, isLoading } = useGetReviewsByUserIdQuery(user?._id);
    const navigate = useNavigate();

    // Handle loading state
    if (isLoading) return <div>Loading...</div>;

    // Handle error state
    if (error) {
        console.error('Error fetching reviews:', error);
        return <div>No Reviews Found!</div>;
    }

    // Extract reviews from API response
    const reviews = Array.isArray(reviewsData?.reviews) ? reviewsData.reviews : [];

    const handleCardClick = () => {
        navigate('/shop'); // Adjust the route as needed
    };

    return (
        <div className='py-6'>
            <h2 className='text-2xl font-bold mb-8'>Your Given Reviews</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-6'>
                {reviews.map((review, index) => (
                    <div
                        key={review._id}
                        className='bg-white shadow-md rounded-lg p-4 border border-gray-200 cursor-pointer hover:scale-105 transition-all duration-200'
                    >
                        <p className='text-lg font-semibold mb-2'>
                            <strong>Rating:</strong> {review?.rating}
                        </p>
                        <p className='mb-2'>
                            <strong>Comment:</strong> {review?.comment}
                        </p>
                        <p className='text-sm text-gray-500'>
                            <strong>Product ID:</strong> {review?.productId}
                        </p>
                        <p className='text-sm text-gray-500'>
                            <strong>Product Name:</strong> {review?.productName}
                        </p>
                        <p className='text-sm text-gray-500'>
                            <strong>Date:</strong> {new Date(review?.createdAt).toLocaleString()}
                        </p>
                    </div>
                ))}
                <div
                    onClick={handleCardClick}
                    className='bg-gray-100 text-black flex items-center justify-center rounded-lg p-6 border cursor-pointer hover:bg-primary-color hover:text-white transition-all duration-200'
                >
                    <span className='text-xl font-bold mr-2'>+</span>
                    <p>Add New Review</p>
                </div>
            </div>
        </div>
    );
};

export default UserReviews;
