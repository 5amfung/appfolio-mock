import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { type WorkOrder, workOrders } from '~/data/workOrders';
import { requestLogger } from '~/utils/requestLogger';

const CreateWorkOrderSchema = z.object({
  tenantName: z.string().min(1),
  tenantAddress: z.string().min(1),
  tenantPhone: z.string().min(1),
  tenantUnitNumber: z.string().optional(),
  description: z.string().min(1),
});

export const Route = createFileRoute('/api/workorder')({
  server: {
    middleware: [requestLogger],
    handlers: {
      GET: async ({ request }) => {
        // Simulate real world delay.
        await new Promise((resolve) => setTimeout(resolve, 500));

        const url = new URL(request.url);
        const phone = url.searchParams.get('phone');
        const list = phone
          ? workOrders.filter((wo) => wo.tenantPhone === phone)
          : [...workOrders];
        const sorted = [...list].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        return Response.json(sorted);
      },

      POST: async ({ request }) => {
        // Simulate real world delay.
        await new Promise((resolve) => setTimeout(resolve, 600));

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
        }

        const result = CreateWorkOrderSchema.safeParse(body);
        if (!result.success) {
          return Response.json(
            { error: 'Validation failed', issues: result.error.issues },
            { status: 400 }
          );
        }

        const newWorkOrder: WorkOrder = {
          id: crypto.randomUUID(),
          ...result.data,
          progress: 'new',
          createdAt: new Date().toISOString(),
        };

        workOrders.push(newWorkOrder);
        return Response.json(newWorkOrder, { status: 201 });
      },
    },
  },
});
