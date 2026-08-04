import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useTransportStore } from '../shared/transportStore';
import type { MaintenanceRecord } from '../shared/types';
import { Wrench, Calendar, ShieldCheck, AlertTriangle, Plus } from 'lucide-react';

export default function MaintenanceModule() {
  const { maintenanceLogs, buses, scheduleMaintenance } = useTransportStore();
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [busNumber, setBusNumber] = useState(buses[0]?.busNumber || 'BUS-01');
  const [serviceType, setServiceType] = useState<MaintenanceRecord['serviceType']>('Regular Service');
  const [cost, setCost] = useState(8500);
  const [notes, setNotes] = useState('');

  const columns: GridColumn<MaintenanceRecord>[] = [
    { key: 'busNumber', title: 'Bus Number', render: (m) => <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--text-primary)' }}>{m.busNumber}</span> },
    { key: 'serviceType', title: 'Service Type', render: (m) => <StatusBadge status="info" label={m.serviceType} /> },
    { key: 'vendorName', title: 'Service Vendor', render: (m) => m.vendorName },
    { key: 'cost', title: 'Service Cost', render: (m) => <span style={{ fontWeight: 800, color: '#EF4444' }}>₹{m.cost.toLocaleString()}</span> },
    { key: 'serviceDate', title: 'Service Date', render: (m) => m.serviceDate },
    { key: 'nextDueDate', title: 'Next Due Date', render: (m) => m.nextDueDate },
    { key: 'status', title: 'Status', render: (m) => <StatusBadge status={m.status === 'Completed' ? 'success' : m.status === 'Scheduled' ? 'warning' : 'danger'} label={m.status} /> },
  ];

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleMaintenance(busNumber, serviceType, Number(cost), notes);
    setShowModal(false);
    setNotes('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Vehicle Maintenance & Servicing Desk</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Track regular servicing, oil & filter changes, tyre replacements, and vehicle fitness inspections.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#3B82F6', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Schedule Vehicle Servicing
        </button>
      </div>

      <DataGrid columns={columns} data={maintenanceLogs} />

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '460px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Schedule Vehicle Servicing</h3>
            <form onSubmit={handleScheduleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Select Bus</label>
                <select value={busNumber} onChange={(e) => setBusNumber(e.target.value)} style={inputStyle}>
                  {buses.map((b) => (
                    <option key={b.id} value={b.busNumber}>{b.busNumber} ({b.registrationNumber})</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Service Type</label>
                  <select value={serviceType} onChange={(e) => setServiceType(e.target.value as any)} style={inputStyle}>
                    <option value="Regular Service">Regular Service</option>
                    <option value="Tyre Replacement">Tyre Replacement</option>
                    <option value="Engine Repair">Engine Repair</option>
                    <option value="Oil & Filter">Oil & Filter</option>
                    <option value="Brake Inspection">Brake Inspection</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Estimated Cost (₹)</label>
                  <input type="number" value={cost} onChange={(e) => setCost(Number(e.target.value))} style={inputStyle} required />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Servicing Notes / Work Order Details</label>
                <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} style={inputStyle} placeholder="e.g. 50,000 km oil change & synthetic filter" />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#3B82F6', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Schedule Servicing
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
