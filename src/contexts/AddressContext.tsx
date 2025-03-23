import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Address {
  id: string;
  title: string;
  fullAddress: string;
  isDefault: boolean;
}

interface AddressContextType {
  addresses: Address[];
  selectedAddress: Address | null;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  selectAddress: (id: string) => void;
  updateAddress: (id: string, updatedAddress: Address) => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

// Sample addresses for demo purposes
const SAMPLE_ADDRESSES: Address[] = [
  {
    id: '1',
    title: 'Home',
    fullAddress: '123 Main Street, Apartment 4B, New York, NY 10001',
    isDefault: true
  },
  {
    id: '2',
    title: 'Work',
    fullAddress: '50 Broadway, Floor 10, New York, NY 10004',
    isDefault: false
  }
];

export const AddressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  // Load addresses from localStorage on mount
  useEffect(() => {
    const savedAddresses = localStorage.getItem('savedAddresses');
    if (savedAddresses) {
      try {
        const parsedAddresses = JSON.parse(savedAddresses);
        setAddresses(parsedAddresses);
        
        // Set the default address as selected
        const defaultAddress = parsedAddresses.find((addr: Address) => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
        } else if (parsedAddresses.length > 0) {
          setSelectedAddress(parsedAddresses[0]);
        }
      } catch (e) {
        console.error('Failed to parse addresses:', e);
        setAddresses(SAMPLE_ADDRESSES);
        setSelectedAddress(SAMPLE_ADDRESSES[0]);
      }
    } else {
      // Use sample addresses if none exist
      setAddresses(SAMPLE_ADDRESSES);
      setSelectedAddress(SAMPLE_ADDRESSES[0]);
    }
  }, []);

  // Save addresses to localStorage when they change
  useEffect(() => {
    localStorage.setItem('savedAddresses', JSON.stringify(addresses));
  }, [addresses]);

  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...address,
      id: Math.random().toString(36).substring(2, 9)
    };

    // If this is the first address or marked as default, update other addresses
    if (address.isDefault || addresses.length === 0) {
      setAddresses(prevAddresses => {
        const updatedAddresses = prevAddresses.map(addr => ({
          ...addr,
          isDefault: false
        }));
        return [...updatedAddresses, newAddress];
      });
    } else {
      setAddresses(prevAddresses => [...prevAddresses, newAddress]);
    }

    // If this is the first address or it's set as default, select it
    if (addresses.length === 0 || address.isDefault) {
      setSelectedAddress(newAddress);
    }
  };

  const updateAddress = (id: string, updatedAddress: Address) => {
    setAddresses(prevAddresses => {
      // If the updated address is set as default, remove default from others
      if (updatedAddress.isDefault) {
        return prevAddresses.map(addr => 
          addr.id === id 
            ? updatedAddress 
            : { ...addr, isDefault: false }
        );
      }

      // Otherwise just update the specified address
      return prevAddresses.map(addr => 
        addr.id === id ? updatedAddress : addr
      );
    });

    // Update selected address if needed
    if (selectedAddress && selectedAddress.id === id) {
      setSelectedAddress(updatedAddress);
    }
    
    // If this address is now default, select it
    if (updatedAddress.isDefault) {
      setSelectedAddress(updatedAddress);
    }
  };

  const removeAddress = (id: string) => {
    setAddresses(prevAddresses => {
      const updatedAddresses = prevAddresses.filter(addr => addr.id !== id);
      
      // If we removed the selected address, select another one
      if (selectedAddress && selectedAddress.id === id) {
        const defaultAddr = updatedAddresses.find(addr => addr.isDefault);
        if (defaultAddr) {
          setSelectedAddress(defaultAddr);
        } else if (updatedAddresses.length > 0) {
          setSelectedAddress(updatedAddresses[0]);
        } else {
          setSelectedAddress(null);
        }
      }

      // If we removed the default address and have others, make the first one default
      if (prevAddresses.find(addr => addr.id === id && addr.isDefault) && updatedAddresses.length > 0) {
        return updatedAddresses.map((addr, index) => 
          index === 0 ? { ...addr, isDefault: true } : addr
        );
      }
      
      return updatedAddresses;
    });
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(prevAddresses => 
      prevAddresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    );
    
    // Also select this address
    const newSelectedAddress = addresses.find(addr => addr.id === id) || null;
    setSelectedAddress(newSelectedAddress);
  };

  const selectAddress = (id: string) => {
    const selected = addresses.find(addr => addr.id === id) || null;
    setSelectedAddress(selected);
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        selectedAddress,
        addAddress,
        removeAddress,
        setDefaultAddress,
        selectAddress,
        updateAddress
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
};
