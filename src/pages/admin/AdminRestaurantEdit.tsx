import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Egg, Salad, Drumstick, Plus, Trash, Save } from 'lucide-react';
import { Restaurant, MenuItem } from '@/types';
import { restaurants as mockRestaurants } from '@/data/restaurants';
import { toast } from '@/hooks/use-toast';

const AdminRestaurantEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newMenuItem, setNewMenuItem] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    veg: false,
  });
  const [isAddMenuItemOpen, setIsAddMenuItemOpen] = useState(false);
  const [foodType, setFoodType] = useState("non-veg");
  const [newCategory, setNewCategory] = useState('');
  const [isNewCategoryOpen, setIsNewCategoryOpen] = useState(false);

  useEffect(() => {
    const foundRestaurant = mockRestaurants.find(r => r.id === id);
    if (foundRestaurant) {
      setRestaurant(foundRestaurant);
    }
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <AdminLayout title="Loading...">
        <div className="flex justify-center items-center h-64">
          <p>Loading restaurant details...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!restaurant) {
    return (
      <AdminLayout title="Not Found">
        <div className="flex flex-col justify-center items-center h-64">
          <p className="text-lg mb-4">Restaurant not found</p>
          <Button onClick={() => navigate('/admin/restaurants')}>
            Back to Restaurants
          </Button>
        </div>
      </AdminLayout>
    );
  }

  const handleRestaurantInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };

  const handleSaveRestaurant = () => {
    toast({
      title: "Changes Saved",
      description: "Restaurant information has been updated successfully."
    });
  };

  const handleAddMenuItem = () => {
    if (!restaurant) return;
    
    let itemVeg = false;
    if (foodType === "veg") {
      itemVeg = true;
    }
    
    const newItem: MenuItem = {
      id: `item-${Date.now()}`,
      name: newMenuItem.name || 'New Item',
      description: newMenuItem.description || 'No description',
      price: newMenuItem.price || 0,
      category: newMenuItem.category || 'Other',
      veg: itemVeg,
    };
    
    const updatedRestaurant = {
      ...restaurant,
      menu: [...restaurant.menu, newItem]
    };
    
    setRestaurant(updatedRestaurant);
    setNewMenuItem({
      name: '',
      description: '',
      price: 0,
      category: '',
      veg: false,
    });
    setFoodType("non-veg");
    
    setIsAddMenuItemOpen(false);
    
    toast({
      title: "Menu Item Added",
      description: `${newItem.name} has been added to the menu.`
    });
  };

  const handleDeleteMenuItem = (itemId: string) => {
    if (!restaurant) return;
    
    const updatedMenu = restaurant.menu.filter(item => item.id !== itemId);
    setRestaurant({
      ...restaurant,
      menu: updatedMenu
    });
    
    toast({
      title: "Menu Item Deleted",
      description: "The menu item has been removed."
    });
  };

  const handleAddNewCategory = () => {
    if (!newCategory.trim()) return;
    
    setNewMenuItem({
      ...newMenuItem,
      category: newCategory.trim()
    });
    
    setNewCategory('');
    setIsNewCategoryOpen(false);
  };

  const categories = Array.from(new Set(restaurant.menu.map(item => item.category)));

  return (
    <AdminLayout title={`Edit Restaurant: ${restaurant.name}`}>
      <div className="mb-6">
        <Button onClick={() => navigate('/admin/restaurants')} variant="outline" className="mb-4">
          Back to Restaurants
        </Button>
      </div>
      
      <Tabs defaultValue="info">
        <TabsList className="mb-4">
          <TabsTrigger value="info">Restaurant Info</TabsTrigger>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update the restaurant's basic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Restaurant Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={restaurant.name}
                    onChange={handleRestaurantInfoChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="priceRange">Price Range</Label>
                  <Input
                    id="priceRange"
                    name="priceRange"
                    value={restaurant.priceRange}
                    onChange={handleRestaurantInfoChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={restaurant.address}
                    onChange={handleRestaurantInfoChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deliveryTime">Delivery Time</Label>
                  <Input
                    id="deliveryTime"
                    name="deliveryTime"
                    value={restaurant.deliveryTime}
                    onChange={handleRestaurantInfoChange}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    value={restaurant.description}
                    onChange={handleRestaurantInfoChange}
                  />
                </div>
              </div>
              
              <Button onClick={handleSaveRestaurant} className="mt-4">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="menu">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Menu Items</CardTitle>
                  <CardDescription>Manage the restaurant's menu</CardDescription>
                </div>
                <Dialog open={isAddMenuItemOpen} onOpenChange={setIsAddMenuItemOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Menu Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Menu Item</DialogTitle>
                      <DialogDescription>
                        Fill in the details to add a new item to the menu.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="item-name">Item Name</Label>
                        <Input
                          id="item-name"
                          value={newMenuItem.name}
                          onChange={(e) => setNewMenuItem({...newMenuItem, name: e.target.value})}
                          placeholder="Enter item name"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="item-desc">Description</Label>
                        <Input
                          id="item-desc"
                          value={newMenuItem.description}
                          onChange={(e) => setNewMenuItem({...newMenuItem, description: e.target.value})}
                          placeholder="Enter item description"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="item-price">Price</Label>
                          <Input
                            id="item-price"
                            type="number"
                            value={newMenuItem.price}
                            onChange={(e) => setNewMenuItem({...newMenuItem, price: parseFloat(e.target.value)})}
                            placeholder="0.00"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="item-category">Category</Label>
                          {isNewCategoryOpen ? (
                            <div className="flex space-x-2">
                              <Input
                                id="new-category"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                placeholder="New category name"
                                className="flex-1"
                              />
                              <Button 
                                size="sm" 
                                onClick={handleAddNewCategory}
                                disabled={!newCategory.trim()}
                              >
                                Add
                              </Button>
                            </div>
                          ) : (
                            <Select
                              value={newMenuItem.category}
                              onValueChange={(value) => {
                                if (value === "other") {
                                  setIsNewCategoryOpen(true);
                                } else {
                                  setNewMenuItem({...newMenuItem, category: value});
                                }
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map(category => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                                <SelectItem value="other">Other (Create new)</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label>Food Type</Label>
                        <RadioGroup 
                          value={foodType} 
                          onValueChange={setFoodType}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="veg" id="veg" />
                            <Label htmlFor="veg" className="flex items-center">
                              <Salad className="mr-2 h-4 w-4 text-green-500" />
                              Vegetarian
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="egg" id="egg" />
                            <Label htmlFor="egg" className="flex items-center">
                              <Egg className="mr-2 h-4 w-4 text-yellow-500" />
                              Egg
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="non-veg" id="non-veg" />
                            <Label htmlFor="non-veg" className="flex items-center">
                              <Drumstick className="mr-2 h-4 w-4 text-red-500" />
                              Non-Veg
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => {
                        setIsAddMenuItemOpen(false);
                        setIsNewCategoryOpen(false);
                        setNewCategory('');
                      }}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddMenuItem} disabled={!newMenuItem.name}>Add Item</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {categories.map(category => (
                <div key={category} className="mb-6">
                  <h3 className="text-lg font-medium mb-3">{category}</h3>
                  <div className="rounded-md border">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {restaurant.menu
                          .filter(item => item.category === category)
                          .map((item) => (
                            <tr key={item.id}>
                              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                              <td className="px-6 py-4">{item.description}</td>
                              <td className="px-6 py-4 whitespace-nowrap">${item.price.toFixed(2)}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {item.veg ? (
                                  <span className="flex items-center">
                                    <Salad className="mr-2 h-4 w-4 text-green-500" />
                                    Vegetarian
                                  </span>
                                ) : (
                                  <span className="flex items-center">
                                    <Drumstick className="mr-2 h-4 w-4 text-red-500" />
                                    Non-Veg
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteMenuItem(item.id)}
                                  className="text-destructive hover:bg-destructive hover:text-white"
                                >
                                  <Trash className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
              
              {restaurant.menu.length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No menu items found. Add your first menu item!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
              <CardDescription>Manage customer reviews</CardDescription>
            </CardHeader>
            <CardContent>
              {restaurant.reviews.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No reviews yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {restaurant.reviews.map((review) => (
                    <div key={review.id} className="p-4 border rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 mr-3">
                            {review.userImage ? (
                              <img src={review.userImage} alt={review.user} className="h-10 w-10 rounded-full object-cover" />
                            ) : null}
                          </div>
                          <div>
                            <h4 className="font-semibold">{review.user}</h4>
                            <div className="flex items-center">
                              <span className="text-amber-500">{review.rating} ★</span>
                              <span className="text-gray-500 text-sm ml-2">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:bg-destructive hover:text-white"
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminRestaurantEdit;
