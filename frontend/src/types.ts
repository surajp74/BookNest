export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  pages: number;
  publishedYear: number;
  cover: string;
  featured?: boolean;
}

export interface CartItem {
  bookId: string;
  quantity: number;
  book?: Book;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "PLACED" | "PROCESSING" | "SHIPPED";
  createdAt: string;
}
