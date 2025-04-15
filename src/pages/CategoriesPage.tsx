
import React from 'react';
import Layout from '@/components/Layout';
import { getBookCategories } from '@/data/books';
import CategoryCard from '@/components/CategoryCard';

const CategoriesPage = () => {
  const categories = getBookCategories();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Book Categories</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <CategoryCard key={category} category={category} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
