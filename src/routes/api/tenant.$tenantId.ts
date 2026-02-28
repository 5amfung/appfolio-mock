import { createFileRoute } from '@tanstack/react-router'
import { TENANTS } from '~/data/tenants'

export const Route = createFileRoute('/api/tenant/$tenantId')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const tenant = TENANTS.find((t) => t.id === params.tenantId)
        if (!tenant) return Response.json({ error: 'Tenant not found' }, { status: 404 })
        return Response.json(tenant)
      },
    },
  },
})
