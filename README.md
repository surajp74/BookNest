# BookNest — Kubernetes-ready Bookstore Microservices Demo

BookNest is a small but realistic bookstore web application designed specifically for practicing:

- TypeScript + React frontend
- Node.js + Express microservices
- REST APIs
- API Gateway
- Docker
- Kubernetes
- Azure DevOps CI/CD
- Later: Azure networking, ingress, WAF, private/public traffic, secrets, monitoring, etc.

## Architecture

```text
                    ┌──────────────────────┐
                    │   React + TypeScript  │
                    │      Frontend         │
                    └──────────┬───────────┘
                               │ REST
                               ▼
                    ┌──────────────────────┐
                    │     API Gateway       │
                    │      :4000            │
                    └───────┬───────┬──────┘
                            │       │
              ┌─────────────┘       └──────────────┐
              ▼                                     ▼
     ┌────────────────┐                    ┌────────────────┐
     │ Catalog Service│                    │  User Service  │
     │     :4001      │                    │     :4004      │
     └────────────────┘                    └────────────────┘
              │
              │
              ▼
     ┌────────────────┐       ┌────────────────┐
     │  Cart Service  │       │ Order Service  │
     │     :4002      │       │     :4003      │
     └────────────────┘       └────────────────┘
```

All current data is in memory so you can run the application without Azure, a database, or any cloud account.

## Pages

- Home
- Books
- Book Details
- Categories
- Cart
- Checkout
- Orders
- Login/Register
- About

## Services

| Service | Port | Responsibility |
|---|---:|---|
| Frontend | 5173 | Web UI |
| API Gateway | 4000 | Single API entry point |
| Catalog | 4001 | Books, categories, search |
| Cart | 4002 | Shopping cart |
| Order | 4003 | Checkout and orders |
| User | 4004 | Login/register/profile |

## Requirements

- Node.js 20+
- npm 10+

## Run locally

Open a terminal in this folder:

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

The gateway will be available at:

```text
http://localhost:4000
```

## Run each service separately

```bash
npm run dev:catalog
npm run dev:cart
npm run dev:order
npm run dev:user
npm run dev:gateway
npm run dev:frontend
```

## Test APIs

```bash
curl http://localhost:4000/api/books
curl http://localhost:4000/api/categories
curl http://localhost:4000/api/health
```

## Demo login

```text
Email: demo@booknest.local
Password: demo123
```

## Important

This is intentionally a learning/demo application.

It does NOT currently implement:

- persistent database
- real authentication/JWT
- payment processing
- production-grade secrets
- distributed tracing
- production ingress
- Azure resources

Those can be added incrementally after you are satisfied with the application.

## Suggested next phase

Once you like the application:

1. Add Dockerfiles.
2. Build Docker images locally.
3. Run the full system with Docker Compose.
4. Create Kubernetes Deployments and Services.
5. Separate services into namespaces.
6. Add ConfigMaps and Secrets.
7. Add Ingress.
8. Add NetworkPolicies.
9. Add Azure DevOps CI pipeline.
10. Push images to Azure Container Registry.
11. Deploy to AKS.
12. Add Azure networking, private endpoints, Application Gateway/WAF, monitoring, autoscaling, and security.
