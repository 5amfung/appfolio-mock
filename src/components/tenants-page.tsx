import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Card, CardContent } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import type { Tenant } from '~/data/tenants';
import { useDebouncedValue } from '~/hooks/use-debounced-value';

async function fetchTenants(): Promise<Tenant[]> {
  const res = await fetch('/api/tenant');
  if (!res.ok) throw new Error('Failed to fetch tenants');
  return res.json();
}

function filterTenants(tenants: Tenant[], search: string): Tenant[] {
  const q = search.trim().toLowerCase();
  if (!q) return tenants;
  return tenants.filter(
    (t) => t.name.toLowerCase().includes(q) || t.phone.includes(search.trim())
  );
}

export function TenantsPage() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 500);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['tenants'] as const,
    queryFn: fetchTenants,
  });

  const filteredTenants = useMemo(
    () => (data ? filterTenants(data, debouncedSearch) : []),
    [data, debouncedSearch]
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Tenants
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Search and browse all tenants.
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
            Tenants
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

  const isEmpty = !data?.length;
  const noSearchMatches = !isEmpty && !filteredTenants.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Tenants
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Search and browse all tenants.
        </p>
      </div>
      <div className="space-y-3">
        <label
          htmlFor="tenant-search"
          className="block text-sm font-medium text-foreground"
        >
          Search
        </label>
        <Input
          id="tenant-search"
          type="search"
          placeholder="Search by name or phone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md rounded-lg border border-input bg-card"
          aria-label="Search tenants"
        />
      </div>
      {isEmpty ? (
        <Card className="py-12">
          <CardContent>
            <p className="text-center text-sm text-muted-foreground">
              No tenants.
            </p>
          </CardContent>
        </Card>
      ) : noSearchMatches ? (
        <Card className="py-12">
          <CardContent>
            <p className="text-center text-sm text-muted-foreground">
              No tenants match your search.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-medium text-foreground">
                    ID
                  </TableHead>
                  <TableHead className="font-medium text-foreground">
                    Name
                  </TableHead>
                  <TableHead className="font-medium text-foreground">
                    Phone
                  </TableHead>
                  <TableHead className="font-medium text-foreground">
                    Address
                  </TableHead>
                  <TableHead className="font-medium text-foreground">
                    Unit
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenants.map((tenant) => (
                  <TableRow key={tenant.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {tenant.id}
                    </TableCell>
                    <TableCell className="font-medium">{tenant.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {tenant.phone}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {tenant.address}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {tenant.unitNumber ?? '—'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
