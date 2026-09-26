import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const port = Number(process.env.PORT || 4000);

const catalogUrl = process.env.CATALOG_URL || "http://localhost:4001";
const cartUrl = process.env.CART_URL || "http://localhost:4002";
const orderUrl = process.env.ORDER_URL || "http://localhost:4003";
const userUrl = process.env.USER_URL || "http://localhost:4004";

app.use(cors());
app.use(express.json());

app.get("/api/health", async (_req, res) => {
  res.json({
    gateway: "healthy",
    services: {
      catalog: catalogUrl,
      cart: cartUrl,
      order: orderUrl,
      user: userUrl
    },
    timestamp: new Date().toISOString()
  });
});

const proxy = (target: string, route: string) =>
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: { [`^/api${route}`]: "" },
    proxyTimeout: 5000
  });

app.use("/api/books", proxy(catalogUrl, "/books"));
app.use("/api/categories", proxy(catalogUrl, "/categories"));
app.use("/api/cart", proxy(cartUrl, "/cart"));
app.use("/api/orders", proxy(orderUrl, "/orders"));
app.use("/api/login", proxy(userUrl, "/login"));
app.use("/api/register", proxy(userUrl, "/register"));
app.use("/api/users", proxy(userUrl, "/users"));

app.listen(port, () => console.log(`API Gateway running on ${port}`));
