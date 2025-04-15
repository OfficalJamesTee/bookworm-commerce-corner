
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-bookstore-accent py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-bookstore-dark mb-6">
            Discover Your Next Favorite Book
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Explore our curated collection of bestsellers, classics, and hidden gems. Find the perfect story to transport you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/books">
              <Button size="lg" className="bg-bookstore-primary hover:bg-bookstore-primary/90 text-lg">
                Browse Books
              </Button>
            </Link>
            <Link to="/categories">
              <Button size="lg" variant="outline" className="border-bookstore-primary text-bookstore-primary hover:bg-bookstore-primary/10 text-lg">
                Explore Categories
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative element - floating books */}
      <div className="absolute -left-16 -top-16 w-32 h-32 bg-bookstore-secondary opacity-20 rounded-full"></div>
      <div className="absolute right-10 bottom-10 w-40 h-40 bg-bookstore-secondary opacity-20 rounded-full"></div>
      <div className="absolute right-32 top-10 w-24 h-24 bg-bookstore-primary opacity-10 rounded-full"></div>
    </div>
  );
};

export default Hero;
