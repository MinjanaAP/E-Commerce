import React, { useEffect, useState } from 'react';
import ProductCards from './productDetails/ProductCards';
import ShopFiltering from './ShopFiltering';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';
import { useGetAllCategoriesQuery } from '../../redux/features/category/categoryApi';

const ShopPage = () => {
    const [filtersState, setFiltersState] = useState({
        category: 'all',
        color: 'all',
        priceRange: ''
    });

    //! get all categories
    const { data: categories, error: categoryError, isLoading: categoriesIsLoading } = useGetAllCategoriesQuery();

    const filters = {
        categories: ['all', ...categories?.map(category => category.name) || []],
        colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'beige', 'green'],
        priceRanges: [
            { label: 'Under $50', min: 0, max: 50 },
            { label: '$50 - $100', min: 50, max: 100 },
            { label: '$100 - $200', min: 100, max: 200 },
            { label: '$200 and above', min: 200, max: Infinity }
        ]
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [ProductsPerPage] = useState(8);

    const { category, color, priceRange } = filtersState;
    const [minPrice, maxPrice] = priceRange.split("-").map(Number);

    const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
        category: category !== 'all' ? category : '',
        color: color !== 'all' ? color : '',
        minPrice: isNaN(minPrice) ? '' : minPrice,
        maxPrice: isNaN(maxPrice) ? '' : maxPrice,
        page: currentPage,
        limit: ProductsPerPage,
    });

    const clearFilters = () => {
        setFiltersState({
            category: 'all',
            color: 'all',
            priceRange: ''
        });
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    if (categoriesIsLoading || isLoading) return <div>Loading...</div>;
    if (categoryError || error) return <div>Error loading data...</div>;

    const startProduct = (currentPage - 1) * ProductsPerPage + 1;
    const endProduct = startProduct + products.length - 1;

    return (
        <>
            <section className='section__container p-2'>
                <h2 className='section__header capitalize'>Product Page</h2>
                {/* <p className='section__subheader' style={{ textAlign: 'center',display: 'inline-block' }}>Unveiling Style: Timeless Elegance Meets Modern Trends in Women's Fashion.</p> */}
            </section>

            <section className='section__container'>
                <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
                    {/* Left Side - Filters */}
                    <div className='w-full md:w-1/4'>
                        <ShopFiltering
                            filters={filters}
                            filtersState={filtersState}
                            setFiltersState={setFiltersState}
                            clearFilters={clearFilters}
                        />
                    </div>

                    {/* Right Side - Products */}
                    <div className='w-full md:w-3/4'>
                        <h3 className='text-xl font-medium mb-4'>Showing {startProduct} to {endProduct} of {totalProducts} products</h3>
                        <ProductCards products={products} />
                        {/* Pagination Control */}
                        <div className='mt-6 flex justify-center'>
                            <button
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                                className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2'>Previous</button>
                            {
                                [...Array(totalPages)].map((_, index) => (
                                    <button key={index}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-gray-8 text-white' : 'bg-gray-300 text-gray-700'}
                                    rounded-md mx-1`}
                                    >{index + 1}</button>
                                ))
                            }
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                                className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2'>Next</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ShopPage;
