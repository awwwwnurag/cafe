import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=₹{encodeURIComponent(query.trim())}`);
      if (onSearch) onSearch();
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for restaurants, cuisines..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pr-12 pl-4 py-2 rounded-md border border-gray-300 focus:border-zomato-500 focus:ring-1 focus:ring-zomato-500 text-gray-900 bg-white placeholder:text-sm"
        />
        <Button 
          type="submit" 
          className="absolute right-0 top-0 h-full px-3 bg-zomato-500 hover:bg-zomato-600 text-white rounded-r-md"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
