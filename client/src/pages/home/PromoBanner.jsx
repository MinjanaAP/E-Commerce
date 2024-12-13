import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faDollarSign, faHeadset } from "@fortawesome/free-solid-svg-icons";

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: faTruck,
      title: "Free Delivery",
      description:
        "Enjoy free and fast delivery on all orders, making it easier to shop the latest trends in women’s fashion from the comfort of your home.",
    },
    {
      id: 2,
      icon: faDollarSign,
      title: "100% Money Back Guarantee",
      description:
        "Shop confidently with our money-back guarantee. If you're not satisfied with your purchase, we'll ensure a hassle-free refund.",
    },
    {
      id: 3,
      icon: faHeadset,
      title: "Dedicated Customer Support",
      description:
        "Our support team is here to assist you with size guides, styling advice, or any questions to make your shopping experience seamless.",
    },
  ];

  return (
    <div className="py-12 my-12 bg-white">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center gap-2 p-6 text-center transition duration-300 border border-gray-200 shadow-md hover:shadow-lg"
            >
              <div className="mb-4 text-5xl text-gray-600">
                <FontAwesomeIcon icon={feature.icon} />
              </div>
              <h3 className="mb-2 text-xl text-gray-800 font-custom">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
