
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { books } from '@/data/books';
import BookCard from '@/components/BookCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const BooksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [filterCategories, setFilterCategories] = useState<string[]>([]);
  
  // Get all unique categories
  const allCategories = Array.from(
    new Set(books.flatMap(book => book.categories))
  ).sort();
  
  // Handle category filter toggle
  const toggleCategory = (category: string) => {
    setFilterCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  // Filter books based on search query and categories
  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      filterCategories.length === 0 || 
      book.categories.some(category => filterCategories.includes(category));
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort filtered books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">All Books</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="font-serif text-xl font-medium mb-4">Filters</h2>
              
              <div className="mb-6">
                <Input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-4"
                />
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3">Sort By</h3>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Title (A-Z)</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2 max-h-60 overflow-auto pr-2">
                  {allCategories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-${category}`} 
                        checked={filterCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label
                        htmlFor={`category-${category}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {(searchQuery || filterCategories.length > 0) && (
                <Button 
                  variant="outline" 
                  className="w-full mt-6"
                  onClick={() => {
                    setSearchQuery('');
                    setFilterCategories([]);
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:w-3/4">
            {sortedBooks.length > 0 ? (
              <>
                <p className="text-gray-600 mb-6">{sortedBooks.length} books found</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {sortedBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No books found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BooksPage;
