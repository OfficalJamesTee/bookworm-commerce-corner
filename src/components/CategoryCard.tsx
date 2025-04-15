
import React from 'react';
import { Link } from 'react-router-dom';
import { getBooksByCategory } from '@/data/books';
import { Card, CardContent } from '@/components/ui/card';

interface CategoryCardProps {
  category: string;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const booksInCategory = getBooksByCategory(category);
  
  return (
    <Link to={`/category/${category}`}>
      <Card className="h-full hover:border-bookstore-primary transition-colors cursor-pointer">
        <CardContent className="flex flex-col items-center justify-center text-center p-6">
          <h3 className="font-serif text-xl font-bold mb-2">{category}</h3>
          <p className="text-gray-600 text-sm">{booksInCategory.length} {booksInCategory.length === 1 ? 'book' : 'books'}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
