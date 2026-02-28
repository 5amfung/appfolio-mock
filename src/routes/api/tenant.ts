import { createFileRoute } from '@tanstack/react-router'
import { TENANTS } from '~/data/tenants'

export const Route = createFileRoute('/api/tenant')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const phone = url.searchParams.get('phone')
        if (phone) {
          const tenant = TENANTS.find((t) => t.phone === phone)
          if (!tenant) return Response.json({ error: 'Tenant not found' }, { status: 404 })
          return Response.json(tenant)
        }
        return Response.json(TENANTS)
      },
    },
  },
})
