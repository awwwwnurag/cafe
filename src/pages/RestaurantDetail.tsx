
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { restaurants } from '@/data/restaurants';
import { Restaurant, MenuItem } from '@/types';
import { Star, Clock, MapPin, Info, ArrowLeft, Share, Bookmark, ThumbsUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenuList from '@/components/MenuList';
import ReviewSection from '@/components/ReviewSection';
import LocationMap from '@/components/LocationMap';
import FilterDropdown from '@/components/FilterDropdown';
import { useToast } from '@/hooks/use-toast';

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItem[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Filter states
  const [sortBy, setSortBy] = useState('relevance');
  const [rating, setRating] = useState(0);
  const [dietaryOptions, setDietaryOptions] = useState({
    veg: false,
    nonVeg: false,
    egg: false
  });
  const [topPicks, setTopPicks] = useState({
    bestseller: false,
    rated4Plus: false,
    sweets: false
  });
  const [dietaryPreference, setDietaryPreference] = useState({
    spicy: false,
    nonSpicy: false
  });
  
  useEffect(() => {
    const fetchRestaurant = () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        const foundRestaurant = restaurants.find(r => r.id === id);
        if (foundRestaurant) {
          setRestaurant(foundRestaurant);
          setFilteredMenuItems(foundRestaurant.menu);
          // Log view for analytics in a real app
          console.log(`Viewing restaurant: ${foundRestaurant.name}`);
        } else {
          console.error('Restaurant not found');
          toast({
            title: "Restaurant not found",
            description: "The restaurant you're looking for doesn't exist",
            variant: "destructive"
          });
          // Use a slight delay to show the toast before navigating
          setTimeout(() => navigate('/'), 500);
        }
      } catch (error) {
        console.error('Error fetching restaurant:', error);
        toast({
          title: "Error",
          description: "Failed to load restaurant details",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRestaurant();
    }
  }, [id, navigate, toast]);
  
  useEffect(() => {
    if (!restaurant) return;
    
    let items = [...restaurant.menu];
    
    // Apply dietary options filter
    if (dietaryOptions.veg || dietaryOptions.nonVeg || dietaryOptions.egg) {
      items = items.filter(item => {
        if (dietaryOptions.veg && item.veg) return true;
        if (dietaryOptions.nonVeg && !item.veg) return true;
        if (dietaryOptions.egg && !item.veg && item.description?.toLowerCase().includes('egg')) return true;
        return !(dietaryOptions.veg || dietaryOptions.nonVeg || dietaryOptions.egg);
      });
    }
    
    // Apply top picks filter
    if (topPicks.bestseller || topPicks.rated4Plus || topPicks.sweets) {
      items = items.filter(item => {
        if (topPicks.bestseller && item.bestseller) return true;
        if (topPicks.rated4Plus && item.rating && item.rating >= 4) return true;
        if (topPicks.sweets && item.category?.toLowerCase().includes('dessert')) return true;
        return !(topPicks.bestseller || topPicks.rated4Plus || topPicks.sweets);
      });
    }
    
    // Apply dietary preference filter
    if (dietaryPreference.spicy || dietaryPreference.nonSpicy) {
      items = items.filter(item => {
        if (dietaryPreference.spicy && item.spicy) return true;
        if (dietaryPreference.nonSpicy && !item.spicy) return true;
        return !(dietaryPreference.spicy || dietaryPreference.nonSpicy);
      });
    }
    
    // Apply sorting
    items.sort((a, b) => {
      switch (sortBy) {
        case 'price-low-to-high':
          return a.price - b.price;
        case 'price-high-to-low':
          return b.price - a.price;
        case 'rating-high-to-low':
          // If rating is not available, assume it's lowest
          const aRating = a.rating || 0;
          const bRating = b.rating || 0;
          return bRating - aRating;
        default:
          return 0;
      }
    });
    
    setFilteredMenuItems(items);
  }, [restaurant, sortBy, dietaryOptions, topPicks, dietaryPreference]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zomato-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading restaurant details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!restaurant) {
    return null; // This will be handled by the redirect in the useEffect
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 flex-grow">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        {/* Restaurant Images */}
        <div className="restaurant-image-slider mb-6">
          <img 
            src={restaurant.images[activeImageIndex]} 
            alt={`₹{restaurant.name} - view ₹{activeImageIndex + 1}`} 
            className="w-full h-full object-cover"
          />
          
          {/* Image Thumbnails */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {restaurant.images.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ₹{
                  index === activeImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setActiveImageIndex(index)}
              />
            ))}
          </div>
        </div>
        
        {/* Restaurant Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-sm text-gray-500 mb-2">{restaurant.cuisines.join(', ')}</p>
            <p className="text-sm text-gray-500 mb-4">{restaurant.address}</p>
            
            {restaurant.discount && (
              <div className="inline-flex items-center px-3 py-1 rounded-md bg-red-50 text-zomato-600 text-sm mb-4">
                <Info className="h-4 w-4 mr-2" />
                {restaurant.discount}
              </div>
            )}
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="flex items-center bg-green-700 px-2 py-1 rounded text-white text-sm mr-1">
                  <Star className="h-3 w-3 mr-1 fill-white" />
                  <span>{restaurant.rating}</span>
                </div>
                <span className="text-xs text-gray-500">({restaurant.reviewCount}+ ratings)</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <span>{restaurant.priceRange} for two</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0">
            <FilterDropdown 
              sortBy={sortBy}
              setSortBy={setSortBy}
              rating={rating}
              setRating={setRating}
              dietaryOptions={dietaryOptions}
              setDietaryOptions={setDietaryOptions}
              topPicks={topPicks}
              setTopPicks={setTopPicks}
              dietaryPreference={dietaryPreference}
              setDietaryPreference={setDietaryPreference}
              isRestaurantDetail={true}
            />
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
        
        {/* Restaurant Content */}
        <Tabs defaultValue="menu" className="mb-6">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
          </TabsList>
          
          <TabsContent value="menu">
            <MenuList menuItems={filteredMenuItems} />
          </TabsContent>
          
          <TabsContent value="reviews">
            <ReviewSection reviews={restaurant.reviews} />
          </TabsContent>
          
          <TabsContent value="info">
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-4">
                <h2 className="font-bold text-xl mb-4">About</h2>
                <p className="text-gray-700">{restaurant.description}</p>
              </div>
              
              <LocationMap 
                name={restaurant.name}
                address={restaurant.address}
                lat={restaurant.latitude}
                lng={restaurant.longitude}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default RestaurantDetail;

