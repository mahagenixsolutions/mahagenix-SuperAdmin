import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useTransportStore } from '../shared/transportStore';
import type { TripRecord } from '../shared/types';
import { Navigation, Clock, AlertTriangle, CheckCircle2, Play, Check } from 'lucide-react';

export default function TripManagementModule() {
  const { trips, startTrip, endTrip, confirmBusDelay } = useTransportStore();
  const [filterType, setFilterType] = useState('');
  const [selectedDelayTrip, setSelectedDelayTrip] = useState<TripRecord | null>(null);
  const [delayMins, setDelayMins] = useState(15);
  const [delayReason, setDelayReason] = useState('Traffic Bottleneck');

  const filteredTrips = trips.filter((t) => !filterType || t.tripType === filterType);

  const columns: GridColumn<TripRecord>[] = [
    { key: 'id', title: 'Trip Ref', render: (t) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{t.id}</span> },
    { key: 'tripName', title: 'Trip Name & Route', render: (t) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{t.tripName}</span> },
    { key: 'busNumber', title: 'Bus Number', render: (t) => <StatusBadge status="info" label={t.busNumber} /> },
    { key: 'driverName', title: 'Driver', render: (t) => t.driverName },
    { key: 'tripType', title: 'Trip Type', render: (t) => t.tripType },
    { key: 'scheduledStartTime', title: 'Schedule', render: (t) => `${t.scheduledStartTime} - ${t.scheduledEndTime}` },
    {
      key: 'delayMinutes',
      title: 'Delay Alert',
      render: (t) =>
        t.delayMinutes > 0 ? (
          <span style={{ color: '#EF4444', fontWeight: 800 }}>+{t.delayMinutes} mins</span>
        ) : (
          <span style={{ color: '#10B981', fontWeight: 700 }}>On Time</span>
        ),
    },
    { key: 'status', title: 'Status', render: (t) => <StatusBadge status={t.status === 'Completed' ? 'success' : t.status === 'Delayed' ? 'danger' : t.status === 'In Transit' ? 'info' : 'warning'} label={t.status} /> },
    {
      key: 'id',
      title: 'Desk Action',
      render: (t) => (
        <div style={{ display: 'flex', gap: '6px' }}>
          {t.status === 'Scheduled' && (
            <button
              onClick={() => startTrip(t.id)}
              style={{ border: 'none', background: '#10B981', color: '#FFF', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Play size={12} /> Start Trip
            </button>
          )}
          {t.status === 'In Transit' && (
            <>
              <button
                onClick={() => endTrip(t.id)}
                style={{ border: 'none', background: '#4F46E5', color: '#FFF', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Check size={12} /> Complete
              </button>
              <button
                onClick={() => setSelectedDelayTrip(t)}
                style={{ border: '1px solid #EF4444', background: '#FEF2F2', color: '#DC2626', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                Report Delay
              </button>
            </>
          )}
          {t.status === 'Delayed' && (
            <button
              onClick={() => endTrip(t.id)}
              style={{ border: 'none', background: '#F59E0B', color: '#FFF', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
            >
              Resolve & Complete
            </button>
          )}
          {t.status === 'Completed' && (
            <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700 }}>Attendance Synced</span>
          )}
        </div>
      ),
    },
  ];

  const handleDelaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDelayTrip) return;
    confirmBusDelay(selectedDelayTrip.id, Number(delayMins), delayReason);
    setSelectedDelayTrip(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Header Bar */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Trip Operations & Schedule Desk</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Start/complete morning and afternoon trips, track delays, and sync student attendance.</p>
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: 'var(--text-primary)', outline: 'none' }}
        >
          <option value="">All Trip Types</option>
          <option value="Morning Pickup">Morning Pickup</option>
          <option value="Evening Drop">Evening Drop</option>
          <option value="Special Field Trip">Special Field Trip</option>
        </select>
      </div>

      <DataGrid columns={columns} data={filteredTrips} />

      {/* Delay Modal */}
      {selectedDelayTrip && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '440px' }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>Broadcast Bus Delay Alert</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 14px 0' }}>
              Confirm delay for <strong>{selectedDelayTrip.busNumber}</strong> on <strong>{selectedDelayTrip.routeName}</strong>.
            </p>
            <form onSubmit={handleDelaySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Delay Minutes</label>
                <input type="number" value={delayMins} onChange={(e) => setDelayMins(Number(e.target.value))} style={inputStyle} min={5} required />
              </div>
              <div>
                <label style={labelStyle}>Delay Cause / Reason</label>
                <input type="text" value={delayReason} onChange={(e) => setDelayReason(e.target.value)} style={inputStyle} placeholder="e.g. Metro Construction Bottleneck" required />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setSelectedDelayTrip(null)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#EF4444', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Send Parent SMS
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
