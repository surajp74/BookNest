import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";

const app = express();

const port = Number(process.env.PORT || 4004);
const secret =
  process.env.JWT_SECRET || "booknest-local-secret";

app.use(cors());
app.use(express.json());

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const users: User[] = [
  {
    id: "demo-user",
    name: "Demo Customer",
    email: "demo@booknest.local",
    password: "demo123"
  }
];

app.get("/health", (_req, res) =>
  res.json({
    status: "ok",
    service: "user-service"
  })
);

function issue(user: User) {
  return jwt.sign(
    {
      sub: user.id,
      name: user.name,
      email: user.email
    },
    secret,
    {
      expiresIn: "2h"
    }
  );
}

app.post("/api/users/login", (req, res) => {
  const u = users.find(
    (x) =>
      x.email === req.body?.email &&
      x.password === req.body?.password
  );

  if (!u) {
    return res
      .status(401)
      .json({
        error: "Invalid email or password"
      });
  }

  res.json({
    user: {
      id: u.id,
      name: u.name,
      email: u.email
    },
    token: issue(u)
  });
});

app.post("/api/users/register", (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({
        error:
          "Name, email and password are required"
      });
  }

  if (users.some((u) => u.email === email)) {
    return res
      .status(409)
      .json({
        error: "User already exists"
      });
  }

  const u = {
    id: crypto.randomUUID(),
    name,
    email,
    password
  };

  users.push(u);

  res.status(201).json({
    user: {
      id: u.id,
      name: u.name,
      email: u.email
    },
    token: issue(u)
  });
});

app.get("/api/users/:id", (req, res) => {
  const u = users.find(
    (x) => x.id === req.params.id
  );

  if (!u) {
    return res
      .status(404)
      .json({
        error: "User not found"
      });
  }

  res.json({
    user: {
      id: u.id,
      name: u.name,
      email: u.email
    }
  });
});

app.listen(port, () =>
  console.log(`User service running on ${port}`)
);