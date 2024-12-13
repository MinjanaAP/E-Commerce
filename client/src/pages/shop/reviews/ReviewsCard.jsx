import React, { useState, useEffect } from 'react';
import commenterIcon from '../../../assets/avatar.png';
import { formatDate } from '../../../utils/formatDate';
import RatingStars from '../../../Components/RatingStars';
import PostAReview from './PostAReview';
import {useVerifyTokenMutation} from '../../../redux/features/auth/authApi';
import axios from 'axios';

const ReviewsCard = ({ productReviews }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [verifyToken] = useVerifyTokenMutation();

    const reviews = productReviews || [];

    useEffect(() => {
        const axiosInstance = axios.create({
            baseURL: 'http://localhost:3000',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const validateToken = async () => {
            const token = sessionStorage.getItem('token').replace(/^"(.*)"$/, '$1');
            // alert(token)
            console.log(token)
            if (token) {
                try {
                    const response = await axiosInstance.post('/api/auth/validateToken', {}, {
                        headers: { Authorization: `Bearer ${token}` },
                    });                    
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Token validation failed:', error);
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false);
            }
        };

        validateToken();
    }, [verifyToken]);

    const handleOpenReviewModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseReviewModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="px-8 mx-10 my-6 bg-white">
            <div>
                {reviews.length > 0 ? (
                    <div>
                        <h3 className="text-lg font-medium">All comments...</h3>
                        <div>
                            {reviews.map((review, index) => (
                                <div key={index} className="mt-4">
                                    <div className="flex items-center gap-4">
                                        <img src={commenterIcon} alt="" className="size-14" />
                                        <div className="space-y-1">
                                            <p className="text-lg font-medium text-blue-400 underline capitalize underline-offset-4">
                                                {review?.userId.username}
                                            </p>
                                            <p className="text-[12px] italic">{formatDate(review?.updatedAt)}</p>
                                            <RatingStars rating={review?.rating} />
                                        </div>
                                    </div>
                                    <div className="p-8 mt-5 text-gray-600 border">
                                        <p className="md:w-4/5">{review?.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No reviews yet!</p>
                )}
            </div>
            {/* Add review button */}
            {isAuthenticated && (
                <div className="mt-12">
                    <button
                        onClick={handleOpenReviewModal}
                        className="px-6 py-3 text-white rounded-md bg-primary"
                    >
                        Add A Review
                    </button>
                </div>
            )}
            {!isAuthenticated && (
                <p className="mt-4 text-red-500">You must be logged in to add a review.</p>
            )}
            {/* Review modal */}
            <PostAReview isModalOpen={isModalOpen} handleClose={handleCloseReviewModal} />
        </div>
    );
};

export default ReviewsCard;
