import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import RatingStars from '../../../Components/RatingStars';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import ReviewsCard  from '../reviews/ReviewsCard';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


const SingleProduct = () => {
    const { id } = useParams();
   
    const dispatch = useDispatch();
    const {data, error, isLoading} = useFetchProductByIdQuery(id);
    
    const singleProduct = data?.product || {};
    const productReviews = data?.reviews || [];

    const images = [
        `${singleProduct.image}`,
        `${singleProduct.image1}`,
        `${singleProduct.image2}`,
        `${singleProduct.image3}`,
    ]

    const handleAddToCart = (product)=>{
        dispatch(addToCart(product))
    }

    if(isLoading) return <p>Loading...</p>
    if(error) return <p>Errorloading product details.</p>
    return (
        <>
            <section className='section__container bg-white'>
                <h2 className='section__header capitalize'>Product Page</h2>
                <div className='section__subheader space-x-2'>
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
            </section>

            <section className='section__container mt-8'>
                <div className='flex flex-col items-start md:flex-row gap-8 justify-center'>
                    {/* product image */}
                    <div className='md:w-1/3 w-full'>
                        {/* <img src={singleProduct?.image}
                            alt=""
                            className='rounded-md w-full h-auto' /> */}
                            <div className="box">
                                <Carousel useKeyboardArrows={true}>
                                    {images.map((URL, index) => (
                                    <div className="slide">
                                        <img alt="sample_file" src={URL} key={index} />
                                    </div>
                                    ))}
                                </Carousel>
                            </div>
                    </div>

                    <div className='md:w-1/2 w-full mt-6 pt-6'>
                        <h3 className='text-4xl mb-4 font-custom font-light text-text-light'>{singleProduct?.name}</h3>
                        <p className='text-xl text-primary mb-4'>${singleProduct?.price}{singleProduct?.oldPrice && <s className='ml-1'>${singleProduct?.oldPrice}</s>}</p>
                        <p className='text-gray-400 mb-4'>{singleProduct?.description}</p>

                        {/*additional product info*/}
                        <div className='flex flex-col space-y-2'>
                            <p><strong>Category: </strong> {singleProduct?.category}</p>
                            <p><strong>Color: </strong> {singleProduct?.color}</p>
                            <div className='flex gap-1 item-center'>
                                <strong>Rating: </strong>
                                <RatingStars rating={singleProduct?.rating}/>
                            </div>
                            <button
                            onClick={(e)=>{
                                e.stopPropagation();
                                handleAddToCart(singleProduct)
                            }}
                            className='mt-6 px-6 py-3 text-white rounded-md bg-gray-800 hover:bg-gray-950'>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* display reviews */}
            <section className='section__container mt-8'>
                <ReviewsCard productReviews={productReviews}/>
            </section>
        </>
    )
}

export default SingleProduct
