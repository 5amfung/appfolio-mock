export type WorkOrderProgress = 'new' | 'in-progress' | 'completed'

export interface WorkOrder {
  id: string
  tenantName: string
  tenantAddress: string
  tenantPhone: string
  tenantUnitNumber?: string
  description: string
  progress: WorkOrderProgress
  createdAt: string
}

// In-memory store — resets on server restart (POC)
export const workOrders: WorkOrder[] = [
  {
    id: 'wo-00000001-0000-4000-a000-000000000001',
    tenantName: 'Alice Johnson',
    tenantAddress: '100 Oak Street',
    tenantPhone: '4155551001',
    tenantUnitNumber: '1A',
    description: 'Leaky faucet in kitchen sink — dripping constantly.',
    progress: 'completed',
    createdAt: '2025-01-05T08:00:00.000Z',
  },
  {
    id: 'wo-00000002-0000-4000-a000-000000000002',
    tenantName: 'Brian Martinez',
    tenantAddress: '200 Maple Avenue',
    tenantPhone: '4155551002',
    description: 'Heater not working — unit is cold.',
    progress: 'completed',
    createdAt: '2025-01-12T09:30:00.000Z',
  },
  {
    id: 'wo-00000003-0000-4000-a000-000000000003',
    tenantName: 'Carol Williams',
    tenantAddress: '300 Pine Road',
    tenantPhone: '4155551003',
    tenantUnitNumber: '2B',
    description: 'Bathroom ceiling has water stain and possible leak from upstairs.',
    progress: 'completed',
    createdAt: '2025-01-20T11:00:00.000Z',
  },
  {
    id: 'wo-00000004-0000-4000-a000-000000000004',
    tenantName: 'David Brown',
    tenantAddress: '400 Elm Drive',
    tenantPhone: '4155551004',
    description: 'Front door lock is sticking — key very difficult to turn.',
    progress: 'in-progress',
    createdAt: '2025-02-01T14:00:00.000Z',
  },
  {
    id: 'wo-00000005-0000-4000-a000-000000000005',
    tenantName: 'Emily Davis',
    tenantAddress: '500 Cedar Lane',
    tenantPhone: '4155551005',
    tenantUnitNumber: '3C',
    description: 'Garbage disposal stopped working — makes no sound when switched on.',
    progress: 'in-progress',
    createdAt: '2025-02-08T10:15:00.000Z',
  },
  {
    id: 'wo-00000006-0000-4000-a000-000000000006',
    tenantName: 'Frank Garcia',
    tenantAddress: '600 Birch Boulevard',
    tenantPhone: '4155551006',
    description: 'Bedroom window won\'t close all the way — gap lets in cold air.',
    progress: 'in-progress',
    createdAt: '2025-02-14T13:45:00.000Z',
  },
  {
    id: 'wo-00000007-0000-4000-a000-000000000007',
    tenantName: 'Grace Wilson',
    tenantAddress: '700 Walnut Court',
    tenantPhone: '4155551007',
    tenantUnitNumber: '4D',
    description: 'Dishwasher leaving standing water at end of cycle.',
    progress: 'new',
    createdAt: '2025-02-20T09:00:00.000Z',
  },
  {
    id: 'wo-00000008-0000-4000-a000-000000000008',
    tenantName: 'Henry Taylor',
    tenantAddress: '800 Chestnut Place',
    tenantPhone: '4155551008',
    description: 'Smoke detector chirping intermittently — battery replacement needed.',
    progress: 'new',
    createdAt: '2025-02-22T16:30:00.000Z',
  },
  {
    id: 'wo-00000009-0000-4000-a000-000000000009',
    tenantName: 'Irene Anderson',
    tenantAddress: '900 Spruce Way',
    tenantPhone: '4155551009',
    tenantUnitNumber: '5E',
    description: 'Mold spotted in bathroom grout along shower walls.',
    progress: 'new',
    createdAt: '2025-02-25T11:20:00.000Z',
  },
  {
    id: 'wo-00000010-0000-4000-a000-000000000010',
    tenantName: 'James Thomas',
    tenantAddress: '1000 Willow Street',
    tenantPhone: '4155551010',
    description: 'AC unit making loud rattling noise when running.',
    progress: 'new',
    createdAt: '2025-02-27T08:45:00.000Z',
  },
]
