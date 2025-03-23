
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MenuItem } from '@/types';

// Mock data for similar menu items
const suggestedItems: MenuItem[] = [
  {
    id: 'sug1',
    name: 'Garlic Bread',
    description: 'Oven-baked bread with garlic butter',
    price: 199,
    veg: true,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'sug2',
    name: 'Mozzarella Sticks',
    description: 'Deep-fried mozzarella cheese sticks',
    price: 249,
    veg: true,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1548340748-6d3b8d4d2f33?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'sug3',
    name: 'BBQ Wings',
    description: 'Spicy chicken wings with BBQ sauce',
    price: 349,
    veg: false,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'sug4',
    name: 'Loaded Fries',
    description: 'Fries topped with cheese and bacon',
    price: 299,
    veg: false,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'sug5',
    name: 'Caprese Salad',
    description: 'Tomatoes, mozzarella, basil with balsamic glaze',
    price: 399,
    veg: true,
    category: 'Salads',
    image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

const SuggestedMenuItems: React.FC = () => {
  const { addToCart } = useCart();
  
  return (
    <div className="mt-4">
      <h3 className="font-medium mb-3">Customers also ordered</h3>
      <ScrollArea className="whitespace-nowrap pb-4">
        <div className="flex space-x-4">
          {suggestedItems.map((item) => (
            <div key={item.id} className="w-48 flex-shrink-0 border rounded-lg overflow-hidden bg-white">
              {item.image && (
                <div className="h-32 w-full relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  {item.veg && (
                    <Badge className="absolute top-2 left-2 bg-green-500">Veg</Badge>
                  )}
                </div>
              )}
              <div className="p-3">
                <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                <p className="text-xs text-gray-500 line-clamp-2 h-8 mt-1">{item.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-medium">₹{item.price.toFixed(2)}</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => addToCart(item)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SuggestedMenuItems;
