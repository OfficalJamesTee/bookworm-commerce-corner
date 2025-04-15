
import React from 'react';
import { Book } from '@/types/book';
import BookCard from './BookCard';

interface BookGridProps {
  books: Book[];
  title?: string;
}

const BookGrid = ({ books, title }: BookGridProps) => {
  return (
    <div className="py-6">
      {title && (
        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookGrid;
