import React from 'react';


const AboutUs = () => {
    return (
        <section className="py-12 section__container bg-primary-light">
            <h2 className="text-3xl font-bold text-center text-gray-800 section__header">
                About Us
            </h2>
            <p className="mt-4 mb-12 text-lg text-center text-gray-600 section__subheader">
                Discover who we are, our values, and what drives us to bring you the best in women's fashion.
            </p>
                <div>
                    <h3 className="mb-4 text-xl font-semibold text-center text-gray-800">
                        Our Story
                    </h3>
                    <p className="leading-relaxed text-gray-700">
                        At our core, we are a team of fashion enthusiasts dedicated to providing chic, high-quality women's fashion. Our journey began with a vision to create a space where style meets substance, offering products that not only look great but also make you feel confident.
                    </p>
                    <p className="mt-4 leading-relaxed text-gray-700">
                        We believe in sustainability, ethical sourcing, and empowering individuals to express their uniqueness through fashion. From elegant dresses to versatile accessories, every piece is chosen with care and love.
                    </p>
                </div>

            {/* Team Section */}
            <div className="px-6 mt-12 about__team lg:px-20">
                <h3 className="mb-4 text-xl font-semibold text-center text-gray-800">
                    Meet Our Team
                </h3>
                <p className="leading-relaxed text-center text-gray-700">
                    Behind every product is a dedicated team of designers, stylists, and customer support specialists working tirelessly to bring you the best experience.
                </p>
                <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="text-center">
                        {/* <img
                            src={sithija}
                            alt="Team Member"
                            className="w-24 h-24 mx-auto rounded-full shadow-lg"
                        /> */}
                        <h4 className="mt-4 text-lg font-medium">Sithija</h4>
                        <p className="text-sm text-gray-600">Creative Director</p>
                    </div>
                    <div className="text-center">
                        {/* <img
                            src={chamara}
                            alt="Team Member"
                            className="w-24 h-24 mx-auto rounded-full shadow-lg"
                        /> */}
                        <h4 className="mt-4 text-lg font-medium">Chamara</h4>
                        <p className="text-sm text-gray-600">Product Manager</p>
                    </div>
                    <div className="text-center">
                        {/* <img
                            src={shehara}
                            alt="Team Member"
                            className="w-24 h-24 mx-auto rounded-full shadow-lg"
                        /> */}
                        <h4 className="mt-4 text-lg font-medium">Shehara</h4>
                        <p className="text-sm text-gray-600">Marketing Lead</p>
                    </div>
                    <div className="text-center">
                        {/* <img
                            src={anurada}
                            alt="Team Member"
                            className="w-24 h-24 mx-auto rounded-full shadow-lg"
                        /> */}
                        <h4 className="mt-4 text-lg font-medium">Anuradha</h4>
                        <p className="text-sm text-gray-600">Support Specialist</p>
                    </div>
                </div>
            </div>

            {/* Vision Section */}
            <div className="px-6 mt-12 about__vision lg:px-20">
                <h3 className="mb-4 text-xl font-semibold text-center text-gray-800">
                    Our Vision
                </h3>
                <p className="leading-relaxed text-center text-gray-700">
                    To become the go-to destination for women’s fashion, combining elegance, innovation, and sustainability. Our goal is to empower our customers to embrace their unique style and shine in every moment.
                </p>
            </div>
        </section>
    );
};

export default AboutUs;
