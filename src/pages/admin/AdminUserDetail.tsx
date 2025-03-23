
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Package } from 'lucide-react';

// Mock user data - in a real app this would come from an API
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 (555) 123-4567',
  joinDate: '2023-01-15',
  lastLogin: '2023-06-10 14:30',
  addresses: [
    {
      id: 'addr1',
      label: 'Home',
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      default: true
    },
    {
      id: 'addr2',
      label: 'Work',
      street: '456 Market St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103',
      default: false
    }
  ],
  orders: [
    {
      id: 'order1',
      date: '2023-05-28',
      total: 42.95,
      items: 3,
      status: 'Delivered',
      restaurant: 'Pizza Palace'
    },
    {
      id: 'order2',
      date: '2023-06-05',
      total: 27.50,
      items: 2,
      status: 'Delivered',
      restaurant: 'Burger Joint'
    },
    {
      id: 'order3',
      date: '2023-06-10',
      total: 35.75,
      items: 4,
      status: 'Out for delivery',
      restaurant: 'Taco Express'
    }
  ]
};

const AdminUserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = mockUser; // In a real app, fetch the user with the given ID

  return (
    <AdminLayout title={`User: ${user.name}`}>
      <div className="mb-6">
        <Button onClick={() => navigate('/admin/users')} variant="outline" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Users
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>User Details</CardTitle>
            <CardDescription>Basic information about the user</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h4>
              <p>{user.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Email</h4>
              <p>{user.email}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Phone</h4>
              <p>{user.phone}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Member Since</h4>
              <p>{user.joinDate}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Last Login</h4>
              <p>{user.lastLogin}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Orders</h4>
              <p>{user.orders.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
            <CardDescription>Manage user account status</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <div className="text-center py-4">
              <Badge className="bg-green-500">Active</Badge>
            </div>
            <Button variant="destructive">Deactivate Account</Button>
            <Button variant="outline">Reset Password</Button>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="addresses">
        <TabsList>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="addresses">
          <Card>
            <CardHeader>
              <CardTitle>Saved Addresses</CardTitle>
              <CardDescription>Delivery addresses saved by the user</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {user.addresses.map(address => (
                  <div key={address.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center mb-2">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <h3 className="font-medium">{address.label}</h3>
                        {address.default && (
                          <Badge className="ml-2 bg-blue-500">Default</Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>{address.street}</p>
                      <p>{address.city}, {address.state} {address.zipCode}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>Past orders placed by the user</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {user.orders.map(order => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.restaurant}</td>
                        <td className="px-6 py-4 whitespace-nowrap">${order.total.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={
                            order.status === 'Delivered' ? 'bg-green-500' : 
                            order.status === 'Out for delivery' ? 'bg-blue-500' : 'bg-amber-500'
                          }>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <Button variant="outline" size="sm">
                            <Package className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminUserDetail;
