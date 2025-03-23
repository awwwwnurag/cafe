
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo & About */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">CanteenCraze</h2>
            <p className="text-sm text-gray-400">
              Discovering the best food experiences for food lovers everywhere.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold uppercase tracking-wider text-white">About</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/who-we-are" className="text-gray-400 hover:text-white text-sm">Who We Are</Link>
              </li>
              <li>
                <Link to="/about-us" className="text-gray-400 hover:text-white text-sm">About Us</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white text-sm">Blog</Link>
              </li>
              <li>
                <Link to="/career" className="text-gray-400 hover:text-white text-sm">Careers</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Cuisines */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold uppercase tracking-wider text-white">Popular Cuisines</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/search?cuisine=Italian" className="text-gray-400 hover:text-white text-sm">Italian</Link>
              </li>
              <li>
                <Link to="/search?cuisine=Indian" className="text-gray-400 hover:text-white text-sm">Indian</Link>
              </li>
              <li>
                <Link to="/search?cuisine=Mexican" className="text-gray-400 hover:text-white text-sm">Mexican</Link>
              </li>
              <li>
                <Link to="/search?cuisine=Japanese" className="text-gray-400 hover:text-white text-sm">Japanese</Link>
              </li>
              <li>
                <Link to="/search?cuisine=Chinese" className="text-gray-400 hover:text-white text-sm">Chinese</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold uppercase tracking-wider text-white">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2" />
                <span>support@canteencraze.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-white mb-2">Subscribe to our newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-sm rounded-l px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-zomato-500"
                />
                <button
                  type="submit"
                  className="bg-zomato-500 hover:bg-zomato-600 text-white px-4 rounded-r text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} CanteenCraze. All rights reserved.</p>
          <div className="flex mt-4 md:mt-0 space-x-6">
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
