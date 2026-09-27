import express from "express";
import cors from "cors";

const app = express();
const port = Number(process.env.PORT || 4001);

app.use(cors());
app.use(express.json());

export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  pages: number;
  publishedYear: number;
  cover: string;
  featured?: boolean;
};

const books: Book[] = [
  {
    id: "b001",
    title: "The Midnight Library",
    author: "Matt Haig",
    category: "Fiction",
    description:
      "Between life and death there is a library, and within that library the shelves go on forever. A thoughtful story about choices, regret and possibility.",
    price: 499,
    rating: 4.7,
    stock: 24,
    pages: 304,
    publishedYear: 2020,
    cover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=80",
    featured: true
  },
  {
    id: "b002",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Development",
    description:
      "An accessible framework for building good habits, breaking bad ones and getting 1% better every day.",
    price: 599,
    rating: 4.8,
    stock: 42,
    pages: 320,
    publishedYear: 2018,
    cover:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=700&q=80",
    featured: true
  },
  {
    id: "b003",
    title: "Clean Architecture",
    author: "Robert C. Martin",
    category: "Technology",
    description:
      "Practical guidance for software architecture, boundaries, components and designing systems that survive changing requirements.",
    price: 799,
    rating: 4.6,
    stock: 16,
    pages: 432,
    publishedYear: 2017,
    cover:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=700&q=80",
    featured: true
  },
  {
    id: "b004",
    title: "The Pragmatic Programmer",
    author: "David Thomas",
    category: "Technology",
    description:
      "Classic lessons for becoming a better software developer through practical techniques, principles and professional habits.",
    price: 699,
    rating: 4.8,
    stock: 20,
    pages: 352,
    publishedYear: 2019,
    cover:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80",
    featured: true
  },
  {
    id: "b005",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Business",
    description:
      "Stories exploring how people think about money, risk, wealth and financial decisions.",
    price: 549,
    rating: 4.7,
    stock: 33,
    pages: 256,
    publishedYear: 2020,
    cover:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "b006",
    title: "Ikigai",
    author: "Héctor García",
    category: "Lifestyle",
    description:
      "A gentle exploration of purpose, daily rituals and ideas for living a meaningful, balanced life.",
    price: 399,
    rating: 4.5,
    stock: 38,
    pages: 208,
    publishedYear: 2016,
    cover:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "b007",
    title: "Deep Work",
    author: "Cal Newport",
    category: "Productivity",
    description:
      "Strategies for cultivating focused work in a distracted world and producing valuable results.",
    price: 579,
    rating: 4.6,
    stock: 19,
    pages: 296,
    publishedYear: 2016,
    cover:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "b008",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "Technology",
    description:
      "A deep technical guide to reliable, scalable and maintainable data systems.",
    price: 899,
    rating: 4.9,
    stock: 11,
    pages: 616,
    publishedYear: 2017,
    cover:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "b009",
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    description:
      "A timeless journey about dreams, courage and listening to the signs along the way.",
    price: 349,
    rating: 4.6,
    stock: 51,
    pages: 208,
    publishedYear: 1988,
    cover:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "b010",
    title: "Kubernetes Patterns",
    author: "Bilgin Ibryam",
    category: "Technology",
    description:
      "Reusable patterns for designing cloud-native applications that run well on Kubernetes.",
    price: 849,
    rating: 4.7,
    stock: 14,
    pages: 336,
    publishedYear: 2020,
    cover:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "b011",
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "Business",
    description:
      "A practical approach to building products through experimentation, validated learning and rapid feedback.",
    price: 649,
    rating: 4.4,
    stock: 27,
    pages: 336,
    publishedYear: 2011,
    cover:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "b012",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    category: "Design",
    description:
      "An accessible guide to human-centered design and why everyday products should be easier to understand.",
    price: 729,
    rating: 4.6,
    stock: 18,
    pages: 368,
    publishedYear: 2013,
    cover:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "b013",
    title: "The Alchemy of Air",
    author: "Thomas Hager",
    category: "Science",
    description:
      "A fascinating story of chemistry, ambition and the discovery that transformed agriculture and modern industry.",
    price: 459,
    rating: 4.3,
    stock: 12,
    pages: 304,
    publishedYear: 2008,
    cover:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "b014",
    title: "The Art of Stillness",
    author: "Pico Iyer",
    category: "Wellness",
    description:
      "A short reflection on the value of slowing down and finding space for thought in a noisy world.",
    price: 329,
    rating: 4.5,
    stock: 31,
    pages: 128,
    publishedYear: 2014,
    cover:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "b015",
    title: "The Goal",
    author: "Eliyahu M. Goldratt",
    category: "Business",
    description:
      "A business novel that introduces the Theory of Constraints through a plant manager trying to turn around operations.",
    price: 599,
    rating: 4.5,
    stock: 22,
    pages: 384,
    publishedYear: 1984,
    cover:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=700&q=80"
  }
];

app.get("/health", (_req, res) =>
  res.json({
    status: "ok",
    service: "catalog-service"
  })
);

app.get("/api/books", (req, res) => {
  const search = String(req.query.search || "")
    .trim()
    .toLowerCase();

  const category = String(req.query.category || "").trim();

  let result = books;

  if (category && category !== "All") {
    result = result.filter(
      (b) =>
        b.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    result = result.filter(
      (b) =>
        b.title.toLowerCase().includes(search) ||
        b.author.toLowerCase().includes(search) ||
        b.category.toLowerCase().includes(search)
    );
  }

  res.json({
    count: result.length,
    books: result
  });
});

app.get("/api/books/categories", (_req, res) =>
  res.json({
    categories: [
      ...new Set(books.map((b) => b.category))
    ].sort()
  })
);

app.get("/api/books/:id", (req, res) => {
  const book = books.find(
    (b) => b.id === req.params.id
  );

  if (!book) {
    return res
      .status(404)
      .json({
        error: "Book not found"
      });
  }

  res.json({ book });
});

app.post("/api/books/:id/reserve", (req, res) => {
  const book = books.find(
    (b) => b.id === req.params.id
  );

  const qty = Number(
    req.body?.qty ?? req.body?.quantity ?? 1
  );

  if (!book) {
    return res
      .status(404)
      .json({
        error: "Book not found"
      });
  }

  if (!Number.isInteger(qty) || qty < 1) {
    return res
      .status(400)
      .json({
        error: "Invalid quantity"
      });
  }

  if (book.stock < qty) {
    return res
      .status(409)
      .json({
        error: "Not enough stock",
        available: book.stock
      });
  }

  book.stock -= qty;

  res.json({
    reserved: qty,
    remainingStock: book.stock,
    unitPrice: book.price,
    book
  });
});

app.listen(port, () =>
  console.log(`Catalog service running on ${port}`)
);