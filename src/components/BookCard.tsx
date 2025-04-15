
import { Book } from '@/types/book';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book, 1);
  };

  return (
    <Link to={`/book/${book.id}`}>
      <Card className="book-card h-full flex flex-col overflow-hidden hover:border-bookstore-primary transition-colors">
        <div className="relative pt-[120%]">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center">
            {/* Placeholder for when image fails to load */}
            <div className="text-gray-400 text-lg font-bold">{book.title}</div>
          </div>
          <img 
            src={book.coverImage} 
            alt={book.title} 
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          {book.featured && (
            <Badge className="absolute top-2 right-2 bg-bookstore-primary" variant="secondary">
              Featured
            </Badge>
          )}
        </div>
        <CardContent className="flex-grow pt-4">
          <h3 className="font-serif font-medium text-lg mb-1 line-clamp-1">{book.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{book.author}</p>
          <div className="flex justify-between items-center">
            <p className="font-bold text-bookstore-primary">${book.price.toFixed(2)}</p>
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500">★</span>
              <span className="text-sm font-medium">{book.rating}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button 
            className="w-full bg-bookstore-primary hover:bg-bookstore-primary/90"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BookCard;
