import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Filter, Search, ShoppingBag, Star } from "lucide-react";
import { addToCart, getBooks, getCart, getCategories } from "../api";
import type { Book, CartItem } from "../types";

interface BooksProps {
  onCartChanged?: () => void | Promise<void>;
}

export default function Books({ onCartChanged }: BooksProps) {
  const [params, setParams] = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [query, setQuery] = useState(params.get("search") || "");
  const [category, setCategory] = useState(params.get("category") || "");
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async (search = query, cat = category) => {
    setLoading(true);
    setError("");
    try {
      const [data, cats, currentCart] = await Promise.all([
        getBooks({ search, category: cat || undefined }),
        getCategories(),
        getCart(),
      ]);
      setBooks(data);
      setCategories(cats);
      setCart(currentCart);
    } catch {
      setError("Could not load the catalog. Please check that the API Gateway and services are running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load(params.get("search") || "", params.get("category") || "");
    // Load only when the page is first mounted; search/filter handlers reload explicitly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const search = () => {
    setParams({ ...(query ? { search: query } : {}), ...(category ? { category } : {}) });
    void load(query, category);
  };

  const cartQuantity = (bookId: string) => cart.find((item) => item.bookId === bookId)?.quantity || 0;

  const add = async (book: Book) => {
    const current = cartQuantity(book.id);
    if (current >= book.stock) return;

    setCartLoading(true);
    try {
      const updated = await addToCart(book.id, 1);
      setCart(updated);
      await onCartChanged?.();
    } catch (e: any) {
      setError(e?.response?.data?.error || "Could not add this book to your cart.");
    } finally {
      setCartLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <span className="eyebrow">THE COLLECTION</span>
        <h1>Books for every kind of reader.</h1>
        <p>Search our curated collection and discover your next favorite.</p>
      </div>

      <div className="catalog-toolbar">
        <div className="search-input">
          <Search size={18} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && search()} placeholder="Search title or author" />
        </div>
        <select value={category} onChange={(e) => { setCategory(e.target.value); setParams(e.target.value ? { category: e.target.value } : {}); void load(query, e.target.value); }}>
          <option value="">All categories</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <button className="filter-button" onClick={search}><Filter size={17} /> Apply</button>
      </div>

      {loading ? <div className="loading">Loading collection...</div> : error ? <div className="empty-state"><h3>{error}</h3></div> : (
        <div className="catalog-grid">
          {books.map((book) => {
            const quantity = cartQuantity(book.id);
            const maxed = quantity >= book.stock;
            return (
              <article className="catalog-card" key={book.id}>
                <Link to={`/books/${book.id}`} className="catalog-cover"><img src={book.cover} alt={book.title} /></Link>
                <div className="catalog-details">
                  <span className="category-label">{book.category}</span>
                  <Link to={`/books/${book.id}`}><h3>{book.title}</h3></Link>
                  <p>{book.author}</p>
                  <div className="catalog-rating"><Star size={14} fill="currentColor" /> {book.rating} <span>·</span> {book.pages} pages</div>
                  <div className="catalog-bottom">
                    <div>
                      <strong>₹{book.price}</strong>
                      <small style={{ display: "block", marginTop: 4 }}>{book.stock} available</small>
                    </div>
                    <button className="small-cart" disabled={cartLoading || maxed || book.stock < 1} onClick={() => void add(book)}>
                      <ShoppingBag size={16} /> {book.stock < 1 ? "Out of stock" : maxed ? `Added (${quantity})` : quantity > 0 ? `Add More (${quantity})` : "Add"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {!loading && !error && books.length === 0 && <div className="empty-state"><h3>No books found</h3><p>Try another title, author or category.</p></div>}
    </div>
  );
}
