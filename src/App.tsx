
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext"; // Fixed import path
import { AddressProvider } from "@/contexts/AddressContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RestaurantDetail from "./pages/RestaurantDetail";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyAccount from "./pages/MyAccount";
import Settings from "./pages/Settings";
import WhoWeAre from "./pages/WhoWeAre";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRestaurants from "./pages/admin/AdminRestaurants";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminRestaurantEdit from "./pages/admin/AdminRestaurantEdit";
import AdminUserDetail from "./pages/admin/AdminUserDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <AddressProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/restaurant/:id" element={<RestaurantDetail />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<MyAccount />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/who-we-are" element={<WhoWeAre />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/blog" element={<Blog />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/restaurants" element={<AdminRestaurants />} />
                <Route path="/admin/restaurants/:id" element={<AdminRestaurantEdit />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/users/:id" element={<AdminUserDetail />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AddressProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
