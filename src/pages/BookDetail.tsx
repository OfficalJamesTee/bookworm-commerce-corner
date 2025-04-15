
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { getBookById } from '@/data/books';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const book = id ? getBookById(id) : undefined;
  
  if (!book) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Book Not Found</h1>
          <p className="mb-8">We couldn't find the book you're looking for.</p>
          <Link to="/books">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Books
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(book, 1);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/books" className="inline-flex items-center text-bookstore-primary hover:text-bookstore-primary/90 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Books
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Book cover */}
          <div className="md:col-span-1">
            <div className="bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg aspect-[2/3] relative overflow-hidden shadow-lg">
              <img 
                src={book.coverImage} 
                alt={book.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
          
          {/* Book details */}
          <div className="md:col-span-2">
            <div className="flex flex-wrap gap-2 mb-4">
              {book.categories.map((category) => (
                <Badge key={category} variant="outline" className="bg-bookstore-accent text-bookstore-primary">
                  {category}
                </Badge>
              ))}
            </div>
            
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">{book.title}</h1>
            <h2 className="text-xl text-gray-700 mb-4">by {book.author}</h2>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(book.rating) 
                        ? 'text-yellow-500 fill-yellow-500' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">{book.rating} rating</span>
            </div>
            
            <div className="text-2xl font-bold text-bookstore-primary mb-6">
              ${book.price.toFixed(2)}
            </div>
            
            <div className="space-y-4 mb-8">
              <p className="text-lg">{book.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">Publisher:</span>
                  <span className="ml-2">{book.publisher}</span>
                </div>
                <div>
                  <span className="text-gray-600">Publication Date:</span>
                  <span className="ml-2">{book.publishedDate}</span>
                </div>
                <div>
                  <span className="text-gray-600">ISBN:</span>
                  <span className="ml-2">{book.isbn}</span>
                </div>
                <div>
                  <span className="text-gray-600">Pages:</span>
                  <span className="ml-2">{book.pageCount}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                className="bg-bookstore-primary hover:bg-bookstore-primary/90"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Link to="/cart">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-bookstore-primary text-bookstore-primary hover:bg-bookstore-primary/10"
                >
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <Separator className="my-12" />
        
        {/* Additional book details - could be expanded in a real implementation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-bold mb-4">About this book</h2>
            <p className="text-gray-700">
              {book.description}
              {/* Additional book description would go here */}
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold mb-4">Details</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center justify-between">
                <span>Format:</span>
                <span>Hardcover</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Language:</span>
                <span>English</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Dimensions:</span>
                <span>6 x 0.9 x 9 inches</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Weight:</span>
                <span>1.2 pounds</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookDetail;
