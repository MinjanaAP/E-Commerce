import React from 'react';
import brand1 from '../../assets/brand1.png';
import brand2 from '../../assets/brand2.png';
import brand3 from '../../assets/brand3.png';
import brand4 from '../../assets/brand4.png';
import brand5 from '../../assets/brand5.png';

export default function DealsSection() {
  return (
    <div className="py-24 bg-primary-light sm:py-32 section__container">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="flex flex-col gap-4 px-10 mb-10">
          <h2 className="text-3xl text-center text-gray-800 font-custom">
            Our Brands
          </h2>
          <p className="text-center text-gray-600 font-secondary ">
          Our trusted brands bring you the finest in women’s fashion, blending quality, style, and affordability. From chic everyday wear to statement pieces, our partners deliver timeless designs crafted to suit your unique style. Discover the perfect addition to your wardrobe today.
          </p>
        </div>
        <div className="grid items-center max-w-lg grid-cols-4 mx-auto mt-10 gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <img
            alt="Transistor"
            src={brand1}
            width={158}
            height={48}
            className="object-contain w-full col-span-2 max-h-12 lg:col-span-1"
          />
          <img
            alt="Reform"
            src={brand5}
            width={158}
            height={48}
            className="object-contain w-full col-span-2 max-h-12 lg:col-span-1"
          />
          <img
            alt="Tuple"
            src={brand3}
            width={158}
            height={48}
            className="object-contain w-full col-span-2 max-h-12 lg:col-span-1"
          />
          <img
            alt="SavvyCal"
            src={brand4}
            width={158}
            height={48}
            className="object-contain w-full col-span-2 max-h-12 sm:col-start-2 lg:col-span-1"
          />
          <img
            alt="Statamic"
            src={brand2}
            width={158}
            height={48}
            className="object-contain w-full col-span-2 col-start-2 max-h-12 sm:col-start-auto lg:col-span-1"
          />
        </div>
      </div>
    </div>
  )
}

