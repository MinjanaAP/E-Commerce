import React from 'react';

const TermsAndConditions = () => {
    return (
        <section className="section__container bg-primary-light py-12">
            <h2 className="section__header text-3xl font-bold text-center text-gray-800">
                Terms and Conditions
            </h2>
            <p className="section__subheader text-center text-lg text-gray-600 mt-4 mb-12">
                Please read these terms and conditions carefully before using our services.
            </p>

            <div className="terms__content px-6 lg:px-20">
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        1. Introduction
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        Welcome to our website! These Terms and Conditions govern your use of our site and services. By accessing or using our website, you agree to comply with and be bound by these terms.
                    </p>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        2. User Responsibilities
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        You are responsible for maintaining the confidentiality of your account information, including your password, and for all activities under your account. You must not use our website for any unlawful or unauthorized purpose.
                    </p>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        3. Product Information
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        We strive to provide accurate information about our products and services. However, errors in pricing, descriptions, or availability may occur. We reserve the right to correct any errors or inaccuracies and to change or update information without prior notice.
                    </p>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        4. Payment and Billing
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        All payments must be made through the secure payment methods provided on our website. You agree to provide current, complete, and accurate purchase and account information for all purchases made through our site.
                    </p>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        5. Limitation of Liability
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        We are not liable for any direct, indirect, incidental, or consequential damages arising from the use of our website or services. This limitation applies even if we have been advised of the possibility of such damages.
                    </p>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        6. Changes to Terms
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting. It is your responsibility to review the terms periodically for updates.
                    </p>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        7. Governing Law
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        These Terms and Conditions are governed by and construed in accordance with the laws of your jurisdiction. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in your area.
                    </p>
                </div>
            </div>

            <div className="terms__footer text-center mt-12">
                <p className="text-gray-700">
                    If you have any questions about these terms, please <a href="/contact" className="text-blue-500 underline">contact us</a>.
                </p>
            </div>
        </section>
    );
};

export default TermsAndConditions;
