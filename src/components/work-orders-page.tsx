import { useQuery } from '@tanstack/react-query';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import type { WorkOrder } from '~/data/workOrders';

async function fetchWorkOrders(): Promise<WorkOrder[]> {
  const res = await fetch('/api/workorder');
  if (!res.ok) throw new Error('Failed to fetch work orders');
  return res.json();
}

function formatCreatedAt(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function ProgressBadge({ progress }: { progress: WorkOrder['progress'] }) {
  const variant =
    progress === 'completed'
      ? 'default'
      : progress === 'in-progress'
        ? 'secondary'
        : 'outline';
  const label =
    progress === 'in-progress'
      ? 'In Progress'
      : progress === 'new'
        ? 'New'
        : 'Completed';
  return <Badge variant={variant}>{label}</Badge>;
}

const statusBorderClass: Record<WorkOrder['progress'], string> = {
  new: 'border-l-4 border-l-amber-500',
  'in-progress': 'border-l-4 border-l-sky-500',
  completed: 'border-l-4 border-l-emerald-600',
};

function WorkOrderCard({ workOrder }: { workOrder: WorkOrder }) {
  return (
    <Card
      className={`overflow-hidden transition-shadow hover:shadow-lg ${statusBorderClass[workOrder.progress]}`}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-4 border-b border-border pb-4">
        <div>
          <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
            Work Order
          </CardTitle>
          <p className="mt-0.5 font-mono text-xs text-muted-foreground">
            {workOrder.id}
          </p>
        </div>
        <ProgressBadge progress={workOrder.progress} />
      </CardHeader>
      <CardContent className="gap-0 pt-4">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-3 text-sm sm:grid-cols-[auto_1fr]">
          <dt className="font-medium text-foreground">Tenant</dt>
          <dd className="text-muted-foreground">{workOrder.tenantName}</dd>
          <dt className="font-medium text-foreground">Address</dt>
          <dd className="text-muted-foreground">
            {workOrder.tenantAddress}
            {workOrder.tenantUnitNumber
              ? `, Unit ${workOrder.tenantUnitNumber}`
              : ''}
          </dd>
          <dt className="font-medium text-foreground">Phone</dt>
          <dd className="text-muted-foreground">{workOrder.tenantPhone}</dd>
          <dt className="font-medium text-foreground">Description</dt>
          <dd className="text-muted-foreground">{workOrder.description}</dd>
          <dt className="font-medium text-foreground">Created</dt>
          <dd className="text-muted-foreground">
            {formatCreatedAt(workOrder.createdAt)}
          </dd>
        </dl>
      </CardContent>
    </Card>
  );
}

export function WorkOrdersPage() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['workorders'] as const,
    queryFn: fetchWorkOrders,
    refetchInterval: 30_000, // 30 seconds in ms
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Work Orders
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            All work orders, sorted by newest first.
          </p>
        </div>
        <Card className="py-12">
          <CardContent>
            <p className="text-center text-sm text-muted-foreground">
              Loading…
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Work Orders
          </h1>
        </div>
        <Card className="p-8 text-center">
          <CardContent className="p-0">
            <p className="text-sm text-destructive">
              {error instanceof Error ? error.message : 'Something went wrong'}
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-4 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Retry
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Work Orders
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            All work orders, sorted by newest first.
          </p>
        </div>
        <Card className="py-12">
          <CardContent>
            <p className="text-center text-sm text-muted-foreground">
              No work orders yet.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Work Orders
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          All work orders, sorted by newest first.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        {data.map((wo) => (
          <WorkOrderCard key={wo.id} workOrder={wo} />
        ))}
      </div>
    </div>
  );
}
