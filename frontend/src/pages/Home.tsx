import { useEffect, useState } from "react";
import {
  Link
} from "react-router-dom";

import {
  ArrowRight,
  BookOpen,
  ShieldCheck,
  Sparkles,
  Truck
} from "lucide-react";

import {
  getBooks,
  type Book
} from "../api";

export default function Home() {
  const [featured, setFeatured] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFeaturedBooks() {
      try {
        setLoading(true);
        setError("");

        const books = await getBooks();

        // Keep the existing Home page design with 4 books,
        // but get those books from the backend Catalog Service.
        setFeatured(books.slice(0, 4));
      } catch (err) {
        console.error("Failed to load featured books:", err);
        setError("Could not load featured books.");
      } finally {
        setLoading(false);
      }
    }

    void loadFeaturedBooks();
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">
            <Sparkles size={15} />
            STORIES WORTH KEEPING
          </span>

          <h1>
            Find the book
            <br />
            <em>that finds you.</em>
          </h1>

          <p>
            Explore thoughtful reads, timeless classics and practical
            knowledge. Your next great chapter starts here.
          </p>

          <div className="hero-actions">
            <Link className="button primary" to="/books">
              Explore books
              <ArrowRight size={17} />
            </Link>

            <Link className="button ghost" to="/categories">
              Browse categories
            </Link>
          </div>
        </div>

        <div className="hero-art">
          <div className="book-stack">
            <div className="floating-book book-one">
              <span>
                BUILD
                <br />
                BETTER
                <br />
                THINGS
              </span>
            </div>

            <div className="floating-book book-two">
              <span>
                THE
                <br />
                QUIET
                <br />
                MIND
              </span>
            </div>

            <div className="floating-book book-three">
              <span>
                CREATE
                <br />
                YOUR
                <br />
                PATH
              </span>
            </div>
          </div>

          <div className="hero-orb" />
        </div>
      </section>

      <section className="trust-bar">
        <div>
          <Truck size={22} />

          <span>
            <strong>Fast delivery</strong>
            <small>Across India</small>
          </span>
        </div>

        <div>
          <ShieldCheck size={22} />

          <span>
            <strong>Secure checkout</strong>
            <small>Your data stays protected</small>
          </span>
        </div>

        <div>
          <BookOpen size={22} />

          <span>
            <strong>Curated collection</strong>
            <small>Books worth reading</small>
          </span>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              CURATED FOR YOU
            </span>

            <h2>Popular right now</h2>
          </div>

          <Link
            to="/books"
            className="text-link"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        {loading && (
          <div className="loading">
            Loading books...
          </div>
        )}

        {!loading && error && (
          <div className="empty-state">
            <h3>{error}</h3>

            <Link
              to="/books"
              className="button primary"
            >
              View all books
            </Link>
          </div>
        )}

        {!loading && !error && (
          <div className="book-grid">
            {featured.map((book) => (
              <article
                className="book-card"
                key={book.id}
              >
                <Link
                  to={`/books/${book.id}`}
                  className="book-cover"
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    loading="lazy"
                  />
                </Link>

                <div className="book-info">
                  <div className="rating">
                    <span>★★★★★</span>{" "}
                    <small>{book.rating}</small>
                  </div>

                  <Link to={`/books/${book.id}`}>
                    <h3>{book.title}</h3>
                  </Link>

                  <p>{book.author}</p>

                  <strong>
                    ₹{book.price}
                  </strong>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading &&
          !error &&
          featured.length === 0 && (
            <div className="empty-state">
              <h3>No books available</h3>

              <p>
                The catalog currently has no books.
              </p>
            </div>
          )}
      </section>

      <section className="category-banner">
        <div>
          <span className="eyebrow">
            YOUR NEXT OBSESSION
          </span>

          <h2>
            From fiction to
            <br />
            <em>future skills.</em>
          </h2>

          <p>
            Build a reading list that matches where
            you are going.
          </p>

          <Link
            className="button dark"
            to="/categories"
          >
            Explore categories
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="banner-shapes">
          <div className="shape shape-a">
            FICTION
          </div>

          <div className="shape shape-b">
            TECH
          </div>

          <div className="shape shape-c">
            BUSINESS
          </div>
        </div>
      </section>
    </>
  );
}