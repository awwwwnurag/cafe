
import React, { useState } from 'react';
import { MenuItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Check, Flame, Plus, Minus, Check as CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';

interface MenuListProps {
  menuItems: MenuItem[];
}

const MenuList: React.FC<MenuListProps> = ({ menuItems }) => {
  const { addToCart, updateQuantity, items: cartItems } = useCart();
  
  // Get unique categories
  const categories = Array.from(new Set(menuItems.map(item => item.category)));
  categories.unshift("All"); // Add "All" option at the beginning
  
  const getItemQuantityInCart = (id: string) => {
    const cartItem = cartItems.find(item => item.id === id);
    return cartItem ? cartItem.quantity : 0;
  };
  
  const renderMenuItems = (categoryItems: MenuItem[]) => (
    <div className="space-y-4">
      {categoryItems.map((item) => {
        const quantityInCart = getItemQuantityInCart(item.id);
        const isInCart = quantityInCart > 0;
        
        return (
          <div 
            key={item.id} 
            className="flex items-start justify-between p-4 border-b border-gray-100"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {item.veg && (
                  <div className="h-4 w-4 border border-green-700 flex items-center justify-center">
                    <div className="h-2 w-2 bg-green-700 rounded-full"></div>
                  </div>
                )}
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                {item.bestseller && (
                  <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50 text-xs">
                    <Check className="h-3 w-3 mr-1" /> Bestseller
                  </Badge>
                )}
                {item.spicy && (
                  <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50 text-xs">
                    <Flame className="h-3 w-3 mr-1" /> Spicy
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">₹{item.price.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
            </div>
            
            <div className="flex items-center gap-4">
              {item.image && (
                <div className="w-20 h-20 rounded-md overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {isInCart ? (
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded" 
                    onClick={() => updateQuantity(item.id, quantityInCart - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  
                  <span className="mx-2 w-8 text-center">{quantityInCart}</span>
                  
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded" 
                    onClick={() => addToCart(item)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-gray-200"
                  onClick={() => addToCart(item)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
  
  return (
    <div className="bg-white rounded-lg">
      <h2 className="font-bold text-xl mb-4">Menu</h2>
      
      <Tabs defaultValue={categories[0]}>
        <TabsList className="w-full overflow-x-auto flex justify-start mb-4">
          {categories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="px-4 py-2 text-sm"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map(category => (
          <TabsContent key={category} value={category}>
            {category === "All" 
              ? renderMenuItems(menuItems)
              : renderMenuItems(menuItems.filter(item => item.category === category))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MenuList;
