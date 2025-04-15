
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { getBooksByCategory } from '@/data/books';
import BookCard from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CategoryDetail = () => {
  const { category } = useParams<{ category: string }>();
  
  const books = category ? getBooksByCategory(category) : [];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/categories" className="inline-flex items-center text-bookstore-primary hover:text-bookstore-primary/90 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Categories
        </Link>
        
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">{category || 'Category'}</h1>
        <p className="text-gray-600 mb-8">{books.length} {books.length === 1 ? 'book' : 'books'} in this category</p>
        
        {books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">No books found in this category</h2>
            <Link to="/books">
              <Button className="mt-4">Browse All Books</Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryDetail;
