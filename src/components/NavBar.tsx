
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems } = useCart();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, navigate to search results
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-bookstore-primary" />
            <span className="font-serif text-2xl font-bold text-bookstore-dark">Bookworm</span>
          </Link>

          {/* Search - hidden on mobile */}
          <div className="hidden md:block flex-grow max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search books..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-bookstore-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/books" className="text-bookstore-dark hover:text-bookstore-primary transition-colors">
              Books
            </Link>
            <Link to="/categories" className="text-bookstore-dark hover:text-bookstore-primary transition-colors">
              Categories
            </Link>
            <Link to="/cart" className="relative">
              <Button variant="ghost" className="p-2">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-bookstore-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-1">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-bookstore-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            <Button variant="ghost" onClick={toggleMenu} className="p-2">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-3 border-t border-gray-200 pt-3">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search books..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-bookstore-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
            <div className="flex flex-col space-y-2">
              <Link 
                to="/books" 
                className="px-3 py-2 text-bookstore-dark hover:text-bookstore-primary rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Books
              </Link>
              <Link 
                to="/categories" 
                className="px-3 py-2 text-bookstore-dark hover:text-bookstore-primary rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
