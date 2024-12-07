import React, { useState, useEffect } from 'react';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi'; // Assuming the same API hook is used
import ProductCards from '../shop/ProductCards';

const TrendingProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(8);

    // Fetch all products using the backend API
    const { data: { products = [] } = {}, error, isLoading } = useFetchAllProductsQuery({});

    const loadMoreProduct = () => {
        setVisibleProducts((prevCount) => prevCount + 4);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading products...</div>;

    return (
        <section className="section__container">
            <h2 className="section__header">Trending Products</h2>
            <p className="section__subheader mb-12">
                Discover the Hottest picks: Elevate Your Style with Our Curated Collection of Trending Women{"'"}s Fashion Products.
            </p>
            <div className="mt-12">
                <ProductCards products={products.slice(0, visibleProducts)} />
            </div>
            <div className="product__btn">
                {visibleProducts < products.length && (
                    <button className="btn" onClick={loadMoreProduct}>
                        Load More
                    </button>
                )}
            </div>
        </section>
    );
};

export default TrendingProducts;
