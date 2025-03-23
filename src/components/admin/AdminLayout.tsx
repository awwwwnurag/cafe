
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Store, Users, ShoppingCart, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const location = useLocation();
  
  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Restaurants', path: '/admin/restaurants', icon: Store },
    { label: 'Users', path: '/admin/users', icon: Users },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingCart },
  ];
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Admin Portal</h2>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>
                    <Button 
                      variant={location.pathname === item.path ? "default" : "ghost"} 
                      className={cn("w-full justify-start", 
                        location.pathname === item.path ? "bg-primary" : ""
                      )}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                </li>
              ))}
              <li className="pt-4 mt-4 border-t">
                <Link to="/">
                  <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50">
                    <LogOut className="mr-2 h-4 w-4" />
                    Back to site
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <header className="bg-white shadow-sm p-4 border-b">
            <h1 className="text-2xl font-bold">{title}</h1>
          </header>
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
