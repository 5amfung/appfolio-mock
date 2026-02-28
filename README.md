# Property Hub

A property management mock app built with TanStack Start, TanStack Router, and React. Manage **work orders** and **tenants** with a simple UI and REST-style API.

- [TanStack Router](https://tanstack.com/router)
- [TanStack Start](https://tanstack.com/start)

## Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/) (or use the project’s package manager)

## Getting started

Install dependencies and run in development:

```sh
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects to **Work Orders** by default.

## How to use the app

### Work Orders (`/work-orders`)

- **View** all work orders, sorted by newest first.
- Each card shows: tenant name, address, phone, unit (if any), description, created date, and **status** (New, In Progress, Completed) with a colored left border.

### Tenants (`/tenants`)

- **View** all tenants in a table (name, phone, address, unit).
- **Search** by name or phone using the search box; results filter as you type (debounced).

Use the header tabs **Work Orders** and **Tenants** to switch between the two sections.

## API (for integration or testing)

All API routes are served under `/api` on the same origin as the app.

### Work orders

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/workorder` | List all work orders (newest first). Optional query: `?phone=<number>` to filter by tenant phone. |
| `POST` | `/api/workorder` | Create a work order. Body: `{ tenantName, tenantAddress, tenantPhone, tenantUnitNumber?, description }` (all strings except optional `tenantUnitNumber`). |
| `GET` | `/api/workorder/$workOrderId` | Get a single work order by ID. |

### Tenants

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/tenant` | List all tenants. Optional query: `?phone=<number>` to get the tenant with that phone. |
| `GET` | `/api/tenant/$tenantId` | Get a single tenant by ID. |

### Verify identity

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/verify-identity?phone=<number>` | Check if a tenant exists for the given phone. Returns `{ result: "verified" }` or 404. |

Example — create a work order:

```sh
curl -X POST http://localhost:3000/api/workorder \
  -H "Content-Type: application/json" \
  -d '{"tenantName":"Jane Doe","tenantAddress":"123 Main St","tenantPhone":"555-1234","description":"Leak under sink"}'
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server with hot reload. |
| `pnpm build` | Build for production and run TypeScript check. |
| `pnpm preview` | Serve the production build locally (after `pnpm build`). |
| `pnpm start` | Run the production server (e.g. `.output/server/index.mjs`). |
| `pnpm lint` | Run Biome lint. |
| `pnpm format` | Run Biome format. |
| `pnpm check` | Run Biome check and fix (lint + format). |
