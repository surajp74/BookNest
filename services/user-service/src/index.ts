import express from "express";
import cors from "cors";
import crypto from "node:crypto";

const app = express();
const port = Number(process.env.PORT || 4004);
app.use(cors());
app.use(express.json());

const users = [
  { id: "demo-user", name: "Demo Customer", email: "demo@booknest.local", password: "demo123" }
];

app.get("/health", (_req, res) => res.json({ service: "user", status: "healthy", timestamp: new Date().toISOString() }));

app.post("/login", (req, res) => {
  const user = users.find(item => item.email === req.body.email && item.password === req.body.password);
  if (!user) return res.status(401).json({ message: "Invalid email or password" });

  res.json({
    user: { id: user.id, name: user.name, email: user.email },
    token: crypto.createHash("sha256").update(`${user.id}:${Date.now()}`).digest("hex")
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required" });
  if (users.some(user => user.email === email)) return res.status(409).json({ message: "User already exists" });

  const user = { id: crypto.randomUUID(), name, email, password };
  users.push(user);
  res.status(201).json({ id: user.id, name: user.name, email: user.email });
});

app.get("/users/:id", (req, res) => {
  const user = users.find(item => item.id === req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ id: user.id, name: user.name, email: user.email });
});

app.listen(port, () => console.log(`User service running on ${port}`));
