import React from 'react';
import { Link } from 'react-router-dom';

import category1 from '../../assets/category-1.jpg';
import category2 from '../../assets/category-2.jpg';
import category3 from '../../assets/category-3.jpg';
import category4 from '../../assets/category-4.jpg';

const Categories = () => {
  const categories = [
    { name: 'Tops', path: 'tops', image: category1 },
    { name: 'Pants', path: 'pants', image: category2 },
    { name: 'Dress Collection', path: 'fress', image: category3 },
    { name: 'Office Ware', path: 'office', image: category4 },
  ];

  return (
    <div className='my-12'>
      <div className="p-10 text-3xl font-semibold text-center text-gray-800">
        <h2 className='font-custom'>Shop By Category</h2>
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
            <h4 className="categories__name">{category.name}</h4>
          </Link>
        ))}
      </div>
    </div>
    
  );
};

export default Categories;
