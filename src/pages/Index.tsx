
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import BookGrid from '@/components/BookGrid';
import { getFeaturedBooks } from '@/data/books';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const featuredBooks = getFeaturedBooks();

  return (
    <Layout>
      <Hero />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-serif text-3xl font-bold">Featured Books</h2>
          <Link to="/books">
            <Button variant="ghost" className="text-bookstore-primary hover:text-bookstore-primary/90">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <BookGrid books={featuredBooks} />
        
        {/* Promotional Section */}
        <div className="mt-16 bg-bookstore-accent rounded-lg p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="font-serif text-3xl font-bold mb-4">Join Our Book Club</h2>
              <p className="text-gray-700 mb-6">
                Get exclusive access to author interviews, early releases, and monthly discussions with fellow book lovers.
              </p>
              <Button className="bg-bookstore-primary hover:bg-bookstore-primary/90">
                Sign Up Now
              </Button>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <img 
                src="/book-club.jpg" 
                alt="Book Club" 
                className="rounded-lg shadow-lg max-h-80 mx-auto object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
