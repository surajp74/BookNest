import { useEffect, useState } from "react";
import { PackageCheck } from "lucide-react";
import { getOrders } from "../api";
import type { Order } from "../types";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch(() => setError("Please log in to view your orders."));
  }, []);

  return (
    <div className="page">
      <div className="page-header compact">
        <span className="eyebrow">ORDER HISTORY</span>
        <h1>Your orders.</h1>
      </div>

      {error ? (
        <div className="empty-state">
          <PackageCheck size={42} />
          <h3>{error}</h3>
        </div>
      ) : orders.length === 0 ? (
        <div className="empty-state">
          <PackageCheck size={42} />
          <h3>No orders yet</h3>
          <p>Your completed demo orders will appear here.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((o) => (
            <article className="order-card" key={o.id}>
              <div>
                <span className="category-label">{o.status}</span>
                <h3>{o.id}</h3>
                <p>{new Date(o.createdAt).toLocaleString()}</p>
              </div>

              <div className="order-items">
                {o.items.map((i) => (
                  <span key={i.bookId}>
                    {i.book?.title || i.bookId} × {i.quantity}
                  </span>
                ))}
              </div>

              <strong>₹{o.total}</strong>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}