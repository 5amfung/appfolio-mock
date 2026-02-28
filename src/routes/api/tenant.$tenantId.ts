import { createFileRoute } from '@tanstack/react-router';
import { TENANTS } from '~/data/tenants';
import { requestLogger } from '~/utils/requestLogger';

export const Route = createFileRoute('/api/tenant/$tenantId')({
  server: {
    middleware: [requestLogger],
    handlers: {
      GET: async ({ params }) => {
        // Simulate real world delay.
        await new Promise((resolve) => setTimeout(resolve, 500));

        const tenant = TENANTS.find((t) => t.id === params.tenantId);
        if (!tenant)
          return Response.json({ error: 'Tenant not found' }, { status: 404 });
        return Response.json(tenant);
      },
    },
  },
});
