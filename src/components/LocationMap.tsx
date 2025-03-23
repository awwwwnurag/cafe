
import React from 'react';
import RestaurantMap from './RestaurantMap';

interface LocationMapProps {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

const LocationMap: React.FC<LocationMapProps> = ({ name, address, lat, lng }) => {
  return (
    <RestaurantMap 
      name={name} 
      address={address} 
      lat={lat} 
      lng={lng} 
    />
  );
};

export default LocationMap;
