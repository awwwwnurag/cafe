
import React from 'react';
import { 
  Utensils, Pizza, Sandwich, Cake, Coffee, 
  AlignJustify, Fish, Egg, Flame, UtensilsCrossed
} from 'lucide-react';
import { 
  ScrollArea, 
  ScrollBar 
} from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FoodTypeOption {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface FoodTypeSelectorProps {
  selectedType: string;
  onSelectType: (id: string) => void;
}

const FOOD_TYPES: FoodTypeOption[] = [
  { id: 'all', name: 'All', icon: <Utensils /> },
  { id: 'chole-bhature', name: 'Chole Bhature', icon: <AlignJustify /> },
  { id: 'sandwich', name: 'Sandwich', icon: <Sandwich /> },
  { id: 'paratha', name: 'Parathas', icon: <AlignJustify /> },
  { id: 'burger', name: 'Burger', icon: <UtensilsCrossed /> },
  { id: 'dosa', name: 'Dosa', icon: <AlignJustify /> },
  { id: 'chicken', name: 'Chicken', icon: <Flame /> },
  { id: 'cake', name: 'Cake', icon: <Cake /> },
  { id: 'vada-pav', name: 'Vada Pav', icon: <Sandwich /> },
  { id: 'rolls', name: 'Rolls', icon: <AlignJustify /> },
  { id: 'coffee', name: 'Coffee', icon: <Coffee /> },
  { id: 'pizza', name: 'Pizza', icon: <Pizza /> }
];

const FoodTypeSelector: React.FC<FoodTypeSelectorProps> = ({ 
  selectedType, 
  onSelectType 
}) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-2 p-2">
        {FOOD_TYPES.map((type) => (
          <Button
            key={type.id}
            variant={selectedType === type.id ? "default" : "outline"}
            className={cn(
              "flex flex-col items-center h-auto py-2 px-4 gap-1", 
              selectedType === type.id ? "bg-zomato-500 hover:bg-zomato-600" : ""
            )}
            onClick={() => onSelectType(type.id)}
          >
            {type.icon}
            <span className="text-xs font-medium mt-1">{type.name}</span>
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default FoodTypeSelector;
