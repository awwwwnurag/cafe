
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SearchFilters } from '@/types';

const CUISINES = ["All", "Indian", "Italian", "Mexican", "Japanese", "American", "Chinese", "Thai", "Healthy"];
const PRICE_RANGES = ["₹", "₹₹", "₹₹₹", "₹₹₹₹"];

interface FilterOptionsProps {
  onApplyFilters: (filters: SearchFilters) => void;
  initialFilters?: SearchFilters;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ 
  onApplyFilters, 
  initialFilters 
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(
    initialFilters?.cuisines || []
  );
  const [vegOnly, setVegOnly] = useState<boolean>(
    initialFilters?.vegOnly || false
  );
  const [rating, setRating] = useState<number>(
    initialFilters?.rating || 0
  );
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>(
    initialFilters?.priceRange || []
  );

  const handleCuisineToggle = (cuisine: string) => {
    if (cuisine === "All") {
      setSelectedCuisines([]);
      return;
    }
    
    if (selectedCuisines.includes(cuisine)) {
      setSelectedCuisines(selectedCuisines.filter(c => c !== cuisine));
    } else {
      setSelectedCuisines([...selectedCuisines, cuisine]);
    }
  };

  const handlePriceToggle = (price: string) => {
    if (selectedPriceRanges.includes(price)) {
      setSelectedPriceRanges(selectedPriceRanges.filter(p => p !== price));
    } else {
      setSelectedPriceRanges([...selectedPriceRanges, price]);
    }
  };

  const handleApplyFilters = () => {
    const filters: SearchFilters = {
      cuisines: selectedCuisines,
      vegOnly,
      rating,
      priceRange: selectedPriceRanges,
      distance: "Any"
    };
    
    onApplyFilters(filters);
    
    // Update URL params
    const params = new URLSearchParams(searchParams);
    
    if (selectedCuisines.length > 0) {
      params.set('cuisines', selectedCuisines.join(','));
    } else {
      params.delete('cuisines');
    }
    
    if (vegOnly) {
      params.set('veg', 'true');
    } else {
      params.delete('veg');
    }
    
    if (rating > 0) {
      params.set('rating', rating.toString());
    } else {
      params.delete('rating');
    }
    
    if (selectedPriceRanges.length > 0) {
      params.set('price', selectedPriceRanges.join(','));
    } else {
      params.delete('price');
    }
    
    navigate({ search: params.toString() });
  };

  const clearFilters = () => {
    setSelectedCuisines([]);
    setVegOnly(false);
    setRating(0);
    setSelectedPriceRanges([]);
    
    navigate({ search: searchParams.get('q') ? `q=₹{searchParams.get('q')}` : '' });
    
    onApplyFilters({
      cuisines: [],
      vegOnly: false,
      rating: 0,
      priceRange: [],
      distance: "Any"
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="font-semibold text-lg mb-4">Filters</h3>
      
      {/* Cuisine Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Cuisine</h4>
        <div className="flex flex-wrap gap-2">
          {CUISINES.map(cuisine => (
            <Button
              key={cuisine}
              variant={selectedCuisines.includes(cuisine) ? "default" : "outline"}
              size="sm"
              onClick={() => handleCuisineToggle(cuisine)}
              className={selectedCuisines.includes(cuisine) ? "bg-zomato-500 hover:bg-zomato-600" : ""}
            >
              {cuisine}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Veg Only Filter */}
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <Switch 
            id="veg-only" 
            checked={vegOnly} 
            onCheckedChange={setVegOnly} 
          />
          <Label htmlFor="veg-only">Vegetarian Only</Label>
        </div>
      </div>
      
      {/* Rating Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Rating: {rating.toFixed(1)}+</h4>
        <Slider
          value={[rating]}
          min={0}
          max={5}
          step={0.5}
          onValueChange={(value) => setRating(value[0])}
          className="py-4"
        />
      </div>
      
      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Price Range</h4>
        <div className="flex gap-2">
          {PRICE_RANGES.map(price => (
            <Button
              key={price}
              variant={selectedPriceRanges.includes(price) ? "default" : "outline"}
              size="sm"
              onClick={() => handlePriceToggle(price)}
              className={selectedPriceRanges.includes(price) ? "bg-zomato-500 hover:bg-zomato-600" : ""}
            >
              {price}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Apply and Clear Buttons */}
      <div className="flex gap-2">
        <Button 
          onClick={handleApplyFilters} 
          className="bg-zomato-500 hover:bg-zomato-600 w-full"
        >
          Apply Filters
        </Button>
        <Button 
          variant="outline" 
          onClick={clearFilters}
          className="w-full"
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default FilterOptions;
