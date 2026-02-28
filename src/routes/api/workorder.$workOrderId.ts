import { createFileRoute } from '@tanstack/react-router';
import { workOrders } from '~/data/workOrders';
import { requestLogger } from '~/utils/requestLogger';

export const Route = createFileRoute('/api/workorder/$workOrderId')({
  server: {
    middleware: [requestLogger],
    handlers: {
      GET: async ({ params }) => {
        // Simulate real world delay.
        await new Promise((resolve) => setTimeout(resolve, 500));

        const workOrder = workOrders.find((w) => w.id === params.workOrderId);
        if (!workOrder)
          return Response.json(
            { error: 'Work order not found' },
            { status: 404 },
          );
        return Response.json(workOrder);
      },
    },
  },
});
