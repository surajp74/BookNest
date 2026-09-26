import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { getCart, removeFromCart, updateCart } from "../api";
import type { CartItem } from "../types";

export default function Cart({ onCartChanged }: { onCartChanged: () => void }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const load = async () => {
    const data = await getCart();
    setItems(data);
  };

  useEffect(() => {
    void load();
  }, []);

  const change = async (item: CartItem, quantity: number) => {
    if (quantity < 1) return remove(item.bookId);
    await updateCart(item.bookId, quantity);
    load(); onCartChanged();
  };

  const remove = async (id: string) => {
    await removeFromCart(id);
    load(); onCartChanged();
  };

  const subtotal = items.reduce((sum, item) => sum + (item.book?.price || 0) * item.quantity, 0);
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 79;

  return (
    <div className="page">
      <div className="page-header compact"><span className="eyebrow">YOUR BAG</span><h1>Ready when you are.</h1></div>
      {items.length === 0 ? (
        <div className="empty-state"><ShoppingBag size={42} /><h3>Your cart is empty</h3><p>Add a few books and they will appear here.</p><Link className="button primary" to="/books">Explore books <ArrowRight size={16} /></Link></div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {items.map((item) => item.book && (
              <div className="cart-item" key={item.bookId}>
                <img src={item.book.cover} alt={item.book.title} />
                <div className="cart-item-info"><span className="category-label">{item.book.category}</span><h3>{item.book.title}</h3><p>{item.book.author}</p><strong>₹{item.book.price}</strong></div>
                <div className="quantity"><button onClick={() => change(item, item.quantity - 1)}><Minus size={14} /></button><span>{item.quantity}</span><button onClick={() => change(item, item.quantity + 1)}><Plus size={14} /></button></div>
                <button className="remove-button" onClick={() => remove(item.bookId)}><Trash2 size={17} /></button>
              </div>
            ))}
          </div>
          <aside className="summary">
            <h3>Order summary</h3>
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
