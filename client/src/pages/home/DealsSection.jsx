import React from 'react';
import brand1 from "../../assets/brand1.png"; // Replace with actual paths to your brand logo images
import brand2 from "../../assets/brand1.png";
import brand3 from "../../assets/brand1.png";
import brand4 from "../../assets/brand1.png";

const DealsSection = () => {
  return (
    <section className="section__container deals__container">
      <div className="deals__content">
        <h4>Our Brands</h4>
        <p>
          Our Women's Fashion Deals of the Month are here to make your style dreams a reality without breaking
          the bank. Discover a curated collection of exquisite clothing, accessories,
          and footwear, all handpicked to elevate your wardrobe.
        </p>
        <div className="flex-wrap deals__countdown">
          <div className="deals__countdown__card">
            <h4>5 +</h4>
            <p>Brand</p>
          </div>
          <div className="deals__countdown__card">
            <h4>100 +</h4>
            <p>All Product</p>
          </div>
        </div>
      </div>

      <div className="deals__logos">
        <div className="logos__grid">
          <img src={brand1} alt="Brand 1" />
          <img src={brand2} alt="Brand 2" />
          <img src={brand3} alt="Brand 3" />
          <img src={brand4} alt="Brand 4" />
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
