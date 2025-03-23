
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import SearchBar from './SearchBar';
import UserProfileMenu from './UserProfileMenu';
import CartDrawer from './CartDrawer';
import AddressSelector from './AddressSelector';

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile Menu */}
          <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="py-4">
                  <h2 className="text-lg font-semibold mb-4">Menu</h2>
                  <nav className="flex flex-col space-y-4">
                    <Link to="/" className="text-sm hover:text-zomato-600">Home</Link>
                    <Link to="/who-we-are" className="text-sm hover:text-zomato-600">Who We Are</Link>
                    <Link to="/about-us" className="text-sm hover:text-zomato-600">About Us</Link>
                    <Link to="/blog" className="text-sm hover:text-zomato-600">Blog</Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-zomato-600">CanteenCraze</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-zomato-600">Home</Link>
            <Link to="/who-we-are" className="text-sm font-medium hover:text-zomato-600">Who We Are</Link>
            <Link to="/about-us" className="text-sm font-medium hover:text-zomato-600">About Us</Link>
            <Link to="/blog" className="text-sm font-medium hover:text-zomato-600">Blog</Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <AddressSelector buttonVariant="ghost" iconOnly={true} />
            <CartDrawer />
            <UserProfileMenu />
          </div>
        </div>

        {/* Expandable Search Bar */}
        {showSearch && (
          <div className="mt-3 pb-3">
            <SearchBar onSearch={() => setShowSearch(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
