import {
  createFileRoute,
  Link,
  Outlet,
  useRouterState,
} from '@tanstack/react-router';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';

export const Route = createFileRoute('/_app')({
  component: AppLayout,
});

function AppLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const tabValue = pathname === '/tenants' ? 'tenants' : 'work-orders';

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-card shadow-sm">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between gap-6 px-6">
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            Property Hub
          </h1>
          <nav className="flex items-center">
            <Tabs value={tabValue} className="w-full">
              <TabsList
                variant="default"
                className="h-10 w-fit gap-1 rounded-lg bg-muted/80 p-1"
              >
                <TabsTrigger
                  value="work-orders"
                  asChild
                  className="min-w-32 rounded-md px-4 py-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
                >
                  <Link to="/work-orders">Work Orders</Link>
                </TabsTrigger>
                <TabsTrigger
                  value="tenants"
                  asChild
                  className="min-w-32 rounded-md px-4 py-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
                >
                  <Link to="/tenants">Tenants</Link>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
