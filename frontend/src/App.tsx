import {
  useEffect,
  useState,
  type FormEvent
} from "react";

import {
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate
} from "react-router-dom";

import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X
} from "lucide-react";

import {
  getCart
} from "./api";

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
  const [
    mobileOpen,
    setMobileOpen
  ] = useState(false);

  const [
    cartCount,
    setCartCount
  ] = useState(0);

  const [
    headerSearch,
    setHeaderSearch
  ] = useState("");

  const navigate = useNavigate();

  const refreshCartCount = async () => {
    try {
      const items = await getCart();

      setCartCount(
        items.reduce(
          (total, item) =>
            total + item.quantity,
          0
        )
      );
    } catch {
      // Cart service may not be available
      // before the application is fully started.
    }
  };

  useEffect(() => {
    void refreshCartCount();

    const timer = window.setInterval(
      () => {
        void refreshCartCount();
      },
      3000
    );

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const handleHeaderSearch = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const query =
      headerSearch.trim();

    if (query) {
      navigate(
        `/books?search=${encodeURIComponent(
          query
        )}`
      );
    } else {
      navigate("/books");
    }

    setMobileOpen(false);
  };

  const navClass = ({
    isActive
  }: {
    isActive: boolean;
  }) =>
    `nav-link ${
      isActive ? "active" : ""
    }`;

  return (
    <div className="app-shell">

      {/* Top strip */}
      <div className="top-strip">
        <span>
          Free shipping on orders over ₹999
        </span>

        <span className="top-strip-desktop">
          Secure checkout · Curated stories ·
          Easy returns
        </span>
      </div>

      {/* Header */}
      <header className="site-header">

        <Link
          className="brand"
          to="/"
          onClick={() =>
            setMobileOpen(false)
          }
          aria-label="BookNest Home"
        >
          <img
            className="site-logo"
            src="/booknest-logo.png"
            alt="BookNest - Your Cozy Corner for Stories"
          />
        </Link>

        {/* Search */}
        <form
          className="header-search"
          onSubmit={handleHeaderSearch}
        >
          <Search size={18} />

          <input
            type="text"
            value={headerSearch}
            onChange={(event) =>
              setHeaderSearch(
                event.target.value
              )
            }
            placeholder="Search books, authors and categories..."
            aria-label="Search books, authors and categories"
          />
        </form>

        {/* Navigation */}
        <nav
          className={`main-nav ${
            mobileOpen ? "open" : ""
          }`}
        >
          <NavLink
            className={navClass}
            to="/books"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            Books
          </NavLink>

          <NavLink
            className={navClass}
            to="/categories"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            Categories
          </NavLink>

          <NavLink
            className={navClass}
            to="/orders"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            Orders
          </NavLink>

          <NavLink
            className={navClass}
            to="/about"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            About
          </NavLink>
        </nav>

        {/* Header actions */}
        <div className="header-actions">

          <Link
            to="/login"
            className="icon-button"
            title="Account"
          >
            <User size={20} />
          </Link>

          <Link
            to="/cart"
            className="icon-button cart-button"
            title="Cart"
          >
            <ShoppingBag size={20} />

            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            className="menu-button"
            onClick={() =>
              setMobileOpen(
                !mobileOpen
              )
            }
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>

        </div>
      </header>

      {/* Main application */}
      <main>
        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/books"
            element={
              <Books
                onCartChanged={
                  refreshCartCount
                }
              />
            }
          />

          <Route
            path="/books/:id"
            element={
              <BookDetails
                onCartChanged={
                  refreshCartCount
                }
              />
            }
          />

          <Route
            path="/categories"
            element={<Categories />}
          />

          <Route
            path="/cart"
            element={
              <Cart
                onCartChanged={
                  refreshCartCount
                }
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <Checkout
                onCartChanged={
                  refreshCartCount
                }
              />
            }
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/about"
            element={<About />}
          />

        </Routes>
      </main>

      {/* =====================================================
          BOOKSTORE FOOTER
          ===================================================== */}
      <footer className="footer">

        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-about">

            <Link
              to="/"
              className="footer-logo-link"
            >
              <img
                src="/booknest-logo.png"
                className="footer-logo"
                alt="BookNest"
              />
            </Link>

            <p>
              A cozy corner for readers to discover
              stories, ideas and books worth keeping.
              Explore our collection and find your
              next great read.
            </p>

          </div>

          {/* Explore */}
          <div>
            <h4>
              Explore
            </h4>

            <Link to="/books">
              All Books
            </Link>

            <Link to="/categories">
              Categories
            </Link>

            <Link to="/books?category=Fiction">
              Fiction
            </Link>

            <Link to="/books?category=Technology">
              Technology
            </Link>
          </div>

          {/* Customer */}
          <div>
            <h4>
              Your BookNest
            </h4>

            <Link to="/login">
              My Account
            </Link>

            <Link to="/cart">
              Shopping Cart
            </Link>

            <Link to="/orders">
              My Orders
            </Link>

            <Link to="/about">
              About Us
            </Link>
          </div>

          {/* Reading */}
          <div>
            <h4>
              Discover & Read
            </h4>

            <span>
              Find your next story
            </span>

            <span>
              Explore new authors
            </span>

            <span>
              Learn something new
            </span>

            <span>
              Make time for reading
            </span>
          </div>

        </div>

        <div className="footer-bottom">

          <span>
            © 2026 BookNest · Your Cozy Corner
            for Stories
          </span>

          <span>
            Made for readers, one page at a time.
          </span>

        </div>

      </footer>

    </div>
  );
}