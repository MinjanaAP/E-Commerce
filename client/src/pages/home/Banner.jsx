import React from 'react';
import { Link } from 'react-router-dom';
import homeImage from '../../assets/home-image.png';

const Banner = () => {
    return (
        <div
            className="flex items-center justify-between h-screen bg-right bg-no-repeat bg-cover text-whit header__container"
            style={{
                backgroundImage: `url(${homeImage})`,
                height: "100%",
                width: "auto",
                backgroundSize: "auto 100%",
            }}
        >
            <div className="z-30 max-w-2xl p-8 header__content">
                <h1 className="mb-6 text-5xl font-bold">Women's Latest Fashion</h1>
                <p className="mb-6 leading-relaxed">
                    Step into elegance with our curated collection of women’s apparel and accessories. 
                    From timeless classics to contemporary trends, discover outfits that celebrate femininity and individuality. 
                    Upgrade your wardrobe with exclusive designs crafted to complement every occasion, only at Fashion House.
                </p>
                <Link to="/shop">
                <button className="px-16 py-4 text-black border border-black bg-none hover:bg-gray-800 hover:text-white">
                    SHOP NOW
                </button>
                </Link>
            </div>
        </div>
    );
};

export default Banner;
