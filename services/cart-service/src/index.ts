import express from "express";
import cors from "cors";

const app = express();
const port = Number(process.env.PORT || 4002);
app.use(cors());
app.use(express.json());

type CartItem = { bookId: string; quantity: number };
let cart: CartItem[] = [
  { bookId: "b002", quantity: 1 }
];

app.get("/health", (_req, res) => res.json({ service: "cart", status: "healthy", timestamp: new Date().toISOString() }));

app.get("/cart", (_req, res) => res.json(cart));

app.post("/cart/items", (req, res) => {
  const { bookId, quantity = 1 } = req.body;
  if (!bookId) return res.status(400).json({ message: "bookId is required" });

  const existing = cart.find(item => item.bookId === bookId);
  if (existing) existing.quantity += Number(quantity);
  else cart.push({ bookId, quantity: Number(quantity) });

  res.status(201).json(cart);
});

app.patch("/cart/items/:bookId", (req, res) => {
  const item = cart.find(entry => entry.bookId === req.params.bookId);
  if (!item) return res.status(404).json({ message: "Cart item not found" });

  const quantity = Number(req.body.quantity);
  if (!Number.isInteger(quantity) || quantity < 1) return res.status(400).json({ message: "Quantity must be at least 1" });

  item.quantity = quantity;
  res.json(cart);
});

app.delete("/cart/items/:bookId", (req, res) => {
  cart = cart.filter(item => item.bookId !== req.params.bookId);
  res.json(cart);
});

app.delete("/cart", (_req, res) => {
  cart = [];
  res.json({ message: "Cart cleared" });
});

app.listen(port, () => console.log(`Cart service running on ${port}`));
