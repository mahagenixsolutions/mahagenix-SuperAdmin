import { useState, useMemo } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { mockBusRoutes } from '../shared/mockTransportData';
import type { BusStop } from '../shared/types';

interface BusStopWithRoute extends BusStop {
  routeName: string;
}

export default function BusStopsModule() {
  // Flatten all stops from all routes with their route name
  const allStops = useMemo<BusStopWithRoute[]>(() =>
    mockBusRoutes.flatMap(route =>
      route.stops.map(stop => ({ ...stop, routeName: route.routeName }))
    ),
    []
  );

  const [stops] = useState<BusStopWithRoute[]>(allStops);

  const columns: GridColumn<BusStopWithRoute>[] = [
    { key: 'stopName', title: 'Stop Name', render: (s) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{s.stopName}</span> },
    { key: 'routeName', title: 'Route Name', render: (s) => <span style={{ fontWeight: 600, color: '#3B82F6' }}>{s.routeName}</span> },
    { key: 'landmark', title: 'Landmark Location', render: (s) => s.landmark },
    { key: 'morningPickupTime', title: 'Morning Pickup', render: (s) => <span style={{ fontWeight: 700, color: '#10B981' }}>{s.morningPickupTime}</span> },
    { key: 'eveningDropTime', title: 'Evening Drop', render: (s) => <span style={{ fontWeight: 700, color: '#3B82F6' }}>{s.eveningDropTime}</span> },
    { key: 'studentsCount', title: 'Student Count', render: (s) => <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{s.studentsCount} Students</span> },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Bus Stop Registry &amp; Timings</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Manage pickup and drop stop locations, GPS coordinates, and student boarding counts.</p>
        </div>
        <button style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#10B981', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
          + Add Bus Stop
        </button>
      </div>

      <DataGrid columns={columns} data={stops} />
    </div>
  );
}
