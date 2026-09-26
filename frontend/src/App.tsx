import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import {
  BookOpen,
  ChevronRight,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Star,
  Truck,
  User,
  X
} from "lucide-react";
import { getCart } from "./api";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import About from "./pages/About";

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const refreshCartCount = async () => {
    try {
      const items = await getCart();
      setCartCount(items.reduce((sum, item) => sum + item.quantity, 0));
    } catch {
      // The UI remains usable if the API is temporarily unavailable.
    }
  };

  useEffect(() => {
    refreshCartCount();
    const timer = window.setInterval(refreshCartCount, 3000);
    return () => window.clearInterval(timer);
  }, []);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? "active" : ""}`;

  return (
    <div className="app-shell">
      <div className="top-strip">
        <span>Free shipping on orders over ₹999</span>
        <span className="top-strip-desktop">Secure checkout · Curated stories · Easy returns</span>
      </div>

      <header className="site-header">
        <Link className="brand" to="/" onClick={() => setMobileOpen(false)}>
          <span className="brand-icon"><BookOpen size={20} /></span>
          <span>BookNest</span>
        </Link>

        <div className="header-search" onClick={() => navigate("/books")}>
          <Search size={18} />
          <span>Search books, authors and categories...</span>
        </div>

        <nav className={`main-nav ${mobileOpen ? "open" : ""}`}>
          <NavLink className={navClass} to="/books" onClick={() => setMobileOpen(false)}>Books</NavLink>
          <NavLink className={navClass} to="/categories" onClick={() => setMobileOpen(false)}>Categories</NavLink>
          <NavLink className={navClass} to="/orders" onClick={() => setMobileOpen(false)}>Orders</NavLink>
          <NavLink className={navClass} to="/about" onClick={() => setMobileOpen(false)}>About</NavLink>
        </nav>

        <div className="header-actions">
          <Link to="/login" className="icon-button" title="Account"><User size={20} /></Link>
          <Link to="/cart" className="icon-button cart-button" title="Cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books onCartChanged={refreshCartCount} />} />
          <Route path="/books/:id" element={<BookDetails onCartChanged={refreshCartCount} />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart onCartChanged={refreshCartCount} />} />
          <Route path="/checkout" element={<Checkout onCartChanged={refreshCartCount} />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="brand footer-brand"><span className="brand-icon"><BookOpen size={18} /></span>BookNest</div>
            <p>A learning-focused bookstore application built with React, TypeScript and Node.js microservices.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <Link to="/books">All Books</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/orders">Orders</Link>
          </div>
          <div>
            <h4>Help</h4>
            <Link to="/about">About BookNest</Link>
            <Link to="/login">My Account</Link>
            <span>support@booknest.local</span>
          </div>
          <div>
            <h4>Built for DevOps</h4>
            <span>Docker-ready</span>
            <span>Kubernetes-ready</span>
            <span>CI/CD-ready</span>
          </div>
        </div>
        <div className="footer-bottom">© 2026 BookNest · Local learning project</div>
      </footer>
    </div>
  );
}
