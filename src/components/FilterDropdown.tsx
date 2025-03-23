
import React from 'react';
import { Filter, Check, Flame, Egg, Beef, Leaf, Award, Star, Cake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from "@/components/ui/slider";
import { Separator } from '@/components/ui/separator';

interface FilterDropdownProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  rating: number;
  setRating: (value: number) => void;
  dietaryOptions: {
    veg: boolean;
    nonVeg: boolean;
    egg: boolean;
  };
  setDietaryOptions: (options: {
    veg: boolean;
    nonVeg: boolean;
    egg: boolean;
  }) => void;
  topPicks?: {
    bestseller: boolean;
    rated4Plus: boolean;
    sweets: boolean;
  };
  setTopPicks?: (options: {
    bestseller: boolean;
    rated4Plus: boolean;
    sweets: boolean;
  }) => void;
  dietaryPreference?: {
    spicy: boolean;
    nonSpicy: boolean;
  };
  setDietaryPreference?: (options: {
    spicy: boolean;
    nonSpicy: boolean;
  }) => void;
  isRestaurantDetail?: boolean;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  sortBy,
  setSortBy,
  rating,
  setRating,
  dietaryOptions,
  setDietaryOptions,
  topPicks = { bestseller: false, rated4Plus: false, sweets: false },
  setTopPicks = () => {},
  dietaryPreference = { spicy: false, nonSpicy: false },
  setDietaryPreference = () => {},
  isRestaurantDetail = false,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
          {!isRestaurantDetail ? (
            <>
              <DropdownMenuRadioItem value="relevance">Relevance</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="rating">Rating</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="cost-high-to-low">Cost: High to Low</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="cost-low-to-high">Cost: Low to High</DropdownMenuRadioItem>
            </>
          ) : (
            <>
              <DropdownMenuRadioItem value="price-low-to-high">Price - Low to High</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="price-high-to-low">Price - High to Low</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="rating-high-to-low">Dish Rating - High to Low</DropdownMenuRadioItem>
            </>
          )}
        </DropdownMenuRadioGroup>
        
        <DropdownMenuSeparator />
        
        {!isRestaurantDetail && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="flex justify-between items-center">
                <span>Rating: {rating.toFixed(1)}+</span>
              </DropdownMenuLabel>
              <div className="px-2 py-2">
                <Slider
                  value={[rating]}
                  min={0}
                  max={5}
                  step={0.5}
                  onValueChange={(value) => setRating(value[0])}
                />
              </div>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
          </>
        )}
        
        <DropdownMenuLabel>Veg/Non-Veg Preference</DropdownMenuLabel>
        <div className="p-2 flex flex-col gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="veg" 
              checked={dietaryOptions.veg}
              onCheckedChange={(checked) => 
                setDietaryOptions({...dietaryOptions, veg: !!checked})
              }
            />
            <Label htmlFor="veg" className="flex items-center gap-2">
              <Leaf className="h-3 w-3 text-green-600" /> Veg
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="non-veg" 
              checked={dietaryOptions.nonVeg}
              onCheckedChange={(checked) => 
                setDietaryOptions({...dietaryOptions, nonVeg: !!checked})
              }
            />
            <Label htmlFor="non-veg" className="flex items-center gap-2">
              <Beef className="h-3 w-3 text-red-600" /> Non-Veg
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="egg" 
              checked={dietaryOptions.egg}
              onCheckedChange={(checked) => 
                setDietaryOptions({...dietaryOptions, egg: !!checked})
              }
            />
            <Label htmlFor="egg" className="flex items-center gap-2">
              <Egg className="h-3 w-3 text-yellow-500" /> Contains Egg
            </Label>
          </div>
        </div>
        
        {isRestaurantDetail && (
          <>
            <DropdownMenuSeparator />
            
            <DropdownMenuLabel>Top Picks</DropdownMenuLabel>
            <div className="p-2 flex flex-col gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="bestseller" 
                  checked={topPicks.bestseller}
                  onCheckedChange={(checked) => 
                    setTopPicks({...topPicks, bestseller: !!checked})
                  }
                />
                <Label htmlFor="bestseller" className="flex items-center gap-2">
                  <Award className="h-3 w-3 text-orange-500" /> Bestseller
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="rated4plus" 
                  checked={topPicks.rated4Plus}
                  onCheckedChange={(checked) => 
                    setTopPicks({...topPicks, rated4Plus: !!checked})
                  }
                />
                <Label htmlFor="rated4plus" className="flex items-center gap-2">
                  <Star className="h-3 w-3 text-yellow-500" /> Rated 4+
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="sweets" 
                  checked={topPicks.sweets}
                  onCheckedChange={(checked) => 
                    setTopPicks({...topPicks, sweets: !!checked})
                  }
                />
                <Label htmlFor="sweets" className="flex items-center gap-2">
                  <Cake className="h-3 w-3 text-pink-500" /> Sweets
                </Label>
              </div>
            </div>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuLabel>Dietary Preference</DropdownMenuLabel>
            <div className="p-2 flex flex-col gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="spicy" 
                  checked={dietaryPreference.spicy}
                  onCheckedChange={(checked) => 
                    setDietaryPreference({...dietaryPreference, spicy: !!checked})
                  }
                />
                <Label htmlFor="spicy" className="flex items-center gap-2">
                  <Flame className="h-3 w-3 text-red-600" /> Spicy
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="non-spicy" 
                  checked={dietaryPreference.nonSpicy}
                  onCheckedChange={(checked) => 
                    setDietaryPreference({...dietaryPreference, nonSpicy: !!checked})
                  }
                />
                <Label htmlFor="non-spicy" className="flex items-center gap-2">
                  <Leaf className="h-3 w-3 text-green-500" /> Non-Spicy
                </Label>
              </div>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
