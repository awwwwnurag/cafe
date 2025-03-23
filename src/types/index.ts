
export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  cuisines: string[];
  address: string;
  distance: string;
  deliveryTime: string;
  images: string[];
  promoted: boolean;
  veg: boolean;
  discount?: string;
  description: string;
  latitude: number;
  longitude: number;
  menu: MenuItem[];
  reviews: Review[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  veg: boolean;
  bestseller?: boolean;
  spicy?: boolean;
  rating?: number;
}

export interface Review {
  id: string;
  user: string;
  userImage: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
  likes: number;
  dislikes: number;
}

export interface SearchFilters {
  cuisines: string[];
  vegOnly: boolean;
  rating: number;
  priceRange: string[];
  distance: string;
}
