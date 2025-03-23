
import React, { useState } from 'react';
import { MapPin, Plus, Home, Briefcase, Edit, Trash2, Navigation } from 'lucide-react';
import { useAddress, Address } from '@/contexts/AddressContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';

interface AddressFormValues {
  title: string;
  customTitle?: string;
  fullAddress: string;
  isDefault: boolean;
}

interface AddressSelectorProps {
  buttonVariant?: "default" | "outline" | "link" | "ghost";
  iconOnly?: boolean;
}

const AddressSelector = ({ buttonVariant = "default", iconOnly = false }: AddressSelectorProps) => {
  const { addresses, selectedAddress, selectAddress, addAddress, removeAddress, setDefaultAddress, updateAddress } = useAddress();
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  
  const form = useForm<AddressFormValues>({
    defaultValues: {
      title: '',
      customTitle: '',
      fullAddress: '',
      isDefault: false
    }
  });

  const onSubmit = (data: AddressFormValues) => {
    // Use customTitle when title is 'Other'
    const finalTitle = data.title === 'Other' && data.customTitle ? data.customTitle : data.title;
    
    if (isEditingAddress && currentAddress) {
      updateAddress(currentAddress.id, {
        ...currentAddress,
        title: finalTitle,
        fullAddress: data.fullAddress,
        isDefault: data.isDefault
      });
      setIsEditingAddress(false);
    } else {
      addAddress({
        title: finalTitle,
        fullAddress: data.fullAddress,
        isDefault: data.isDefault
      });
      setIsAddingAddress(false);
    }
    
    form.reset();
    setCurrentAddress(null);
  };
  
  const handleEditAddress = (address: Address) => {
    setCurrentAddress(address);
    setIsEditingAddress(true);
    
    form.reset({
      title: ['Home', 'Work', 'Other'].includes(address.title) ? address.title : 'Other',
      customTitle: !['Home', 'Work'].includes(address.title) ? address.title : '',
      fullAddress: address.fullAddress,
      isDefault: address.isDefault
    });
  };

  const detectCurrentLocation = () => {
    if (navigator.geolocation) {
      toast({
        title: "Detecting location",
        description: "Please allow location access",
      });
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // In a real app, you would use a reverse geocoding service to get the actual address
          // For this example, we'll just use the coordinates
          const detectedAddress = `Detected location (₹{latitude.toFixed(4)}, ₹{longitude.toFixed(4)})`;
          
          form.setValue('fullAddress', detectedAddress);
          
          toast({
            title: "Location detected",
            description: "Your location has been added to the form",
          });
        },
        (error) => {
          toast({
            title: "Location detection failed",
            description: error.message,
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support location detection",
        variant: "destructive",
      });
    }
  };
  
  const getAddressIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('home')) return <Home className="h-4 w-4" />;
    if (lowerTitle.includes('work') || lowerTitle.includes('office')) return <Briefcase className="h-4 w-4" />;
    return <MapPin className="h-4 w-4" />;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {iconOnly ? (
          <Button variant={buttonVariant} size="icon">
            <MapPin className="h-5 w-5" />
          </Button>
        ) : (
          <Button variant={buttonVariant} className="gap-2">
            <MapPin className="h-4 w-4" />
            {selectedAddress ? (
              <span className="truncate max-w-[150px]">{selectedAddress.title}</span>
            ) : (
              "Select Address"
            )}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-lg font-bold">Delivery Address</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-auto py-4">
          {addresses.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <MapPin className="h-12 w-12 text-gray-300 mb-2" />
              <p className="text-gray-500 mb-4">No saved addresses</p>
              <Button onClick={() => setIsAddingAddress(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Address
              </Button>
            </div>
          ) : (
            <ScrollArea className="h-[400px] pr-4">
              <RadioGroup 
                value={selectedAddress?.id} 
                onValueChange={selectAddress}
                className="space-y-3"
              >
                {addresses.map((address) => (
                  <div key={address.id} className="flex items-start space-x-2 border rounded-lg p-3">
                    <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center">
                        <Label htmlFor={address.id} className="font-medium flex items-center">
                          {getAddressIcon(address.title)}
                          <span className="ml-1">{address.title}</span>
                        </Label>
                        {address.isDefault && (
                          <Badge variant="outline" className="ml-2 text-xs">Default</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{address.fullAddress}</p>
                      <div className="flex mt-2 space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setDefaultAddress(address.id)}
                          disabled={address.isDefault}
                        >
                          Set as Default
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => handleEditAddress(address)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => removeAddress(address.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </ScrollArea>
          )}
          
          <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
            <DialogTrigger asChild>
              <Button className="w-full mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add New Address
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Title</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select address type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Home">Home</SelectItem>
                            <SelectItem value="Work">Work</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {form.watch('title') === 'Other' && (
                    <FormField
                      control={form.control}
                      name="customTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Custom Title</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g. Mom's House, Office, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  
                  <FormField
                    control={form.control}
                    name="fullAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={detectCurrentLocation}
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    Detect Current Location
                  </Button>
                  
                  <FormField
                    control={form.control}
                    name="isDefault"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="h-4 w-4 rounded"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Set as default address</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => {
                      setIsAddingAddress(false);
                      form.reset();
                    }}>
                      Cancel
                    </Button>
                    <Button type="submit">Save Address</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isEditingAddress} onOpenChange={(open) => {
            setIsEditingAddress(open);
            if (!open) {
              form.reset();
              setCurrentAddress(null);
            }
          }}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Address</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Title</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select address type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Home">Home</SelectItem>
                            <SelectItem value="Work">Work</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {form.watch('title') === 'Other' && (
                    <FormField
                      control={form.control}
                      name="customTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Custom Title</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g. Mom's House, Office, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  
                  <FormField
                    control={form.control}
                    name="fullAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={detectCurrentLocation}
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    Detect Current Location
                  </Button>
                  
                  <FormField
                    control={form.control}
                    name="isDefault"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="h-4 w-4 rounded"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Set as default address</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => {
                      setIsEditingAddress(false);
                      form.reset();
                      setCurrentAddress(null);
                    }}>
                      Cancel
                    </Button>
                    <Button type="submit">Update Address</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddressSelector;
