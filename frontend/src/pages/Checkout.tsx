import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, LockKeyhole } from "lucide-react";
import { checkout } from "../api";

interface CheckoutProps {
  onCartChanged?: () => void | Promise<void>;
}

export default function Checkout({ onCartChanged }: CheckoutProps) {
  const [done, setDone] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const order = await checkout();
      setOrderId(order.id);
      setDone(true);
      await onCartChanged?.();
    } catch (e: any) {
      setError(e?.response?.data?.error || e?.message || "Could not place order. Please log in and try again.");
    }
  };

  if (done) return <div className="success-page"><CheckCircle2 size={64} /><span className="eyebrow">ORDER PLACED</span><h1>Thank you for your order.</h1><p>Your order <strong>{orderId}</strong> has been created successfully.</p><div><Link className="button primary" to="/orders">View orders</Link><Link className="button ghost" to="/books">Continue shopping</Link></div></div>;

  return <div className="page"><div className="page-header compact"><span className="eyebrow">CHECKOUT</span><h1>Almost there.</h1><p>For this local demo, payment is simulated.</p></div><form className="checkout-form" onSubmit={submit}><div className="form-section"><h3>Delivery details</h3><div className="form-grid"><label>Full name<input required defaultValue="Demo Customer" /></label><label>Phone<input required defaultValue="9876543210" /></label><label className="full-field">Address<input required placeholder="House / Flat, Street, Area" /></label><label>City<input required defaultValue="Pune" /></label><label>PIN code<input required defaultValue="411001" /></label></div></div><div className="form-section"><h3>Payment</h3><div className="payment-demo"><LockKeyhole size={20} /><div><strong>Demo payment gateway</strong><p>No real payment will be processed.</p></div><span>TEST</span></div></div>{error && <div className="form-error">{error}</div>}<button className="button primary full" type="submit">Place demo order</button></form></div>;
}
