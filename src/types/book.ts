
export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  description: string;
  isbn: string;
  publisher: string;
  publishedDate: string;
  pageCount: number;
  categories: string[];
  rating: number;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  book: Book;
  quantity: number;
}
