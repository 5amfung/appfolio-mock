import { createFileRoute } from '@tanstack/react-router'
import { workOrders } from '~/data/workOrders'

export const Route = createFileRoute('/api/workorder/$workOrderId')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const workOrder = workOrders.find((w) => w.id === params.workOrderId)
        if (!workOrder) return Response.json({ error: 'Work order not found' }, { status: 404 })
        return Response.json(workOrder)
      },
    },
  },
})
