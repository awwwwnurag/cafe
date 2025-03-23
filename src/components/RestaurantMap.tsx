
import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface RestaurantMapProps {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

const RestaurantMap: React.FC<RestaurantMapProps> = ({ name, address, lat, lng }) => {
  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="font-bold text-xl mb-4">Restaurant Location</h2>
      
      <div className="mb-4 flex items-start gap-2">
        <MapPin className="h-5 w-5 text-zomato-600 mt-0.5" />
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-500">{address}</p>
          <p className="text-xs text-gray-400">Coordinates: {lat.toFixed(6)}, {lng.toFixed(6)}</p>
        </div>
      </div>
      
      <div className="map-container h-48 bg-gray-100 rounded-md overflow-hidden relative">
        {/* Basic map placeholder - in a real app you would use a mapping library */}
        <div className="absolute inset-0 bg-[#e8e8e8]"></div>
        
        {/* Basic grid lines */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border border-gray-200 opacity-30"></div>
          ))}
        </div>
        
        {/* Marker at center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-zomato-500 p-1 rounded-full">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <div className="mt-1 bg-white px-2 py-1 rounded-md shadow-md text-xs font-medium whitespace-nowrap">
            {name}
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=₹{lat},₹{lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zomato-600 hover:text-zomato-700 text-sm font-medium"
        >
          View on Google Maps
        </a>
      </div>
    </div>
  );
};

export default RestaurantMap;
