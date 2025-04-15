
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCart();
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>
          
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-6">
              <ShoppingCart className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet</p>
            <Link to="/books">
              <Button className="bg-bookstore-primary hover:bg-bookstore-primary/90">
                Browse Books
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-serif text-xl font-medium">
                    {getTotalItems()} {getTotalItems() === 1 ? 'Item' : 'Items'}
                  </h2>
                  <Button 
                    variant="ghost" 
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={clearCart}
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Clear Cart
                  </Button>
                </div>
                
                {items.map(item => (
                  <div key={item.book.id} className="mb-6 animate-fade-in cart-item">
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-24 h-32 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0">
                        <img 
                          src={item.book.coverImage} 
                          alt={item.book.title} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      
                      <div className="flex-grow sm:ml-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <Link to={`/book/${item.book.id}`}>
                              <h3 className="font-serif text-lg font-medium hover:text-bookstore-primary">
                                {item.book.title}
                              </h3>
                            </Link>
                            <p className="text-gray-600 text-sm mb-2">{item.book.author}</p>
                          </div>
                          <p className="font-bold text-lg text-bookstore-primary mb-4 sm:mb-0">
                            ${(item.book.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2">
                          <div className="flex items-center mb-4 sm:mb-0">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.book.id, parseInt(e.target.value) || 1)}
                              className="w-14 mx-2 text-center"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeFromCart(item.book.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" /> Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {items.indexOf(item) < items.length - 1 && (
                      <Separator className="mt-6" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-4">
              <h2 className="font-serif text-xl font-medium mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(getTotalPrice() * 0.1).toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${(getTotalPrice() * 1.1).toFixed(2)}</span>
                </div>
              </div>
              
              <Link to="/checkout">
                <Button className="w-full bg-bookstore-primary hover:bg-bookstore-primary/90">
                  Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Shipping and taxes calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
