import React from 'react';
import { Link } from 'react-router-dom';
import bannerImg from '../../assets/header.png';

const Banner = () => {
    return (
        <div className='section__container header__container'>
            <div className='header__content z-30'>
                <h4 className='uppercase'>UP TO 20% Discount on</h4>
                <h1>Girl{"'"}s Fashion</h1>
                <p>
                    Welcome to Fashion House, your ultimate destination for the latest in girls' fashion trends. 
                    Discover a wide range of luxurious accessories and stylish products that redefine elegance and style. 
                    From chic clothing to premium fashion essentials, Fashion House is dedicated to bringing you 
                    the best in modern and trending fashion. Elevate your wardrobe and embrace luxury with us!
                </p>
                <button className='btn'>
                    <Link to='/shop'>EXPLORE NOW</Link>
                </button>
            </div>
            <div className='header__image'>
                <img src={bannerImg} alt="banner img" style={{ width: '100%', maxWidth: '450px', height: 'auto' }} />
            </div>
        </div>
    );
}

export default Banner;
