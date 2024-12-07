import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import amex from "../assets/amex-icon.png"
import gpay from "../assets/google-pay.png"
import mastercard from "../assets/mastercard-icon.png"
import paypal from "../assets/paypal-icon.png"

const Footer = () => {
  return (
    <footer className="text-white bg-black bg-beige">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* Customer Care Section */}
          <div>
            <h5 className="mb-4 font-bold text-md">Customer Care</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-yellow-300">FAQs</a></li>
              <li><a href="#" className="text-sm hover:text-yellow-300">Contact Us</a></li>
              <li><a href="#" className="text-sm hover:text-yellow-300">Shipping & Returns</a></li>
              <li><a href="#" className="text-sm hover:text-yellow-300">Track your Delivery</a></li>
            </ul>
          </div>

          {/* Corporate Section */}
          <div>
            <h5 className="mb-4 font-bold text-md">Corporate</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-yellow-300">Brembati Size Guide</a></li>
              <li><a href="#" className="text-sm hover:text-yellow-300">About Us</a></li>
              <li><a href="#" className="text-sm hover:text-yellow-300">Find a Store</a></li>
              <li><a href="#" className="text-sm hover:text-yellow-300">Italian Stories</a></li>
            </ul>
          </div>

          {/* Legal Area Section */}
          <div>
            <h5 className="mb-4 font-bold text-md">Legal Area</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-yellow-300">Shipping Policy</a></li>
              <li><a href="#" className="text-sm hover:text-yellow-300">Refund Policy</a></li>
              <li><a href="#" className="text-sm hover:text-yellow-300">Imprint</a></li>
              <li><a href="#" className="text-sm hover:text-yellow-300">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-yellow-300">Cookie Policy</a></li>
              <li><a href="#" className="text-sm hover:text-yellow-300">Terms and Conditions</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h5 className="mb-4 font-bold text-md">Newsletter</h5>
            <p className="mb-4 text-sm">
              Get the latest news from the BREMBATI.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-2 text-white bg-gray-800 rounded hover:bg-gray-900"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-xs">
              By clicking on the “Subscribe”-button I agree to the Terms and Conditions and Privacy Policy.
            </p>
            <div className="flex mt-4 space-x-8">
              <a href="#" className="text-gray-700 hover:text-yellow-300">
                <FontAwesomeIcon icon={faInstagram} size="lg" className="text-white"/>
              </a>
              <a href="#" className="text-gray-700 hover:text-yellow-300">
                <FontAwesomeIcon icon={faFacebook} size="lg" className="text-white"/>
              </a>
              <a href="#" className="text-gray-700 hover:text-yellow-300">
                <FontAwesomeIcon icon={faTwitter} size="lg" className="text-white"/>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col items-center justify-between pt-6 mt-12 border-t md:flex-row">
          <p className="text-sm">Copyrights © 2025 by Fashion House.All rights Reserved.</p>
          <div className="flex mt-4 space-x-4 md:mt-0">
            <img src={amex} alt="Amex" className="h-6" />
            <img src={gpay} alt="Google Pay" className="h-6" />
            <img src={mastercard} alt="MasterCard" className="h-6" />
            <img src={paypal} alt="PayPal" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
