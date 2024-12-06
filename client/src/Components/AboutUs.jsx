import React from 'react';

import anurada from "../assets/anurada.jpg"
import chamara from "../assets/chamara.jpg"
import shehara from "../assets/shehara.jpg"
import sithija from "../assets/sithija.jpg"


const AboutUs = () => {
    return (
        <section className="section__container bg-primary-light py-12">
            <h2 className="section__header text-3xl font-bold text-center text-gray-800">
                About Us
            </h2>
            <p className="section__subheader text-center text-lg text-gray-600 mt-4 mb-12">
                Discover who we are, our values, and what drives us to bring you the best in women's fashion.
            </p>
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                        Our Story
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        At our core, we are a team of fashion enthusiasts dedicated to providing chic, high-quality women's fashion. Our journey began with a vision to create a space where style meets substance, offering products that not only look great but also make you feel confident.
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-4">
                        We believe in sustainability, ethical sourcing, and empowering individuals to express their uniqueness through fashion. From elegant dresses to versatile accessories, every piece is chosen with care and love.
                    </p>
                </div>

            {/* Team Section */}
            <div className="about__team mt-12 px-6 lg:px-20">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                    Meet Our Team
                </h3>
                <p className="text-gray-700 leading-relaxed text-center">
                    Behind every product is a dedicated team of designers, stylists, and customer support specialists working tirelessly to bring you the best experience.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    <div className="text-center">
                        <img
                            src={sithija}
                            alt="Team Member"
                            className="w-24 h-24 rounded-full mx-auto shadow-lg"
                        />
                        <h4 className="text-lg font-medium mt-4">Sithija</h4>
                        <p className="text-sm text-gray-600">Creative Director</p>
                    </div>
                    <div className="text-center">
                        <img
                            src={chamara}
                            alt="Team Member"
                            className="w-24 h-24 rounded-full mx-auto shadow-lg"
                        />
                        <h4 className="text-lg font-medium mt-4">Chamara</h4>
                        <p className="text-sm text-gray-600">Product Manager</p>
                    </div>
                    <div className="text-center">
                        <img
                            src={shehara}
                            alt="Team Member"
                            className="w-24 h-24 rounded-full mx-auto shadow-lg"
                        />
                        <h4 className="text-lg font-medium mt-4">Shehara</h4>
                        <p className="text-sm text-gray-600">Marketing Lead</p>
                    </div>
                    <div className="text-center">
                        <img
                            src={anurada}
                            alt="Team Member"
                            className="w-24 h-24 rounded-full mx-auto shadow-lg"
                        />
                        <h4 className="text-lg font-medium mt-4">Anuradha</h4>
                        <p className="text-sm text-gray-600">Support Specialist</p>
                    </div>
                </div>
            </div>

            {/* Vision Section */}
            <div className="about__vision mt-12 px-6 lg:px-20">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                    Our Vision
                </h3>
                <p className="text-gray-700 leading-relaxed text-center">
                    To become the go-to destination for women’s fashion, combining elegance, innovation, and sustainability. Our goal is to empower our customers to embrace their unique style and shine in every moment.
                </p>
            </div>
        </section>
    );
};

export default AboutUs;
