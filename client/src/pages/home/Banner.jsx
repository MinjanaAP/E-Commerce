import React from 'react';
import { Link } from 'react-router-dom';
import homeImage from '../../assets/home-image.jpg';

const Banner = () => {
    return (
        <div
            className="flex items-center justify-between h-screen text-white bg-center bg-no-repeat bg-cover header__container"
            style={{
                backgroundImage: `url(${homeImage})`,
            }}
        >
            <div className="z-30 max-w-2xl p-8 header__content">
                <h4 className="mb-4 text-lg uppercase">UP TO 20% Discount on</h4>
                <h1 className="mb-6 text-5xl font-bold">Girl's Fashion</h1>
                <p className="mb-6 leading-relaxed">
                    Welcome to Fashion House, your ultimate destination for the latest in girls' fashion trends. 
                    Discover a wide range of luxurious accessories and stylish products that redefine elegance and style. 
                    From chic clothing to premium fashion essentials, Fashion House is dedicated to bringing you 
                    the best in modern and trending fashion. Elevate your wardrobe and embrace luxury with us!
                </p>
                <button className="px-6 py-3 text-white bg-red-500 rounded btn hover:bg-red-600">
                    <Link to="/shop">EXPLORE NOW</Link>
                </button>
            </div>
        </div>
    );
};

export default Banner;
