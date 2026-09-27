import axios from "axios";
import type {Book,CartItem,Order,User} from "./types";
const api=axios.create({baseURL:import.meta.env.VITE_API_BASE_URL||"http://localhost:4000/api",headers:{"Content-Type":"application/json"}});
api.interceptors.request.use(config=>{const token=localStorage.getItem("booknest-token");if(token) config.headers.Authorization=`Bearer ${token}`;return config;});
export async function getBooks(params?:{search?:string;category?:string}){const r=await api.get<{count:number;books:Book[]}>('/books',{params});return r.data;}
export async function getBook(id:string){const r=await api.get<{book:Book}>(`/books/${id}`);return r.data.book;}
export async function getCategories(){const r=await api.get<{categories:string[]}>('/categories');return r.data.categories;}
export async function getCart(){const r=await api.get<{items:CartItem[]}>('/cart');return r.data.items;}
export async function addToCart(bookId:string,quantity=1){const r=await api.post<{items:CartItem[]}>('/cart/items',{bookId,quantity});return r.data.items;}
export async function updateCart(bookId:string,quantity:number){const r=await api.patch<{items:CartItem[]}>(`/cart/items/${bookId}`,{quantity});return r.data.items;}
export async function removeFromCart(bookId:string){const r=await api.delete<{items:CartItem[]}>(`/cart/items/${bookId}`);return r.data.items;}
export async function checkout(){const items=await getCart();const r=await api.post<{order:Order}>('/orders',{items:items.map(i=>({bookId:i.bookId,quantity:i.quantity}))});await api.delete('/cart');return r.data.order;}
export async function getOrders(){const r=await api.get<{orders:Order[]}>('/orders');return r.data.orders;}
export async function login(email:string,password:string){const r=await api.post<{user:User;token:string}>('/login',{email,password});localStorage.setItem('booknest-token',r.data.token);localStorage.setItem('booknest-user',JSON.stringify(r.data.user));return r.data;}
export async function register(name:string,email:string,password:string){const r=await api.post<{user:User;token:string}>('/register',{name,email,password});localStorage.setItem('booknest-token',r.data.token);localStorage.setItem('booknest-user',JSON.stringify(r.data.user));return r.data;}
export function logout(){localStorage.removeItem('booknest-token');localStorage.removeItem('booknest-user');}
export async function getHealth(){const r=await api.get('/health');return r.data;}
