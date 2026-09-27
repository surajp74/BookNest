import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Check, ShoppingBag, Star } from "lucide-react";
import { addToCart, getBook } from "../api";
import type { Book } from "../types";

interface BookDetailsProps {
  onCartChanged?: () => void | Promise<void>;
}

export default function BookDetails({ onCartChanged }: BookDetailsProps) {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) getBook(id).then(setBook).catch(() => setError("Book not found"));
  }, [id]);

  if (error) return <div className="loading page">{error}</div>;
  if (!book) return <div className="loading page">Loading book...</div>;

  const add = async () => {
    setError("");
    try {
      await addToCart(book.id, quantity);
      await onCartChanged?.();
    } catch (e: any) {
      setError(e?.response?.data?.error || "Could not add this book to your cart.");
    }
  };

  return (
    <div className="page">
      <Link to="/books" className="back-link"><ArrowLeft size={16} /> Back to books</Link>
      <section className="details-layout">
        <div className="details-cover"><img src={book.cover} alt={book.title} /></div>
        <div className="details-content">
          <span className="category-label">{book.category}</span>
          <h1>{book.title}</h1>
          <p className="author">by <strong>{book.author}</strong></p>
          <div className="large-rating"><Star size={18} fill="currentColor" /> {book.rating}<span>Highly rated by readers</span></div>
          <p className="details-description">{book.description}</p>
          <div className="book-facts"><span><BookOpen size={17} /> {book.pages} pages</span><span>Published {book.publishedYear}</span><span><Check size={17} /> {book.stock > 0 ? `${book.stock} in stock` : "Out of stock"}</span></div>
          {error && <div className="empty-state" style={{ marginBottom: 16 }}><p>{error}</p></div>}
          <div className="purchase-box">
            <strong>₹{book.price}</strong>
            <div className="quantity">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(Math.min(book.stock, quantity + 1))} disabled={quantity >= book.stock}>+</button>
            </div>
            <button className="button primary" disabled={book.stock < 1} onClick={() => void add()}><ShoppingBag size={17} /> Add to cart</button>
          </div>
        </div>
      </section>
    </div>
  );
}
