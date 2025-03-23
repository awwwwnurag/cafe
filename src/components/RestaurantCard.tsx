
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { Restaurant } from '@/types';
import { Badge } from '@/components/ui/badge';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <Link 
      to={`/restaurant/${restaurant.id}`} 
      className="block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
    >
      <div className="relative">
        <img 
          src={restaurant.images[0]} 
          alt={restaurant.name} 
          className="w-full restaurant-card-image"
        />
        
        {restaurant.promoted && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
            Promoted
          </div>
        )}
        
        {restaurant.discount && (
          <div className="absolute bottom-2 left-2 bg-zomato-500 text-white text-sm px-2 py-1 rounded-md">
            {restaurant.discount}
          </div>
        )}
      </div>
      
      <div className="p-3">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-800 truncate">{restaurant.name}</h3>
          <div className="flex items-center bg-green-700 px-1.5 py-0.5 rounded text-white text-sm">
            <Star className="h-3 w-3 mr-0.5 fill-white" />
            <span>{restaurant.rating}</span>
          </div>
        </div>
        
        <div className="mt-1 flex flex-wrap gap-1">
          {restaurant.cuisines.slice(0, 3).map((cuisine, index) => (
            <span key={index} className="cuisine-badge bg-gray-100 text-gray-800">
              {cuisine}
            </span>
          ))}
        </div>
        
        <div className="mt-2 flex justify-between text-sm text-gray-500">
          <span>{restaurant.priceRange} • {restaurant.distance}</span>
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{restaurant.deliveryTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
