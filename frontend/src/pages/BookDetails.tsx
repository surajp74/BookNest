import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Check, ShoppingBag, Star } from "lucide-react";
import { addToCart, getBook } from "../api";
import type { Book } from "../types";

export default function BookDetails({ onCartChanged }: { onCartChanged: () => void }) {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) getBook(id).then(setBook);
  }, [id]);

  if (!book) return <div className="loading page">Loading book...</div>;

  const add = async () => {
    await addToCart(book.id, quantity);
    onCartChanged();
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
          <div className="large-rating"><Star size={18} fill="currentColor" /> {book.rating} <span>Highly rated by readers</span></div>
          <p className="details-description">{book.description}</p>
          <div className="book-facts">
            <span><BookOpen size={17} /> {book.pages} pages</span>
            <span>Published {book.publishedYear}</span>
            <span><Check size={17} /> In stock</span>
          </div>
          <div className="purchase-box">
            <strong>₹{book.price}</strong>
            <div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)}>+</button></div>
            <button className="button primary" onClick={add}><ShoppingBag size={17} /> Add to cart</button>
          </div>
        </div>
      </section>
    </div>
  );
}
