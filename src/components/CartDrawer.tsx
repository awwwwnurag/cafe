
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, X, Minus, Plus, MapPin, PenLine } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import SuggestedMenuItems from './SuggestedMenuItems';
import AddressSelector from './AddressSelector';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();
  const [orderNote, setOrderNote] = useState('');
  
  const handleCheckout = () => {
    // In a real app, this would navigate to checkout page
    navigate('/checkout');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-zomato-500 text-white px-1.5 py-0.5 text-xs rounded-full">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-lg font-bold flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <ShoppingCart className="h-12 w-12 text-gray-300 mb-2" />
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
              >
                Browse Restaurants
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                  {item.image && (
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-2">₹{item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7 rounded-full" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      
                      <span className="mx-2 w-8 text-center">{item.quantity}</span>
                      
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7 rounded-full" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      
                      <div className="ml-auto font-medium">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button 
                variant="link" 
                asChild 
                className="p-0 h-auto font-medium text-zomato-500 flex items-center"
              >
                <Link to="/">
                  <Plus className="mr-1 h-4 w-4" />
                  Add Items
                </Link>
              </Button>
              
              <div className="mt-4">
                <div className="flex items-center mb-2">
                  <PenLine className="h-4 w-4 mr-2" />
                  <h3 className="font-medium">Add a note for the restaurant</h3>
                </div>
                <Textarea 
                  placeholder="Special instructions, allergies, etc."
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
              
              <SuggestedMenuItems />
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-4 mt-auto">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-medium">₹49.00</span>
            </div>
            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total</span>
              <span>₹{(totalPrice + 49).toFixed(2)}</span>
            </div>
            
            <div className="space-y-2">
              <AddressSelector buttonVariant="outline" />
              
              <Button 
                className="w-full bg-zomato-500 hover:bg-zomato-600"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
