
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import { Plus, Search, Edit, Trash } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Restaurant } from '@/types';
import { restaurants as mockRestaurants } from '@/data/restaurants';

const AdminRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants);
  const [searchQuery, setSearchQuery] = useState('');
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    cuisines: [],
    address: '',
    description: ''
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredRestaurants = restaurants.filter(
    restaurant => restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddRestaurant = () => {
    // In a real app, this would make an API call
    const id = `${restaurants.length + 1}`;
    
    const restaurant: Restaurant = {
      id,
      name: newRestaurant.name,
      cuisines: newRestaurant.cuisines.length > 0 ? newRestaurant.cuisines : ['Fast Food'],
      address: newRestaurant.address,
      description: newRestaurant.description,
      rating: 0,
      reviewCount: 0,
      priceRange: '$',
      distance: '1.5 mi',
      deliveryTime: '30-45 min',
      images: ['/placeholder.svg'],
      promoted: false,
      veg: false,
      latitude: 0,
      longitude: 0,
      menu: [],
      reviews: []
    };
    
    setRestaurants([...restaurants, restaurant]);
    setNewRestaurant({ name: '', cuisines: [], address: '', description: '' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Restaurant Added",
      description: `${restaurant.name} has been added successfully.`
    });
  };

  const handleDeleteRestaurant = (id: string) => {
    // In a real app, this would make an API call
    const updatedRestaurants = restaurants.filter(restaurant => restaurant.id !== id);
    setRestaurants(updatedRestaurants);
    
    toast({
      title: "Restaurant Deleted",
      description: "The restaurant has been deleted successfully."
    });
  };

  return (
    <AdminLayout title="Manage Restaurants">
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Restaurants</CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Restaurant
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Restaurant</DialogTitle>
                  <DialogDescription>
                    Fill in the details to add a new restaurant to the platform.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Restaurant Name</Label>
                    <Input
                      id="name"
                      value={newRestaurant.name}
                      onChange={(e) => setNewRestaurant({...newRestaurant, name: e.target.value})}
                      placeholder="Enter restaurant name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cuisines">Cuisines (comma separated)</Label>
                    <Input
                      id="cuisines"
                      placeholder="Italian, Chinese, etc."
                      onChange={(e) => setNewRestaurant({
                        ...newRestaurant,
                        cuisines: e.target.value.split(',').map(c => c.trim())
                      })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={newRestaurant.address}
                      onChange={(e) => setNewRestaurant({...newRestaurant, address: e.target.value})}
                      placeholder="Enter full address"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newRestaurant.description}
                      onChange={(e) => setNewRestaurant({...newRestaurant, description: e.target.value})}
                      placeholder="Short description of the restaurant"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddRestaurant} disabled={!newRestaurant.name}>Add Restaurant</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Cuisines</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Price Range</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRestaurants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No restaurants found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRestaurants.map((restaurant) => (
                    <TableRow key={restaurant.id}>
                      <TableCell className="font-medium">{restaurant.name}</TableCell>
                      <TableCell>{restaurant.cuisines.join(', ')}</TableCell>
                      <TableCell>{restaurant.rating} ★ ({restaurant.reviewCount})</TableCell>
                      <TableCell>{restaurant.priceRange}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link to={`/admin/restaurants/${restaurant.id}`}>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteRestaurant(restaurant.id)}
                            className="text-destructive hover:bg-destructive hover:text-white"
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminRestaurants;
