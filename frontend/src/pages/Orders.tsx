import { useEffect, useState } from "react";
import { PackageCheck } from "lucide-react";
import { getOrders } from "../api";
import type { Order } from "../types";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => { getOrders().then(setOrders); }, []);

  return (
    <div className="page">
      <div className="page-header compact"><span className="eyebrow">ORDER HISTORY</span><h1>Your orders.</h1></div>
      {orders.length === 0 ? <div className="empty-state"><PackageCheck size={42} /><h3>No orders yet</h3><p>Your completed demo orders will appear here.</p></div> :
        <div className="orders-list">{orders.map(order => (
          <article className="order-card" key={order.id}>
            <div><span className="category-label">{order.status}</span><h3>{order.id}</h3><p>{new Date(order.createdAt).toLocaleString()}</p></div>
            <div className="order-items">{order.items.map(item => <span key={item.bookId}>{item.book?.title} × {item.quantity}</span>)}</div>
            <strong>₹{order.total}</strong>
          </article>
        ))}</div>}
    </div>
  );
}
