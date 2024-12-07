import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi'; // Assuming the same API hook is used
import ProductCards from '../shop/ProductCards';

const CategoryPage = () => {
    const { categoryName } = useParams();
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Fetch all products using the backend API
    const { data: { products = [] } = {}, error, isLoading } = useFetchAllProductsQuery({
        category: categoryName.toLowerCase(),
    });

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading products...</div>;

    return (
        <>
            <section className="section__container bg-primary-light">
                <h2 className="section__header capitalize">{categoryName}</h2>
                <p className="section__subheader">
                    Browse a diverse range of categories, from chic dresses to versatile accessories. Elevate your style today!
                </p>
            </section>

            {/* Products card */}
            <div className="section__container">
                <ProductCards products={filteredProducts} />
            </div>
        </>
    );
};

export default CategoryPage;
