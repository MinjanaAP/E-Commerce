import React from 'react';
import { Link } from 'react-router-dom';

import category1 from '../../assets/category-1.jpg';
import category2 from '../../assets/category-2.jpg';
import category3 from '../../assets/category-3.jpg';
import category4 from '../../assets/category-4.jpg';

const Categories = () => {
  const categories = [
    { name: 'Accessories', path: 'accessories', image: category1 },
    { name: 'Dress Collection', path: 'dress', image: category2 },
    { name: 'Jewellery', path: 'jewellery', image: category3 },
    { name: 'Cosmetics', path: 'cosmetics', image: category4 },
  ];

  return (
    <div>
      <div className='flex items-center justify-center p-6'>
        <h2>Shop By Category</h2>
      </div>
      <div className="categories__grid section__container">
        {categories.map((category) => (
          <Link
            to={`/categories/${category.path}`}
            className="categories__card"
            key={category.name}
            style={{
              backgroundImage: `url(${category.image})`,
            }}
          >
            <h4>{category.name}</h4>
          </Link>
        ))}
      </div>
    </div>
    
  );
};

export default Categories;
