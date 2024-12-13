import React from 'react';

const Blogs = () => {
    const blogs = [
        {
          id: 1,
          title: "Effortless Style for Every Occasion",
          date: "Mar 16, 2020",
          category: "Fashion Tips",
          description: "Discover how to style versatile wardrobe essentials that keep you fashionable, no matter the occasion. From casual outings to elegant evenings, explore outfits that work effortlessly.",
          image: "https://images.pexels.com/photos/9218397/pexels-photo-9218397.jpeg?auto=compress&cs=tinysrgb&w=600", // Updated image URL
        },
        {
          id: 2,
          title: "Top Trends to Elevate Your Wardrobe",
          date: "Mar 10, 2020",
          category: "Trends",
          description: "Explore the hottest trends in women's fashion and how to incorporate them into your daily wardrobe. Be the trendsetter with these bold and elegant looks.",
          image: "https://images.pexels.com/photos/7679453/pexels-photo-7679453.jpeg?auto=compress&cs=tinysrgb&w=600", // Updated image URL
        },
        {
          id: 3,
          title: "Sustainable Fashion: Chic and Eco-Friendly",
          date: "Feb 12, 2020",
          category: "Sustainability",
          description: "Learn how sustainable fashion is transforming wardrobes with eco-friendly fabrics and timeless designs. Stay stylish while contributing to a greener future.",
          image: "https://images.pexels.com/photos/96941/pexels-photo-96941.jpeg?auto=compress&cs=tinysrgb&w=600", // Updated image URL
        },
      ];      

  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800">From the blog</h2>
        <p className="mt-2 text-center text-gray-600">
          Learn how to grow your business with our expert advice.
        </p>

        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md cursor-pointer group hover:shadow-lg"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content Section */}
              <div className="p-6">
                <p className="mb-1 text-sm text-gray-500">
                  {blog.date} <span className="inline-block px-2 py-1 text-xs bg-gray-200 rounded">{blog.category}</span>
                </p>
                <h3 className="text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-blue-600">
                  {blog.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{blog.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
