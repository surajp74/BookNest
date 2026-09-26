import axios from "axios";
import type { Book, CartItem, Order } from "./types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api"
});

export async function getBooks(params?: { search?: string; category?: string }) {
  const response = await api.get<Book[]>("/books", { params });
  return response.data;
}

export async function getBook(id: string) {
  const response = await api.get<Book>(`/books/${id}`);
  return response.data;
}

export async function getCategories() {
  const response = await api.get<string[]>("/categories");
  return response.data;
}

export async function getCart() {
  const response = await api.get<CartItem[]>("/cart");
  return response.data;
}

export async function addToCart(bookId: string, quantity = 1) {
  const response = await api.post("/cart/items", { bookId, quantity });
  return response.data;
}

export async function updateCart(bookId: string, quantity: number) {
  const response = await api.patch(`/cart/items/${bookId}`, { quantity });
  return response.data;
}

export async function removeFromCart(bookId: string) {
  const response = await api.delete(`/cart/items/${bookId}`);
  return response.data;
}

export async function checkout() {
  const response = await api.post<Order>("/orders");
  return response.data;
}

export async function getOrders() {
  const response = await api.get<Order[]>("/orders");
  return response.data;
}

export async function login(email: string, password: string) {
  const response = await api.post("/login", { email, password });
  return response.data;
}

export async function register(name: string, email: string, password: string) {
  const response = await api.post("/register", { name, email, password });
  return response.data;
}

export async function getHealth() {
  const response = await api.get("/health");
  return response.data;
}
