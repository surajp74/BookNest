import express from "express";
import cors from "cors";

const app = express();
const port = Number(process.env.PORT || 4003);
app.use(cors());
app.use(express.json());

type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: "PLACED" | "PROCESSING" | "SHIPPED";
  createdAt: string;
};

type OrderItem = {
  bookId: string;
  quantity: number;
  price: number;
  title: string;
};

let orders: Order[] = [];

const priceBook: Record<string, { title: string; price: number }> = {
  b001: { title: "The Midnight Library", price: 499 },
  b002: { title: "Atomic Habits", price: 599 },
  b003: { title: "Clean Architecture", price: 799 },
  b004: { title: "The Pragmatic Programmer", price: 699 },
  b005: { title: "The Psychology of Money", price: 549 },
  b006: { title: "Ikigai", price: 399 },
  b007: { title: "Deep Work", price: 579 },
  b008: { title: "Designing Data-Intensive Applications", price: 899 },
  b009: { title: "The Alchemist", price: 349 }
};

app.get("/health", (_req, res) => res.json({ service: "order", status: "healthy", timestamp: new Date().toISOString() }));

app.get("/orders", (_req, res) => res.json(orders));

app.post("/orders", (req, res) => {
  const items = Array.isArray(req.body.items) && req.body.items.length
    ? req.body.items
    : [{ bookId: "b002", quantity: 1 }];

  const normalized: OrderItem[] = items.map(
    (item: { bookId: string; quantity: number }) => ({
    bookId: item.bookId,
    quantity: Number(item.quantity),
    title: priceBook[item.bookId]?.title || "Book",
    price: priceBook[item.bookId]?.price || 0
  }));

  const total = normalized.reduce(
    (sum: number, item: { bookId: string; quantity: number; title: string; price: number }) =>
      sum + item.price * item.quantity,
    0
  );

  const order: Order = {
    id: `ORD-${Date.now().toString().slice(-8)}`,
    userId: req.body.userId || "demo-user",
    items: normalized,
    total,
    status: "PLACED",
    createdAt: new Date().toISOString()
  };

  orders.unshift(order);
  res.status(201).json(order);
});

app.listen(port, () => console.log(`Order service running on ${port}`));
