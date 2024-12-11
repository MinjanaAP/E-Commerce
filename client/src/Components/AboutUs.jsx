import React from 'react';
import './AboutUs.css';
import aboutImage from '../assets/aboutus.jpg';

const AboutUs = () => {
    return (
        <section className="about-us">
            <div className="about-us-container">
                {/* Description on the left */}
                <div className="about-description">
                    <h2>About Us</h2>
                    <p>
                        Welcome to our world of fashion! We specialize in providing high-quality, timeless, and stylish apparel 
                        that blends elegance with modern trends. With a commitment to sustainability and ethical practices, 
                        we aim to make every customer feel confident and chic.
                    </p>
                </div>

                {/* Image on the right */}
                <div className="about-image">
                    <img src={aboutImage} alt="About Us" />
                </div>
            </div>
        </section>
    );
};

export default AboutUs;