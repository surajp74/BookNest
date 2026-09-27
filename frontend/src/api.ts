import axios from "axios";
import type { Book, CartItem, Order, User } from "./types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("booknest-token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("booknest-token");
      localStorage.removeItem("booknest-user");
    }
    return Promise.reject(error);
  }
);

export type { Book, CartItem, Order, User };

export async function getBooks(params?: { search?: string; category?: string }): Promise<Book[]> {
  const response = await api.get<{ count: number; books: Book[] }>("/books", { params });
  return response.data.books || [];
}

export async function getBook(id: string): Promise<Book> {
  const response = await api.get<{ book: Book }>(`/books/${encodeURIComponent(id)}`);
  return response.data.book;
}

export async function getCategories(): Promise<string[]> {
  const response = await api.get<{ categories: string[] }>("/categories");
  return response.data.categories || [];
}

export async function getCart(): Promise<CartItem[]> {
  const response = await api.get<{ items: CartItem[] }>("/cart");
  return response.data.items || [];
}

export async function addToCart(bookId: string, quantity = 1): Promise<CartItem[]> {
  const response = await api.post<{ items: CartItem[] }>("/cart/items", { bookId, quantity });
  return response.data.items || [];
}

export async function updateCart(bookId: string, quantity: number): Promise<CartItem[]> {
  const response = await api.patch<{ items: CartItem[] }>(`/cart/items/${encodeURIComponent(bookId)}`, { quantity });
  return response.data.items || [];
}

export async function removeFromCart(bookId: string): Promise<CartItem[]> {
  const response = await api.delete<{ items: CartItem[] }>(`/cart/items/${encodeURIComponent(bookId)}`);
  return response.data.items || [];
}

export async function clearCart(): Promise<CartItem[]> {
  const response = await api.delete<{ items: CartItem[] }>("/cart");
  return response.data.items || [];
}

export interface LoginResponse {
  token: string;
  user: User;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/login", { email, password });
  localStorage.setItem("booknest-token", response.data.token);
  localStorage.setItem("booknest-user", JSON.stringify(response.data.user));
  return response.data;
}

export async function register(name: string, email: string, password: string): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/register", { name, email, password });
  localStorage.setItem("booknest-token", response.data.token);
  localStorage.setItem("booknest-user", JSON.stringify(response.data.user));
  return response.data;
}

export async function logout(): Promise<void> {
  localStorage.removeItem("booknest-token");
  localStorage.removeItem("booknest-user");
}

export function getStoredUser(): User | null {
  const value = localStorage.getItem("booknest-user");
  if (!value) return null;
  try {
    return JSON.parse(value) as User;
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return Boolean(localStorage.getItem("booknest-token"));
}

export async function getOrders(): Promise<Order[]> {
  const response = await api.get<{ orders: Order[] }>("/orders");
  return response.data.orders || [];
}

export async function createOrder(items: { bookId: string; quantity: number }[]): Promise<Order> {
  const response = await api.post<{ order: Order }>("/orders", { items });
  return response.data.order;
}

export async function checkout(): Promise<Order> {
  const cart = await getCart();
  if (!cart.length) throw new Error("Your cart is empty");
  const order = await createOrder(cart.map((item) => ({ bookId: item.bookId, quantity: item.quantity })));
  await clearCart();
  return order;
}

export async function getHealth() {
  const response = await api.get("/health");
  return response.data;
}

export default api;
