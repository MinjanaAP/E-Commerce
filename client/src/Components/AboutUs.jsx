import React from 'react';
import './AboutUs.css';
import aboutImage from '../assets/aboutus.jpg';
import missionImage from '../assets/mission.jpg';
import valuesImage from '../assets/value.jpg';
import journeyImage from '../assets/journey.jpg';
import whyChooseUsImage from '../assets/chooseus.jpg';

const AboutUs = () => {
    return (
        <section className="about-us">
            <div className="about-us-container">
                {/* Description */}
                <div className="about-description">
                    <h2>About Us</h2>
                    <p>
                        Welcome to our world of fashion! We specialize in providing high-quality, timeless, and stylish apparel 
                        that blends elegance with modern trends. With a commitment to sustainability and ethical practices, 
                        we aim to make every customer feel confident and chic.
                    </p>
                </div>

                {/* Image */}
                <div className="about-image">
                    <img src={aboutImage} alt="About Us" />
                </div>
            </div>

            {/* Cards Section */}
            <div className="card-container">
                <div className="card">
                    <img src={missionImage} alt="Our Mission" />
                    <h3>Our Mission</h3>
                    <p>To inspire confidence and elegance by delivering exceptional fashion rooted in quality and sustainability.</p>
                </div>
                <div className="card">
                    <img src={valuesImage} alt="Our Values" />
                    <h3>Our Values</h3>
                    <p>We are committed to sustainability, inclusivity, and ethical practices in everything we do.</p>
                </div>
                <div className="card">
                    <img src={journeyImage} alt="Our Journey" />
                    <h3>Our Journey</h3>
                    <p>From a small idea to a renowned brand, explore how we grew and evolved through the years.</p>
                </div>
                <div className="card">
                    <img src={whyChooseUsImage} alt="Why Choose Us" />
                    <h3>Why Choose Us</h3>
                    <p>Exceptional quality, timeless designs, and a commitment to making you look and feel your best.</p>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;