
import { Book } from "../types/book";

export const books: Book[] = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 24.99,
    coverImage: "/book-covers/midnight-library.jpg",
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices.",
    isbn: "9780525559474",
    publisher: "Viking",
    publishedDate: "2020-09-29",
    pageCount: 304,
    categories: ["Fiction", "Fantasy", "Contemporary"],
    rating: 4.5,
    inStock: true,
    featured: true
  },
  {
    id: "2",
    title: "Educated",
    author: "Tara Westover",
    price: 19.99,
    coverImage: "/book-covers/educated.jpg",
    description: "An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
    isbn: "9780399590504",
    publisher: "Random House",
    publishedDate: "2018-02-20",
    pageCount: 352,
    categories: ["Memoir", "Biography", "Nonfiction"],
    rating: 4.7,
    inStock: true,
    featured: true
  },
  {
    id: "3",
    title: "Atomic Habits",
    author: "James Clear",
    price: 18.99,
    coverImage: "/book-covers/atomic-habits.jpg",
    description: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    isbn: "9780735211292",
    publisher: "Avery",
    publishedDate: "2018-10-16",
    pageCount: 320,
    categories: ["Self-Help", "Personal Development", "Nonfiction"],
    rating: 4.8,
    inStock: true,
    featured: true
  },
  {
    id: "4",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    price: 22.99,
    coverImage: "/book-covers/crawdads.jpg",
    description: "For years, rumors of the 'Marsh Girl' have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl.",
    isbn: "9780735219090",
    publisher: "G.P. Putnam's Sons",
    publishedDate: "2018-08-14",
    pageCount: 384,
    categories: ["Fiction", "Mystery", "Literary Fiction"],
    rating: 4.6,
    inStock: true
  },
  {
    id: "5",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 17.99,
    coverImage: "/book-covers/silent-patient.jpg",
    description: "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London's most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.",
    isbn: "9781250301697",
    publisher: "Celadon Books",
    publishedDate: "2019-02-05",
    pageCount: 336,
    categories: ["Thriller", "Mystery", "Psychological Fiction"],
    rating: 4.3,
    inStock: true
  },
  {
    id: "6",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 14.99,
    coverImage: "/book-covers/mockingbird.jpg",
    description: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. 'To Kill a Mockingbird' became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film.",
    isbn: "9780061120084",
    publisher: "Harper Perennial",
    publishedDate: "1960-07-11",
    pageCount: 336,
    categories: ["Classic", "Fiction", "Historical Fiction"],
    rating: 4.9,
    inStock: true
  },
  {
    id: "7",
    title: "Becoming",
    author: "Michelle Obama",
    price: 26.99,
    coverImage: "/book-covers/becoming.jpg",
    description: "In her memoir, a work of deep reflection and mesmerizing storytelling, Michelle Obama invites readers into her world, chronicling the experiences that have shaped her—from her childhood on the South Side of Chicago to her years as an executive balancing the demands of motherhood and work, to her time spent at the world's most famous address.",
    isbn: "9781524763138",
    publisher: "Crown",
    publishedDate: "2018-11-13",
    pageCount: 448,
    categories: ["Memoir", "Biography", "Autobiography"],
    rating: 4.8,
    inStock: true
  },
  {
    id: "8",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 12.99,
    coverImage: "/book-covers/gatsby.jpg",
    description: "The Great Gatsby, F. Scott Fitzgerald's third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers.",
    isbn: "9780743273565",
    publisher: "Scribner",
    publishedDate: "1925-04-10",
    pageCount: 180,
    categories: ["Classic", "Fiction", "Literary Fiction"],
    rating: 4.4,
    inStock: true
  }
];

export const getBookById = (id: string): Book | undefined => {
  return books.find(book => book.id === id);
};

export const getFeaturedBooks = (): Book[] => {
  return books.filter(book => book.featured);
};

export const getBookCategories = (): string[] => {
  const categoriesSet = new Set<string>();
  books.forEach(book => {
    book.categories.forEach(category => {
      categoriesSet.add(category);
    });
  });
  return Array.from(categoriesSet);
};

export const getBooksByCategory = (category: string): Book[] => {
  return books.filter(book => book.categories.includes(category));
};
