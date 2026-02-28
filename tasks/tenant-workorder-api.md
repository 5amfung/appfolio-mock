# Plan: Tenant & Work Order REST APIs

## Status: IMPLEMENTED ✓

## Context
Building a POC REST API layer for an AppFolio-style mock app. The app uses TanStack Start (file-based API routes via `server.handlers` on `createFileRoute`) with Nitro as the server runtime. No auth required. Data is static (tenants) or in-memory (work orders).

## Key Finding
`createAPIFileRoute` does NOT exist in TanStack Start v1.163.x. The correct pattern is:

```ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/path')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        return Response.json({ ... })
      },
      POST: async ({ request }) => {
        const body = await request.json()
        return Response.json({ ... }, { status: 201 })
      },
    },
  },
})
```

## Files Created

### `src/data/tenants.ts` ✓
Static array of 100 fictitious tenants. Each has:
- `id: string` (UUID, unique per tenant)
- `name: string`
- `phone: string` (digits only, no symbols)
- `address: string` (first line only)
- `unitNumber?: string` (optional)

### `src/data/workOrders.ts` ✓
In-memory store (module-level array) and types. Pre-populated with 10 fictitious static work orders.

```ts
export type WorkOrderProgress = 'new' | 'in-progress' | 'completed'

export interface WorkOrder {
  id: string
  tenantName: string
  tenantAddress: string
  tenantPhone: string
  tenantUnitNumber?: string
  description: string
  progress: WorkOrderProgress
  createdAt: string             // ISO 8601 timestamp
}
```

### `src/routes/api/tenant.ts` ✓
```
GET /api/tenant          → 200 flat array of all tenants
GET /api/tenant?phone=X  → 200 single tenant object (exact match) | 404 { error: "Tenant not found" }
```

### `src/routes/api/tenant.$tenantId.ts` ✓
```
GET /api/tenant/<id> → 200 tenant object | 404 { error: "Tenant not found" }
```

### `src/routes/api/workorder.ts` ✓
```
GET /api/workorder  → 200 all work orders sorted by createdAt desc
POST /api/workorder → 201 created work order | 400 { error: "...", issues: [...] }
```

Validation via Zod:
```ts
const CreateWorkOrderSchema = z.object({
  tenantName: z.string().min(1),
  tenantAddress: z.string().min(1),
  tenantPhone: z.string().min(1),
  tenantUnitNumber: z.string().optional(),
  description: z.string().min(1),
})
```

### `src/routes/api/workorder.$workOrderId.ts` ✓
```
GET /api/workorder/<id> → 200 work order object | 404 { error: "Work order not found" }
```

## Key Decisions
- **Flat JSON responses**: no envelope wrapper
- **Phone match**: exact string equality
- **Work order IDs**: `crypto.randomUUID()` (built-in Node.js, no deps)
- **Validation**: Zod v4 (already in project) with 400 + error details on failure
- **Work order `progress`**: server-controlled, not in POST payload; defaults to `'new'`
- **In-memory store**: module-level array — resets on server restart (POC acceptable)
- **No new dependencies** required

## Verification
```bash
pnpm dev  # start dev server

curl http://localhost:3000/api/tenant                          # 100 tenants
curl http://localhost:3000/api/tenant/<valid-id>               # 1 tenant
curl "http://localhost:3000/api/tenant?phone=4155551001"       # 1 tenant
curl "http://localhost:3000/api/tenant?phone=0000000000"       # 404
curl http://localhost:3000/api/tenant/nonexistent-id           # 404

curl -X POST http://localhost:3000/api/workorder \
  -H "Content-Type: application/json" \
  -d '{"tenantName":"John","tenantAddress":"123 Main St","tenantPhone":"4151234567","description":"Leaky faucet"}'  # 201

curl http://localhost:3000/api/workorder                       # array sorted desc
curl http://localhost:3000/api/workorder/<id>                  # 1 work order

pnpm build  # TypeScript passes ✓
```
