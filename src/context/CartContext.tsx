
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Book } from '../types/book';
import { useToast } from '@/components/ui/use-toast';

interface CartItem {
  book: Book;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (book: Book, quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.book.id === book.id);
      
      if (existingItem) {
        toast({
          title: "Item already in cart",
          description: `Quantity of "${book.title}" increased to ${existingItem.quantity + quantity}`,
          duration: 3000,
        });
        
        return prevItems.map(item => 
          item.book.id === book.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        toast({
          title: "Added to cart",
          description: `"${book.title}" has been added to your cart`,
          duration: 3000,
        });
        
        return [...prevItems, { book, quantity }];
      }
    });
  };

  const removeFromCart = (bookId: string) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.book.id === bookId);
      
      if (itemToRemove) {
        toast({
          title: "Item removed",
          description: `"${itemToRemove.book.title}" has been removed from your cart`,
          duration: 3000,
        });
      }
      
      return prevItems.filter(item => item.book.id !== bookId);
    });
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }

    setItems(prevItems => 
      prevItems.map(item => 
        item.book.id === bookId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
      duration: 3000,
    });
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.book.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart, 
        getTotalItems, 
        getTotalPrice 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
