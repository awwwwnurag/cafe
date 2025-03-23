
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import RestaurantCard from '@/components/RestaurantCard';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';
import { restaurants } from '@/data/restaurants';
import { Button } from '@/components/ui/button';
import { Utensils, Star, TrendingUp, Clock } from 'lucide-react';
import FoodTypeSelector from '@/components/FoodTypeSelector';
import FilterDropdown from '@/components/FilterDropdown';

const HOME_BANNER = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeFoodType, setActiveFoodType] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [rating, setRating] = useState(0);
  const [dietaryOptions, setDietaryOptions] = useState({
    veg: false,
    nonVeg: false,
    egg: false,
  });
  
  const filteredRestaurants = restaurants.filter(restaurant => {
    // Basic category filters
    if (activeFilter !== 'all') {
      if (activeFilter === 'promoted' && !restaurant.promoted) return false;
      if (activeFilter === 'veg' && !restaurant.veg) return false;
      if (activeFilter === 'offers' && !restaurant.discount) return false;
      if (activeFilter === 'highRated' && restaurant.rating < 4.5) return false;
    }

    // Food type filter (simulated, would need actual data)
    if (activeFoodType !== 'all') {
      // This is just a placeholder. In a real app, you'd check if the restaurant
      // serves the selected food type based on menu items or categories
      if (!restaurant.cuisines.some(cuisine => 
        cuisine.toLowerCase().includes(activeFoodType.toLowerCase())
      )) {
        return false;
      }
    }
    
    // Rating filter from dropdown
    if (rating > 0 && restaurant.rating < rating) {
      return false;
    }
    
    // Dietary preference filters
    if (dietaryOptions.veg && !restaurant.veg) {
      return false;
    }
    
    if (dietaryOptions.nonVeg && restaurant.veg) {
      return false;
    }
    
    // Note: 'egg' filter would need an actual property in the restaurant data
    // This is just a placeholder implementation
    if (dietaryOptions.egg) {
      // Placeholder logic - in a real app, you would have an 'egg' property on restaurants
      return true;
    }
    
    return true;
  });

  // Sort restaurants
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    if (sortBy === 'cost-high-to-low') {
      // Using price range as a simple numeric value for sorting
      const priceA = a.priceRange.length;
      const priceB = b.priceRange.length;
      return priceB - priceA;
    }
    if (sortBy === 'cost-low-to-high') {
      // Using price range as a simple numeric value for sorting
      const priceA = a.priceRange.length;
      const priceB = b.priceRange.length;
      return priceA - priceB;
    }
    // relevance - default order
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative">
        <img 
          src={HOME_BANNER} 
          alt="Delicious food banner" 
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center p-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
            Discover the best food &amp; drinks
          </h1>
          <div className="w-full max-w-md mb-4">
            <SearchBar />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Food Type Selector */}
        <div className="mb-6">
          <FoodTypeSelector 
            selectedType={activeFoodType} 
            onSelectType={setActiveFoodType} 
          />
        </div>
        
        {/* Filter Options */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex overflow-x-auto pb-4 gap-2 hide-scrollbar">
            <Button 
              variant={activeFilter === 'all' ? "default" : "outline"}
              className={activeFilter === 'all' ? "bg-zomato-500 hover:bg-zomato-600" : ""}
              onClick={() => setActiveFilter('all')}
            >
              <Utensils className="mr-2 h-4 w-4" />
              All Restaurants
            </Button>
            <Button 
              variant={activeFilter === 'highRated' ? "default" : "outline"}
              className={activeFilter === 'highRated' ? "bg-zomato-500 hover:bg-zomato-600" : ""}
              onClick={() => setActiveFilter('highRated')}
            >
              <Star className="mr-2 h-4 w-4" />
              Top Rated
            </Button>
            <Button 
              variant={activeFilter === 'promoted' ? "default" : "outline"}
              className={activeFilter === 'promoted' ? "bg-zomato-500 hover:bg-zomato-600" : ""}
              onClick={() => setActiveFilter('promoted')}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Trending
            </Button>
            <Button 
              variant={activeFilter === 'veg' ? "default" : "outline"}
              className={activeFilter === 'veg' ? "bg-zomato-500 hover:bg-zomato-600" : ""}
              onClick={() => setActiveFilter('veg')}
            >
              <div className="mr-2 h-4 w-4 border border-current flex items-center justify-center">
                <div className="h-2 w-2 bg-current rounded-full"></div>
              </div>
              Pure Veg
            </Button>
            <Button 
              variant={activeFilter === 'offers' ? "default" : "outline"}
              className={activeFilter === 'offers' ? "bg-zomato-500 hover:bg-zomato-600" : ""}
              onClick={() => setActiveFilter('offers')}
            >
              <Clock className="mr-2 h-4 w-4" />
              Great Offers
            </Button>
          </div>
          
          {/* Filter Dropdown */}
          <FilterDropdown 
            sortBy={sortBy}
            setSortBy={setSortBy}
            rating={rating}
            setRating={setRating}
            dietaryOptions={dietaryOptions}
            setDietaryOptions={setDietaryOptions}
          />
        </div>
        
        {/* Restaurant Grid */}
        <h2 className="text-2xl font-bold mb-6">
          {activeFilter === 'all' ? 'All Restaurants' : 
           activeFilter === 'promoted' ? 'Trending Restaurants' : 
           activeFilter === 'veg' ? 'Vegetarian Restaurants' : 
           activeFilter === 'offers' ? 'Great Offers' :
           'Top Rated Restaurants'}
          {activeFoodType !== 'all' && 
            ` - ${FOOD_TYPES.find(type => type.id === activeFoodType)?.name || activeFoodType}`}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
        
        {sortedRestaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No restaurants found for the selected filters.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setActiveFilter('all');
                setActiveFoodType('all');
                setRating(0);
                setDietaryOptions({
                  veg: false,
                  nonVeg: false,
                  egg: false
                });
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

// Food types data
const FOOD_TYPES = [
  { id: 'all', name: 'All' },
  { id: 'chole-bhature', name: 'Chole Bhature' },
  { id: 'sandwich', name: 'Sandwich' },
  { id: 'paratha', name: 'Parathas' },
  { id: 'burger', name: 'Burger' },
  { id: 'dosa', name: 'Dosa' },
  { id: 'chicken', name: 'Chicken' },
  { id: 'cake', name: 'Cake' },
  { id: 'vada-pav', name: 'Vada Pav' },
  { id: 'rolls', name: 'Rolls' },
  { id: 'coffee', name: 'Coffee' },
  { id: 'pizza', name: 'Pizza' }
];

export default Index;
