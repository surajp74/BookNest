import {
  BookOpen,
  Heart,
  Search,
  ShieldCheck,
  Sparkles,
  Truck
} from "lucide-react";

export default function About() {
  return (
    <div className="page">

      {/* Page Header */}
      <section className="page-header">
        <span className="eyebrow">
          <BookOpen size={15} />
          ABOUT BOOKNEST
        </span>

        <h1>
          A cozy corner
          <br />
          <em>for every reader.</em>
        </h1>

        <p>
          BookNest is a place for curious minds, passionate readers
          and anyone looking for their next great story. Discover
          books across fiction, technology, business, personal
          development and more.
        </p>
      </section>

      {/* Introduction */}
      <section className="about-intro">

        <div className="about-intro-content">

          <span className="eyebrow">
            OUR STORY
          </span>

          <h2>
            More than just
            <br />
            <em>a bookstore.</em>
          </h2>

          <p>
            We believe that the right book can change the way you
            see a story, a subject or even the world around you.
            BookNest was created to make discovering those books
            simple and enjoyable.
          </p>

          <p>
            Whether you are searching for a captivating novel,
            learning a new skill, exploring ideas or simply looking
            for something to read on a quiet evening, BookNest gives
            you a place to start.
          </p>

        </div>

        <div className="about-intro-art">

          <div className="about-book-card">

            <BookOpen size={38} />

            <span>
              READ
            </span>

            <strong>
              DISCOVER
            </strong>

            <small>
              REPEAT
            </small>

          </div>

        </div>

      </section>

      {/* What We Offer */}
      <section className="section about-section">

        <div className="section-heading">

          <div>
            <span className="eyebrow">
              WHAT YOU'LL FIND
            </span>

            <h2>
              Something for every reader
            </h2>
          </div>

        </div>

        <div className="about-grid">

          <article className="about-card">

            <div className="about-card-icon">
              <Sparkles size={23} />
            </div>

            <h3>
              Curated collection
            </h3>

            <p>
              Explore a thoughtfully selected collection of books
              spanning fiction, technology, business, self-growth
              and other popular categories.
            </p>

          </article>

          <article className="about-card">

            <div className="about-card-icon">
              <Search size={23} />
            </div>

            <h3>
              Easy discovery
            </h3>

            <p>
              Search by title, author or category and quickly find
              books that match your interests.
            </p>

          </article>

          <article className="about-card">

            <div className="about-card-icon">
              <Heart size={23} />
            </div>

            <h3>
              Books worth keeping
            </h3>

            <p>
              From timeless stories to practical knowledge, we aim
              to bring together books that readers will want to
              return to again and again.
            </p>

          </article>

          <article className="about-card">

            <div className="about-card-icon">
              <ShieldCheck size={23} />
            </div>

            <h3>
              Simple & secure
            </h3>

            <p>
              Browse, add books to your cart and complete your
              purchase through a simple and secure shopping
              experience.
            </p>

          </article>

        </div>

      </section>

      {/* Reading Philosophy */}
      <section className="about-reading">

        <div className="about-reading-content">

          <span className="eyebrow">
            THE BOOKNEST PHILOSOPHY
          </span>

          <h2>
            Every book opens
            <br />
            <em>a different door.</em>
          </h2>

          <p>
            Some books entertain us. Some teach us. Some challenge
            what we believe, while others simply give us a quiet
            place to escape for a while.
          </p>

          <p>
            Whatever you are looking for, we hope BookNest helps
            you find a book that stays with you long after the last
            page.
          </p>

        </div>

        <div className="about-reading-quote">

          <BookOpen size={30} />

          <blockquote>
            "A good book is a journey
            you can take without leaving
            your chair."
          </blockquote>

          <span>
            — BookNest
          </span>

        </div>

      </section>

      {/* Shopping Experience */}
      <section className="section about-section">

        <div className="section-heading">

          <div>
            <span className="eyebrow">
              A SIMPLE READING JOURNEY
            </span>

            <h2>
              From discovery to doorstep
            </h2>
          </div>

        </div>

        <div className="about-journey">

          <div className="journey-step">

            <div className="journey-number">
              01
            </div>

            <h3>
              Discover
            </h3>

            <p>
              Browse our collection and discover your next book.
            </p>

          </div>

          <div className="journey-step">

            <div className="journey-number">
              02
            </div>

            <h3>
              Choose
            </h3>

            <p>
              Read about the book, check availability and add it
              to your cart.
            </p>

          </div>

          <div className="journey-step">

            <div className="journey-number">
              03
            </div>

            <h3>
              Order
            </h3>

            <p>
              Complete your checkout and keep track of your orders.
            </p>

          </div>

          <div className="journey-step">

            <div className="journey-number">
              04
            </div>

            <h3>
              Read
            </h3>

            <p>
              Find a comfortable corner, open the first page and
              enjoy the journey.
            </p>

          </div>

        </div>

      </section>

      {/* Final Banner */}
      <section className="about-final">

        <div>

          <span className="eyebrow">
            WELCOME TO BOOKNEST
          </span>

          <h2>
            Your next great
            <br />
            <em>read is waiting.</em>
          </h2>

          <p>
            Take your time. Explore the shelves. Follow your
            curiosity.
          </p>

        </div>

        <div className="about-final-icons">

          <BookOpen size={38} />

          <Truck size={32} />

          <Heart size={32} />

        </div>

      </section>

    </div>
  );
}