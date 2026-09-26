import express from "express";
import cors from "cors";

const app = express();
const port = Number(process.env.PORT || 4001);

app.use(cors());
app.use(express.json());

const books = [
  {
    id: "b001", title: "The Midnight Library", author: "Matt Haig", category: "Fiction",
    description: "Between life and death there is a library, and within that library, the shelves go on forever. A thoughtful story about choices, regret and possibility.",
    price: 499, rating: 4.7, stock: 24, pages: 304, publishedYear: 2020,
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=80", featured: true
  },
  {
    id: "b002", title: "Atomic Habits", author: "James Clear", category: "Self Development",
    description: "An accessible framework for building good habits, breaking bad ones and getting 1% better every day.",
    price: 599, rating: 4.8, stock: 42, pages: 320, publishedYear: 2018,
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=700&q=80", featured: true
  },
  {
    id: "b003", title: "Clean Architecture", author: "Robert C. Martin", category: "Technology",
    description: "Practical guidance for software architecture, boundaries, components and designing systems that survive changing requirements.",
    price: 799, rating: 4.6, stock: 16, pages: 432, publishedYear: 2017,
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=700&q=80", featured: true
  },
  {
    id: "b004", title: "The Pragmatic Programmer", author: "David Thomas", category: "Technology",
    description: "Classic lessons for becoming a better software developer through practical techniques, principles and professional habits.",
    price: 699, rating: 4.8, stock: 20, pages: 352, publishedYear: 2019,
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80", featured: true
  },
  {
    id: "b005", title: "The Psychology of Money", author: "Morgan Housel", category: "Business",
    description: "A collection of stories exploring how people think about money, risk, wealth and financial decisions.",
    price: 549, rating: 4.7, stock: 33, pages: 256, publishedYear: 2020,
    cover: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "b006", title: "Ikigai", author: "Héctor García", category: "Lifestyle",
    description: "A gentle exploration of purpose, daily rituals and ideas for living a meaningful, balanced life.",
    price: 399, rating: 4.5, stock: 38, pages: 208, publishedYear: 2016,
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "b007", title: "Deep Work", author: "Cal Newport", category: "Productivity",
    description: "Strategies for cultivating focused work in a distracted world and producing valuable results.",
    price: 579, rating: 4.6, stock: 19, pages: 296, publishedYear: 2016,
    cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "b008", title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", category: "Technology",
    description: "A deep technical guide to reliable, scalable and maintainable data systems.",
    price: 899, rating: 4.9, stock: 11, pages: 616, publishedYear: 2017,
    cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "b009", title: "The Alchemist", author: "Paulo Coelho", category: "Fiction",
    description: "A timeless journey about dreams, courage and listening to the signs along the way.",
    price: 349, rating: 4.6, stock: 51, pages: 208, publishedYear: 1988,
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=700&q=80"
  }
];

app.get("/health", (_req, res) => res.json({ service: "catalog", status: "healthy", timestamp: new Date().toISOString() }));

app.get("/books", (req, res) => {
  const search = String(req.query.search || "").toLowerCase();
  const category = String(req.query.category || "");
  const result = books.filter(book =>
    (!search || `${book.title} ${book.author}`.toLowerCase().includes(search)) &&
    (!category || book.category === category)
  );
  res.json(result);
});

app.get("/books/:id", (req, res) => {
  const book = books.find(item => item.id === req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

app.get("/categories", (_req, res) => {
  res.json([...new Set(books.map(book => book.category))]);
});

app.listen(port, () => console.log(`Catalog service running on ${port}`));
