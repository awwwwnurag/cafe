
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import { 
  Search, Eye, Package, Check, Truck, CheckCircle
} from 'lucide-react';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

// Mock orders data - in a real app this would come from an API
const mockOrders = [
  { 
    id: 'ORD-001', 
    customer: 'John Doe', 
    restaurant: 'Pizza Palace', 
    date: '2023-06-10', 
    total: 42.95,
    status: 'Pending',
    items: [
      { name: 'Pepperoni Pizza', quantity: 1, price: 18.95 },
      { name: 'Garlic Bread', quantity: 1, price: 4.50 },
      { name: 'Cheese Sticks', quantity: 1, price: 6.50 },
      { name: 'Soda', quantity: 2, price: 6.50 }
    ]
  },
  { 
    id: 'ORD-002', 
    customer: 'Jane Smith', 
    restaurant: 'Burger Joint', 
    date: '2023-06-10', 
    total: 27.50,
    status: 'Accepted',
    items: [
      { name: 'Cheeseburger', quantity: 2, price: 11.90 },
      { name: 'Fries', quantity: 1, price: 3.50 },
      { name: 'Milkshake', quantity: 1, price: 5.95 }
    ]
  },
  { 
    id: 'ORD-003', 
    customer: 'Michael Johnson', 
    restaurant: 'Taco Express', 
    date: '2023-06-09', 
    total: 35.75,
    status: 'Prepared',
    items: [
      { name: 'Taco Combo', quantity: 1, price: 14.95 },
      { name: 'Nachos', quantity: 1, price: 8.95 },
      { name: 'Burrito', quantity: 1, price: 9.95 }
    ]
  },
  { 
    id: 'ORD-004', 
    customer: 'Emily Davis', 
    restaurant: 'Sushi Palace', 
    date: '2023-06-09', 
    total: 56.80,
    status: 'Out for Delivery',
    items: [
      { name: 'California Roll', quantity: 2, price: 23.90 },
      { name: 'Miso Soup', quantity: 2, price: 7.90 },
      { name: 'Edamame', quantity: 1, price: 5.95 },
      { name: 'Green Tea', quantity: 2, price: 5.90 }
    ]
  },
  { 
    id: 'ORD-005', 
    customer: 'Robert Wilson', 
    restaurant: 'Italian Bistro', 
    date: '2023-06-08', 
    total: 63.25,
    status: 'Delivered',
    items: [
      { name: 'Spaghetti Carbonara', quantity: 1, price: 16.95 },
      { name: 'Margherita Pizza', quantity: 1, price: 14.95 },
      { name: 'Tiramisu', quantity: 1, price: 8.95 },
      { name: 'Bottle of Wine', quantity: 1, price: 22.50 }
    ]
  }
];

const AdminOrders = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);
  const [viewOrderOpen, setViewOrderOpen] = useState(false);

  const filteredOrders = orders
    .filter(order => 
      (order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
       order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
       order.restaurant.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === 'all' || order.status === statusFilter)
    );

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    
    // If we're updating the currently selected order, update that too
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const getStatusBadgeColors = (status: string) => {
    switch(status) {
      case 'Pending': return 'bg-amber-500';
      case 'Accepted': return 'bg-blue-500';
      case 'Prepared': return 'bg-purple-500';
      case 'Out for Delivery': return 'bg-indigo-500';
      case 'Delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getNextStatus = (currentStatus: string) => {
    const statusFlow = [
      'Pending', 'Accepted', 'Prepared', 'Out for Delivery', 'Delivered'
    ];
    const currentIndex = statusFlow.indexOf(currentStatus);
    return currentIndex < statusFlow.length - 1 ? statusFlow[currentIndex + 1] : null;
  };

  return (
    <AdminLayout title="Manage Orders">
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
            <div className="flex items-center w-full md:w-auto">
              <Search className="mr-2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            <Select 
              value={statusFilter} 
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Accepted">Accepted</SelectItem>
                <SelectItem value="Prepared">Prepared</SelectItem>
                <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Restaurant</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      No orders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.restaurant}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColors(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedOrder(order);
                              setViewOrderOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          
                          {getNextStatus(order.status) && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateStatus(order.id, getNextStatus(order.status)!)}
                            >
                              {order.status === 'Pending' && <Check className="h-4 w-4" />}
                              {order.status === 'Accepted' && <Package className="h-4 w-4" />}
                              {order.status === 'Prepared' && <Truck className="h-4 w-4" />}
                              {order.status === 'Out for Delivery' && <CheckCircle className="h-4 w-4" />}
                              <span className="sr-only">Update Status</span>
                            </Button>
                          )}
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
      
      <Dialog open={viewOrderOpen} onOpenChange={setViewOrderOpen}>
        <DialogContent className="max-w-3xl">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle>Order Details - {selectedOrder.id}</DialogTitle>
                <DialogDescription>
                  Placed on {selectedOrder.date} by {selectedOrder.customer}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-2 gap-4 py-4">
                <div>
                  <h4 className="font-medium text-sm mb-1">Customer</h4>
                  <p>{selectedOrder.customer}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Restaurant</h4>
                  <p>{selectedOrder.restaurant}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Total</h4>
                  <p>${selectedOrder.total.toFixed(2)}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Status</h4>
                  <Badge className={getStatusBadgeColors(selectedOrder.status)}>
                    {selectedOrder.status}
                  </Badge>
                </div>
              </div>
              
              <div className="border rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4">{item.name}</td>
                        <td className="px-6 py-4">{item.quantity}</td>
                        <td className="px-6 py-4">${(item.price / item.quantity).toFixed(2)}</td>
                        <td className="px-6 py-4">${item.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={3} className="px-6 py-3 text-right font-medium">Grand Total:</td>
                      <td className="px-6 py-3 font-bold">${selectedOrder.total.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              <DialogFooter className="flex justify-between items-center">
                <div>
                  {getNextStatus(selectedOrder.status) && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Update Status:</span>
                      <Button 
                        onClick={() => handleUpdateStatus(selectedOrder.id, getNextStatus(selectedOrder.status)!)}
                      >
                        {selectedOrder.status === 'Pending' && <>Accept Order</>}
                        {selectedOrder.status === 'Accepted' && <>Mark as Prepared</>}
                        {selectedOrder.status === 'Prepared' && <>Out for Delivery</>}
                        {selectedOrder.status === 'Out for Delivery' && <>Mark as Delivered</>}
                      </Button>
                    </div>
                  )}
                </div>
                <Button variant="outline" onClick={() => setViewOrderOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrders;
