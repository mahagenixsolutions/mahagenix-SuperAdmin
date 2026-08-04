import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { DetailDrawer } from '../../../components/erp/DetailDrawer';
import { useTransportStore } from '../shared/transportStore';
import type { BusRoute } from '../shared/types';
import { MapPin, Navigation, Bus, Users, Clock, Plus } from 'lucide-react';

export default function BusRoutesModule() {
  const { routes, buses, createRoute } = useTransportStore();
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [routeName, setRouteName] = useState('');
  const [routeCode, setRouteCode] = useState('');
  const [busNumber, setBusNumber] = useState(buses[0]?.busNumber || 'BUS-01');
  const [totalDistanceKm, setTotalDistanceKm] = useState(18.5);
  const [estimatedDurationMins, setEstimatedDurationMins] = useState(45);

  const columns: GridColumn<BusRoute>[] = [
    { key: 'routeCode', title: 'Route Code', render: (r) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{r.routeCode}</span> },
    { key: 'routeName', title: 'Route Name', render: (r) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{r.routeName}</span> },
    { key: 'totalDistanceKm', title: 'Distance', render: (r) => `${r.totalDistanceKm} km` },
    { key: 'estimatedDurationMins', title: 'Est. Travel Time', render: (r) => `${r.estimatedDurationMins} mins` },
    { key: 'busNumber', title: 'Assigned Bus', render: (r) => <StatusBadge status="info" label={r.busNumber} /> },
    { key: 'driverName', title: 'Driver', render: (r) => r.driverName },
    { key: 'totalStops', title: 'Bus Stops', render: (r) => `${r.totalStops} Stops` },
    { key: 'totalStudentsAssigned', title: 'Assigned Students', render: (r) => <span style={{ fontWeight: 800, color: '#10B981' }}>{r.totalStudentsAssigned} Students</span> },
    { key: 'status', title: 'Status', render: (r) => <StatusBadge status={r.status === 'Operational' ? 'success' : r.status === 'Delayed' ? 'danger' : 'info'} label={r.status} /> },
    {
      key: 'id',
      title: 'Action',
      render: (r) => (
        <button
          onClick={() => setSelectedRoute(r)}
          style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
        >
          View Stops ({r.stops.length})
        </button>
      ),
    },
  ];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!routeName) return;
    createRoute({
      routeName,
      routeCode: routeCode || 'NCR-01',
      busNumber,
      totalDistanceKm: Number(totalDistanceKm),
      estimatedDurationMins: Number(estimatedDurationMins),
    });
    setShowModal(false);
    setRouteName('');
    setRouteCode('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Header Bar */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Bus Routes & Circuit Optimization</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Manage route paths, bus stop schedules, distance calculations, and bus assignments.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#10B981', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Create New Route
        </button>
      </div>

      <DataGrid columns={columns} data={routes} />

      {/* Route Stops Detail Drawer */}
      <DetailDrawer
        isOpen={!!selectedRoute}
        onClose={() => setSelectedRoute(null)}
        title={selectedRoute ? `${selectedRoute.routeName} — Stops Registry` : 'Route Stops'}
      >
        {selectedRoute && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: '"Outfit", sans-serif' }}>
            <div style={{ background: 'var(--bg-surface-raised)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#10B981', textTransform: 'uppercase' }}>{selectedRoute.routeCode} • {selectedRoute.busNumber}</span>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>{selectedRoute.routeName}</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>Driver: {selectedRoute.driverName} | Attendant: {selectedRoute.attendantName}</p>
            </div>

            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 800, margin: '0 0 10px 0', color: 'var(--text-primary)' }}>Stops & Timings Timeline</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedRoute.stops.map((stop) => (
                  <div key={stop.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px', background: 'var(--bg-surface-raised)', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#10B981', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '11px', flexShrink: 0 }}>
                      {stop.sequenceNo}
                    </div>
                    <div style={{ flex: 1 }}>
                      <strong style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'block' }}>{stop.stopName}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Landmark: {stop.landmark}</span>
                      <div style={{ display: 'flex', gap: '12px', marginTop: '4px', fontSize: '11px', color: 'var(--text-primary)' }}>
                        <span>🌅 Pickup: <strong>{stop.morningPickupTime}</strong></span>
                        <span>🌆 Drop: <strong>{stop.eveningDropTime}</strong></span>
                        <span style={{ color: '#10B981', fontWeight: 700 }}>({stop.studentsCount} Students)</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </DetailDrawer>

      {/* Create Route Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '460px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Create New Bus Circuit Route</h3>
            <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Route Name</label>
                <input type="text" value={routeName} onChange={(e) => setRouteName(e.target.value)} style={inputStyle} placeholder="e.g. West Suburban Express" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Route Code</label>
                  <input type="text" value={routeCode} onChange={(e) => setRouteCode(e.target.value)} style={inputStyle} placeholder="e.g. WSE-04" />
                </div>
                <div>
                  <label style={labelStyle}>Assigned Bus</label>
                  <select value={busNumber} onChange={(e) => setBusNumber(e.target.value)} style={inputStyle}>
                    {buses.map((b) => (
                      <option key={b.id} value={b.busNumber}>{b.busNumber}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Total Distance (KM)</label>
                  <input type="number" value={totalDistanceKm} onChange={(e) => setTotalDistanceKm(Number(e.target.value))} style={inputStyle} step="0.1" required />
                </div>
                <div>
                  <label style={labelStyle}>Est Duration (Mins)</label>
                  <input type="number" value={estimatedDurationMins} onChange={(e) => setEstimatedDurationMins(Number(e.target.value))} style={inputStyle} required />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#10B981', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Create Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 800,
  color: 'var(--text-secondary)',
  textTransform: 'uppercase',
  marginBottom: '6px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  borderRadius: '8px',
  border: '1px solid var(--border-subtle)',
  background: 'var(--bg-surface-raised)',
  color: 'var(--text-primary)',
  outline: 'none',
  fontSize: '13px',
};
