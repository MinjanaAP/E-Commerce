import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import RatingStars from '../../../Components/RatingStars';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import ReviewsCard from '../reviews/ReviewsCard';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductCards from '../ProductCards';
import { useFetchRelatedProductsQuery } from '../../../redux/features/products/productsApi';

const SingleProduct = () => {
    const { id } = useParams();
    const [visibleProducts, setVisibleProducts] = useState(8);
    const [successMessage, setSuccessMessage] = useState('');
    const dispatch = useDispatch();
    const { data, error, isLoading } = useFetchProductByIdQuery(id);
    const { data: products } = useFetchRelatedProductsQuery(id);

    const singleProduct = data?.product || {};
    const productReviews = data?.reviews || [];
    const images = [
        `${singleProduct.image}`,
        `${singleProduct.image1}`,
        `${singleProduct.image2}`,
        `${singleProduct.image3}`,
    ];

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        setSuccessMessage('Product successfully added to cart!');
        setTimeout(() => {
            setSuccessMessage(''); // Clear message after 3 seconds
        }, 3000);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading product details.</p>;

    return (
        <div>
            <div className='section__subheader space-x-2 pl-8'>
                <span className='hover:text-primary'>
                    <Link to="/">home</Link>
                </span>
                <i className="ri-arrow-right-s-line"></i>
                <span className='hover:text-primary'>
                    <Link to="/shop">shop</Link>
                </span>
                <i className="ri-arrow-right-s-line"></i>
                <span className='hover:text-primary'>{singleProduct.name}</span>
            </div>

            <section className='section__container mt-8'>
                <div className='flex flex-col items-start md:flex-row gap-8 justify-center'>
                    {/* Product Images */}
                    <div className='md:w-1/3 w-full'>
                        <Carousel useKeyboardArrows={true}>
                            {images.map((URL, index) => (
                                <div className="slide" key={index}>
                                    <img alt="product" src={URL} />
                                </div>
                            ))}
                        </Carousel>
                    </div>

                    {/* Product Details */}
                    <div className='md:w-1/2 w-full mt-6 pt-6'>
                        <h3 className='text-4xl mb-4 font-custom font-light text-text-light'>{singleProduct?.name}</h3>
                        <p className='text-xl text-primary mb-4'>${singleProduct?.price}{singleProduct?.oldPrice && <s className='ml-1'>${singleProduct?.oldPrice}</s>}</p>
                        <p className='text-gray-400 mb-4'>{singleProduct?.description}</p>

                        {/* Additional Product Info */}
                        <div className='flex flex-col space-y-2'>
                            <p><strong>Category: </strong> {singleProduct?.category}</p>
                            <p><strong>Color: </strong> {singleProduct?.color}</p>
                            <div className='flex gap-1 item-center'>
                                <strong>Rating: </strong>
                                <RatingStars rating={singleProduct?.rating} />
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToCart(singleProduct);
                                }}
                                className='mt-6 px-6 py-3 text-white rounded-md bg-red-800 hover:bg-gray-950'>
                                Add to Cart
                            </button>
                            {successMessage && (
                                <p className='mt-3 text-green-600 text-sm'>{successMessage}</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Display Reviews */}
            <section className='section__container__review mt-8 '>
                <ReviewsCard productReviews={productReviews} />
            </section>

            {/* Related Products */}
            <div className='section__container__review mt-8 '>
                <h2 className="text-4xl font-custom tracking-tight text-gray-900 mb-8">Related Products</h2>
                <ProductCards products={products.slice(0, visibleProducts)} />
            </div>
        </div>
    );
};

export default SingleProduct;