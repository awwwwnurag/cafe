
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RestaurantCard from '@/components/RestaurantCard';
import FilterOptions from '@/components/FilterOptions';
import { restaurants } from '@/data/restaurants';
import { Restaurant, SearchFilters } from '@/types';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, MapPin, Utensils } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<SearchFilters>({
    cuisines: [],
    vegOnly: false,
    rating: 0,
    priceRange: [],
    distance: "Any"
  });
  
  const query = searchParams.get('q') || '';
  const cuisineParam = searchParams.get('cuisine') || '';
  
  useEffect(() => {
    let results = [...restaurants];
    
    // Apply search query filter
    if (query) {
      results = results.filter(restaurant => 
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.cuisines.some(c => c.toLowerCase().includes(query.toLowerCase()))
      );
    }
    
    // Apply cuisine filter from URL parameter
    if (cuisineParam) {
      results = results.filter(restaurant => 
        restaurant.cuisines.some(c => c.toLowerCase() === cuisineParam.toLowerCase())
      );
    }
    
    // Apply filters
    if (appliedFilters.cuisines.length > 0) {
      results = results.filter(restaurant => 
        restaurant.cuisines.some(c => 
          appliedFilters.cuisines.includes(c)
        )
      );
    }
    
    if (appliedFilters.vegOnly) {
      results = results.filter(restaurant => restaurant.veg);
    }
    
    if (appliedFilters.rating > 0) {
      results = results.filter(restaurant => restaurant.rating >= appliedFilters.rating);
    }
    
    if (appliedFilters.priceRange.length > 0) {
      results = results.filter(restaurant => 
        appliedFilters.priceRange.includes(restaurant.priceRange)
      );
    }
    
    setFilteredRestaurants(results);
  }, [query, cuisineParam, appliedFilters]);
  
  const handleApplyFilters = (filters: SearchFilters) => {
    setAppliedFilters(filters);
    setShowFilters(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 flex-grow">
        {/* Search Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {query ? `Results for "₹{query}"` : 
             cuisineParam ? `₹{cuisineParam} Restaurants` : 
             "Search Results"}
          </h1>
          
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="py-4">
                  <h2 className="text-lg font-semibold mb-4">Filters</h2>
                  <FilterOptions 
                    onApplyFilters={handleApplyFilters}
                    initialFilters={appliedFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>
            
            <Button variant="outline">
              <MapPin className="h-4 w-4 mr-2" />
              Map
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <FilterOptions 
              onApplyFilters={handleApplyFilters}
              initialFilters={appliedFilters}
            />
          </div>
          
          {/* Restaurant Grid */}
          <div className="flex-1">
            {filteredRestaurants.length > 0 ? (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  {filteredRestaurants.length} restaurants found
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRestaurants.map(restaurant => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Utensils className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No restaurants found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button 
                  onClick={() => {
                    setAppliedFilters({
                      cuisines: [],
                      vegOnly: false,
                      rating: 0,
                      priceRange: [],
                      distance: "Any"
                    });
                  }}
                  variant="outline"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SearchResults;
