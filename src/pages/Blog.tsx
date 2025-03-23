
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';

const blogPosts = [
  {
    id: 1,
    title: "10 Must-Try Italian Restaurants in the City",
    excerpt: "Discover the best places to enjoy authentic Italian cuisine, from rustic trattorias to upscale dining.",
    author: "Maria Rodriguez",
    date: "June 15, 2023",
    image: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    category: "Cuisine Spotlight"
  },
  {
    id: 2,
    title: "Behind the Scenes: How Your Favorite Dishes Are Made",
    excerpt: "We visited top restaurants to bring you insights into the techniques and secrets behind signature dishes.",
    author: "James Chen",
    date: "May 22, 2023",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    category: "Restaurant Stories"
  },
  {
    id: 3,
    title: "The Rise of Plant-Based Dining: More Than Just a Trend",
    excerpt: "Explore how plant-based restaurants are revolutionizing the dining scene with innovative approaches to vegan cuisine.",
    author: "Samantha Lee",
    date: "April 10, 2023",
    image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    category: "Food Trends"
  },
  {
    id: 4,
    title: "Seasonal Eating: Why You Should Follow Nature's Calendar",
    excerpt: "Learn why eating seasonally isn't just good for the environment but also for your taste buds and health.",
    author: "Daniel Johnson",
    date: "March 5, 2023",
    image: "https://images.unsplash.com/photo-1458130173613-15b0e9a3c391?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    category: "Food & Health"
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-2">Our Blog</h1>
        <p className="text-gray-600 mb-8">Latest stories, tips, and guides from the world of food</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <Badge className="mb-2">{post.category}</Badge>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4 text-sm">{post.excerpt}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;
