import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { clearCart, getCart, removeFromCart, updateCart } from "../api";
import type { CartItem } from "../types";

interface CartProps {
  onCartChanged?: () => void | Promise<void>;
}

export default function Cart({ onCartChanged }: CartProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingBookId, setUpdatingBookId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setItems(await getCart());
      setError("");
    } catch (e: any) {
      setError(e?.response?.data?.error || "Could not load your cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  const change = async (item: CartItem, quantity: number) => {
    setUpdatingBookId(item.bookId);
    try {
      const updated = quantity < 1 ? await removeFromCart(item.bookId) : await updateCart(item.bookId, quantity);
      setItems(updated);
      await onCartChanged?.();
    } catch (e: any) {
      setError(e?.response?.data?.error || "Could not update your cart.");
    } finally {
      setUpdatingBookId(null);
    }
  };

  const remove = async (bookId: string) => {
    setUpdatingBookId(bookId);
    try {
      setItems(await removeFromCart(bookId));
      await onCartChanged?.();
    } catch (e: any) {
      setError(e?.response?.data?.error || "Could not remove this item.");
    } finally {
      setUpdatingBookId(null);
    }
  };

  const clear = async () => {
    if (!window.confirm("Remove all items from your cart?")) return;
    try {
      setItems(await clearCart());
      await onCartChanged?.();
    } catch (e: any) {
      setError(e?.response?.data?.error || "Could not clear your cart.");
    }
  };

  const subtotal = items.reduce((sum, item) => sum + (item.book?.price || 0) * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 79;

  return (
    <div className="page">
      <div className="page-header compact"><span className="eyebrow">YOUR BAG</span><h1>Ready when you are.</h1></div>
      {loading ? <div className="loading">Loading cart...</div> : error && items.length === 0 ? <div className="empty-state"><h3>{error}</h3></div> : items.length === 0 ? (
        <div className="empty-state"><ShoppingBag size={42} /><h3>Your cart is empty</h3><p>Add a few books and they will appear here.</p><Link className="button primary" to="/books">Explore books <ArrowRight size={16} /></Link></div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {items.map((item) => item.book && (
              <div className="cart-item" key={item.bookId}>
                <img src={item.book.cover} alt={item.book.title} />
                <div className="cart-item-info">
                  <span className="category-label">{item.book.category}</span>
                  <h3>{item.book.title}</h3>
                  <p>{item.book.author}</p>
                  <strong>₹{item.book.price}</strong>
                  <small>{item.book.stock} available</small>
                </div>
                <div className="quantity">
                  <button disabled={updatingBookId === item.bookId || item.quantity <= 1} onClick={() => void change(item, item.quantity - 1)}><Minus size={14} /></button>
                  <span>{item.quantity}</span>
                  <button disabled={updatingBookId === item.bookId || item.quantity >= item.book.stock} onClick={() => void change(item, item.quantity + 1)}><Plus size={14} /></button>
                </div>
                <strong>₹{item.book.price * item.quantity}</strong>
                <button className="remove-button" disabled={updatingBookId === item.bookId} onClick={() => void remove(item.bookId)}><Trash2 size={17} /></button>
              </div>
            ))}
            <button className="button ghost" onClick={() => void clear()}>Clear cart</button>
          </div>
          <aside className="summary">
            <h3>Order summary</h3>
            <div><span>Items</span><strong>{totalItems}</strong></div>
            <div><span>Subtotal</span><strong>₹{subtotal}</strong></div>
            <div><span>Shipping</span><strong>{shipping ? `₹${shipping}` : "FREE"}</strong></div>
            <hr />
            <div className="summary-total"><span>Total</span><strong>₹{subtotal + shipping}</strong></div>
            <Link className="button primary full" to="/checkout">Continue to checkout <ArrowRight size={16} /></Link>
            <small>Free shipping on orders over ₹999.</small>
          </aside>
        </div>
      )}
    </div>
  );
}
