import React from 'react';
import './AboutUs.css'; // Import the external CSS file

const AboutUs = () => {
    return (
        <section className="about-us">
            <h2>About Us</h2>
            <p>
                Learn more about our journey, values, and commitment to delivering the best in women’s fashion.
            </p>

            <div>
                <h3 className="our-story-title">Our Story</h3>
                <p className="our-story">
                    Our journey began with a dream: to redefine women’s fashion by blending timeless elegance with modern trends. We're passionate about offering our customers the highest-quality apparel while staying true to our commitment to sustainability and ethical sourcing.
                </p>
            </div>

            {/* Featured Collections */}
            <div className="featured-collections">
                <div className="collection-card card-dresses">
                    <h4>Dresses</h4>
                    <p>
                        Explore our elegant collection of dresses for all occasions. Whether you're looking for casual, formal, or evening wear, we have something for every style.
                    </p>
                </div>

                <div className="collection-card card-accessories">
                    <h4>Accessories</h4>
                    <p>
                        Discover the perfect accessories to complement your outfit. From stylish handbags to sparkling jewelry, we have everything to complete your look.
                    </p>
                </div>

                <div className="collection-card card-shoes">
                    <h4>Shoes</h4>
                    <p>
                        Step into style with our wide selection of fashionable shoes. Whether you're looking for sneakers, heels, or boots, we have the perfect pair for you.
                    </p>
                </div>

                <div className="collection-card card-sale">
                    <h4>Sale</h4>
                    <p>
                        Don’t miss out on amazing deals in our ongoing sale section. Get the best discounts on your favorite items before they're gone!
                    </p>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="testimonials">
                <h3>Customer Testimonials</h3>
                <p>
                    "I absolutely love the dresses from this store! The quality is exceptional, and the styles are on-trend. I feel confident every time I wear one of their pieces." – Emily R.
                </p>
                <p>
                    "The customer service is top-notch! I received my order quickly and in perfect condition. I will definitely be shopping here again." – Sarah W.
                </p>
                <p>
                    "Amazing selection and prices! The sale section is always full of great deals. Highly recommend this store!" – Olivia P.
                </p>
            </div>
        </section>
    );
};

export default AboutUs;