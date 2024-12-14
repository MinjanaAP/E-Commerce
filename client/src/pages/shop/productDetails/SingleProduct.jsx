import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import RatingStars from '../../../Components/RatingStars';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import ReviewsCard  from '../reviews/ReviewsCard';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductCards from '../ProductCards';
import { useFetchRelatedProductsQuery } from '../../../redux/features/products/productsApi';


const SingleProduct = () => {
    const { id } = useParams();
    const [visibleProducts, setVisibleProducts] = useState(8);
   
    const dispatch = useDispatch();
    const {data, error, isLoading} = useFetchProductByIdQuery(id);
    const {data:products,relatedProductError,relatedProductIsLoading} = useFetchRelatedProductsQuery(id);
    console.log("products"+products)
    
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

    //? Scroll to the top
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [id]);

      // Placeholder Component
    const ProductPlaceholder = () => (
        <section className="mt-8 section__container">
        <div className="flex flex-col items-start justify-center gap-8 md:flex-row">
            <div className="w-full md:w-1/3">
            <Skeleton height={300} />
            </div>
            <div className="w-full pt-6 mt-6 md:w-1/2">
            <Skeleton width="70%" height={30} className="mb-4" />
            <Skeleton width="40%" height={25} className="mb-4" />
            <Skeleton count={4} height={20} className="mb-2" />
            <Skeleton width="30%" height={40} className="mt-6" />
            </div>
        </div>
        </section>
    );

    if (isLoading) {
        return (
        <div>
            <section className="section__container bg-primary-light">
            <Skeleton height={40} width="50%" />
            </section>
            <ProductPlaceholder />
        </div>
        );
    }
    if(error) return <p>Errorloading product details.</p>
    return (
        <>
           {products &&
            (
                <div>
                     <section className='section__container bg-primary-light'>
                <h2 className='capitalize section__header'>Shop Page</h2>
                <div className='space-x-2 section__subheader'>
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

            <section className='mt-8 section__container'>
                <div className='flex flex-col items-start justify-center gap-8 md:flex-row'>
                    {/* product image */}
                    <div className='w-full md:w-1/3'>
                        {/* <img src={singleProduct?.image}
                            alt=""
                            className='w-full h-auto rounded-md' /> */}
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

                    <div className='w-full pt-6 mt-6 md:w-1/2'>
                        <h3 className='mb-4 text-4xl font-light font-custom text-text-light'>{singleProduct?.name}</h3>
                        <p className='mb-4 text-xl text-primary'>${singleProduct?.price}{singleProduct?.oldPrice && <s className='ml-1'>${singleProduct?.oldPrice}</s>}</p>
                        <p className='mb-4 text-gray-400'>{singleProduct?.description}</p>

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
                            className='px-6 py-3 mt-6 text-white rounded-md bg-primary'>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* display reviews */}
            <section className='mt-8 section__container__review '>
                <ReviewsCard productReviews={productReviews}/>
            </section>
            {/* <RelatedProducts/> */}
            <div className='mt-8 section__container__review '>
                <h2 className="mb-8 text-4xl tracking-tight text-gray-900 font-custom">Related Products</h2>
                <ProductCards products={products.slice(0, visibleProducts)} />
            </div>
                </div>
            )
           }
        </>
    )
}

export default SingleProduct
