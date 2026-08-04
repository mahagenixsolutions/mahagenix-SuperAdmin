import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { DetailDrawer } from '../../../components/erp/DetailDrawer';
import { useTransportStore } from '../shared/transportStore';
import type { BusVehicle } from '../shared/types';
import { Search, Bus, ShieldCheck, MapPin, User, Calendar, Plus, X } from 'lucide-react';

export default function FleetModule() {
  const { buses, addVehicle, showToast } = useTransportStore();
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedBus, setSelectedBus] = useState<BusVehicle | null>(null);

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [busNumber, setBusNumber] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [capacity, setCapacity] = useState(45);
  const [fuelType, setFuelType] = useState<'Diesel' | 'EV' | 'CNG'>('Diesel');
  const [assignedDriverName, setAssignedDriverName] = useState('');
  const [assignedRouteName, setAssignedRouteName] = useState('');

  const filtered = buses.filter((b) => {
    const matchSearch =
      b.busNumber.toLowerCase().includes(search.toLowerCase()) ||
      b.registrationNumber.toLowerCase().includes(search.toLowerCase()) ||
      (b.assignedDriverName && b.assignedDriverName.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = !selectedStatus || b.status === selectedStatus;
    return matchSearch && matchStatus;
  });

  const columns: GridColumn<BusVehicle>[] = [
    { key: 'busNumber', title: 'Vehicle Number', render: (b) => <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--text-primary)' }}>{b.busNumber}</span> },
    { key: 'registrationNumber', title: 'Registration #', render: (b) => <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{b.registrationNumber}</span> },
    { key: 'capacity', title: 'Capacity', render: (b) => `${b.capacity} Seats` },
    { key: 'fuelType', title: 'Fuel Type', render: (b) => <StatusBadge status={b.fuelType === 'EV' ? 'success' : 'info'} label={b.fuelType} /> },
    { key: 'assignedDriverName', title: 'Assigned Driver', render: (b) => b.assignedDriverName || 'Unassigned' },
    { key: 'assignedRouteName', title: 'Assigned Route', render: (b) => <StatusBadge status="info" label={b.assignedRouteName || 'Unassigned'} /> },
    { key: 'status', title: 'Status', render: (b) => <StatusBadge status={b.status === 'Active' ? 'success' : b.status === 'In Servicing' ? 'danger' : 'warning'} label={b.status} /> },
    {
      key: 'id',
      title: 'Details',
      render: (b) => (
        <button
          onClick={() => setSelectedBus(b)}
          style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
        >
          View Details
        </button>
      ),
    },
  ];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!busNumber || !registrationNumber) return;
    addVehicle({
      busNumber,
      registrationNumber,
      capacity: Number(capacity),
      fuelType,
      assignedDriverName,
      assignedRouteName,
    });
    setShowAddModal(false);
    setBusNumber('');
    setRegistrationNumber('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Search & Filter Bar */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '280px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '8px 12px' }}>
          <Search size={16} style={{ color: 'var(--text-secondary)' }} />
          <input
            type="text"
            placeholder="Search by Vehicle No, Reg No, Driver Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13px', color: 'var(--text-primary)' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: 'var(--text-primary)', outline: 'none' }}
          >
            <option value="">All Vehicle Statuses</option>
            <option value="Active">Active Only</option>
            <option value="In Servicing">In Servicing</option>
            <option value="Out of Service">Out of Service</option>
          </select>

          <button
            onClick={() => setShowAddModal(true)}
            style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#10B981', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={16} /> Add Bus to Fleet
          </button>
        </div>
      </div>

      <DataGrid columns={columns} data={filtered} />

      {/* DetailDrawer for Bus Specifications */}
      <DetailDrawer
        isOpen={!!selectedBus}
        onClose={() => setSelectedBus(null)}
        title={selectedBus ? selectedBus.busNumber : 'Bus Specifications'}
      >
        {selectedBus && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: '"Outfit", sans-serif' }}>
            <div style={{ background: 'var(--bg-surface-raised)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#10B981', textTransform: 'uppercase' }}>{selectedBus.registrationNumber} • {selectedBus.capacity} Seats ({selectedBus.fuelType})</span>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>{selectedBus.busNumber}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>Assigned Driver: {selectedBus.assignedDriverName || 'Unassigned'}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>Assigned Route</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedBus.assignedRouteName || 'Unassigned'}</strong>
              </div>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>Fuel Level</span>
                <strong style={{ color: '#10B981' }}>{selectedBus.currentFuelLevelPercent}% Tank</strong>
              </div>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>Insurance Expiry</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedBus.insuranceExpiry}</strong>
              </div>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>Fitness Expiry</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedBus.fitnessExpiry}</strong>
              </div>
            </div>

            <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', fontSize: '12px' }}>
              <span style={{ fontWeight: 800, color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Total Mileage & Last Service</span>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Odometer: <strong>{selectedBus.totalKmDriven.toLocaleString()} KM</strong> | Last Servicing: <strong>{selectedBus.lastServiceDate}</strong></p>
            </div>
          </div>
        )}
      </DetailDrawer>

      {/* Add Bus Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '480px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Add New Bus to Fleet</h3>
            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Bus Number</label>
                  <input type="text" value={busNumber} onChange={(e) => setBusNumber(e.target.value)} style={inputStyle} placeholder="e.g. BUS-06" required />
                </div>
                <div>
                  <label style={labelStyle}>Registration No (RC)</label>
                  <input type="text" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} style={inputStyle} placeholder="KA-01-EQ-9999" required />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Seating Capacity</label>
                  <input type="number" value={capacity} onChange={(e) => setCapacity(Number(e.target.value))} style={inputStyle} min={10} required />
                </div>
                <div>
                  <label style={labelStyle}>Fuel Type</label>
                  <select value={fuelType} onChange={(e) => setFuelType(e.target.value as any)} style={inputStyle}>
                    <option value="Diesel">Diesel</option>
                    <option value="EV">EV (Electric)</option>
                    <option value="CNG">CNG</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Assigned Driver Name</label>
                <input type="text" value={assignedDriverName} onChange={(e) => setAssignedDriverName(e.target.value)} style={inputStyle} placeholder="e.g. Rajesh Kumar" />
              </div>
              <div>
                <label style={labelStyle}>Assigned Route Name</label>
                <input type="text" value={assignedRouteName} onChange={(e) => setAssignedRouteName(e.target.value)} style={inputStyle} placeholder="e.g. North Circuit Express" />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#10B981', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Register Vehicle
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
