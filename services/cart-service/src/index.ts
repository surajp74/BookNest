import express, { Request } from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const port = Number(process.env.PORT || 4002);
const catalogUrl = process.env.CATALOG_URL || "http://localhost:4001";

app.use(cors());
app.use(express.json());

type Item = { bookId: string; quantity: number };
const carts = new Map<string, Item[]>();

function getUserId(req: Request) {
  return String(req.headers["x-user-id"] || "demo-user");
}

async function enrichCart(items: Item[]) {
  return Promise.all(items.map(async (item) => {
    try {
      const response = await axios.get(`${catalogUrl}/api/books/${encodeURIComponent(item.bookId)}`);
      return { ...item, book: response.data.book };
    } catch {
      return { ...item };
    }
  }));
}

async function responseCart(userId: string) {
  const items = await enrichCart(carts.get(userId) || []);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item: any) => sum + (item.book?.price || 0) * item.quantity, 0);
  return { userId, items, totalItems, totalAmount };
}

app.get("/health", (_req, res) => res.json({ status: "ok", service: "cart-service" }));

app.get("/api/cart", async (req, res) => {
  res.json(await responseCart(getUserId(req)));
});

app.post("/api/cart/items", async (req, res) => {
  const userId = getUserId(req);
  const bookId = String(req.body?.bookId || "");
  const quantity = Number(req.body?.quantity ?? 1);

  if (!bookId || !Number.isInteger(quantity) || quantity < 1) {
    return res.status(400).json({ error: "bookId and a positive integer quantity are required" });
  }

  try {
    const bookResponse = await axios.get(`${catalogUrl}/api/books/${encodeURIComponent(bookId)}`);
    const book = bookResponse.data.book;
    const items = carts.get(userId) || [];
    const existing = items.find((item) => item.bookId === bookId);
    const newQuantity = (existing?.quantity || 0) + quantity;

    if (newQuantity > book.stock) {
      return res.status(409).json({ error: `Only ${book.stock} copies are available`, available: book.stock });
    }

    if (existing) existing.quantity = newQuantity;
    else items.push({ bookId, quantity });
    carts.set(userId, items);

    return res.status(201).json(await responseCart(userId));
  } catch (error: any) {
    return res.status(error.response?.status || 502).json({ error: error.response?.data?.error || "Could not reach catalog service" });
  }
});

app.patch("/api/cart/items/:bookId", async (req, res) => {
  const userId = getUserId(req);
  const bookId = req.params.bookId;
  const quantity = Number(req.body?.quantity);
  const items = carts.get(userId) || [];
  const item = items.find((entry) => entry.bookId === bookId);

  if (!item) return res.status(404).json({ error: "Cart item not found" });
  if (!Number.isInteger(quantity) || quantity < 0) return res.status(400).json({ error: "Quantity must be a non-negative integer" });

  if (quantity === 0) {
    carts.set(userId, items.filter((entry) => entry.bookId !== bookId));
    return res.json(await responseCart(userId));
  }

  try {
    const bookResponse = await axios.get(`${catalogUrl}/api/books/${encodeURIComponent(bookId)}`);
    const book = bookResponse.data.book;
    if (quantity > book.stock) return res.status(409).json({ error: `Only ${book.stock} copies are available`, available: book.stock });
    item.quantity = quantity;
    return res.json(await responseCart(userId));
  } catch (error: any) {
    return res.status(error.response?.status || 502).json({ error: error.response?.data?.error || "Could not reach catalog service" });
  }
});

app.delete("/api/cart/items/:bookId", async (req, res) => {
  const userId = getUserId(req);
  const items = carts.get(userId) || [];
  carts.set(userId, items.filter((item) => item.bookId !== req.params.bookId));
  res.json(await responseCart(userId));
});

app.delete("/api/cart", async (req, res) => {
  const userId = getUserId(req);
  carts.set(userId, []);
  res.json(await responseCart(userId));
});

app.listen(port, () => console.log(`Cart service running on ${port}`));
