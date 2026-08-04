import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { DetailDrawer } from '../../../components/erp/DetailDrawer';
import { useHostelStore } from '../shared/hostelStore';
import type { HostelRoom } from '../shared/types';
import { Search, Bed, Building, CheckCircle2, DollarSign, Plus } from 'lucide-react';

export default function RoomsModule() {
  const { rooms, showToast } = useHostelStore();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<HostelRoom | null>(null);

  const filtered = rooms.filter((r) => {
    const matchSearch =
      r.roomNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.buildingName.toLowerCase().includes(search.toLowerCase());
    const matchType = !selectedType || r.roomType === selectedType;
    return matchSearch && matchType;
  });

  const columns: GridColumn<HostelRoom>[] = [
    { key: 'roomNumber', title: 'Room Number', render: (r) => <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--text-primary)' }}>{r.roomNumber}</span> },
    { key: 'buildingName', title: 'Building Block', render: (r) => <StatusBadge status="info" label={r.buildingName} /> },
    { key: 'floorNo', title: 'Floor', render: (r) => `Floor ${r.floorNo}` },
    { key: 'roomType', title: 'Room Type', render: (r) => r.roomType },
    { key: 'capacityBeds', title: 'Beds Occupancy', render: (r) => `${r.occupiedBeds} / ${r.capacityBeds} Beds` },
    { key: 'monthlyFee', title: 'Monthly Fee', render: (r) => <span style={{ fontWeight: 700, color: '#10B981' }}>₹{r.monthlyFee.toLocaleString()}</span> },
    { key: 'status', title: 'Status', render: (r) => <StatusBadge status={r.status === 'Fully Occupied' ? 'success' : r.status === 'Available' ? 'info' : 'warning'} label={r.status} /> },
    {
      key: 'id',
      title: 'Details',
      render: (r) => (
        <button
          onClick={() => setSelectedRoom(r)}
          style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
        >
          View Specs
        </button>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Search & Filter Bar */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '280px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '8px 12px' }}>
          <Search size={16} style={{ color: 'var(--text-secondary)' }} />
          <input
            type="text"
            placeholder="Search by Room Number, Building Block..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13px', color: 'var(--text-primary)' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: 'var(--text-primary)', outline: 'none' }}
          >
            <option value="">All Room Types</option>
            <option value="Single Deluxe">Single Deluxe</option>
            <option value="Double Sharing">Double Sharing</option>
            <option value="Triple Sharing">Triple Sharing</option>
            <option value="Four Bed Dorm">Four Bed Dorm</option>
          </select>

          <button
            onClick={() => showToast('Create Room modal triggered.')}
            style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#6366F1', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={16} /> Create New Room
          </button>
        </div>
      </div>

      <DataGrid columns={columns} data={filtered} />

      {/* DetailDrawer for Room Specs */}
      <DetailDrawer
        isOpen={!!selectedRoom}
        onClose={() => setSelectedRoom(null)}
        title={selectedRoom ? `Room ${selectedRoom.roomNumber}` : 'Room Specs'}
      >
        {selectedRoom && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: '"Outfit", sans-serif' }}>
            <div style={{ background: 'var(--bg-surface-raised)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#6366F1', textTransform: 'uppercase' }}>{selectedRoom.roomType} • Floor {selectedRoom.floorNo}</span>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>Room {selectedRoom.roomNumber}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>{selectedRoom.buildingName}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>Occupied Beds</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedRoom.occupiedBeds} Beds</strong>
              </div>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>Available Vacant Beds</span>
                <strong style={{ color: '#10B981' }}>{selectedRoom.availableBeds} Vacant</strong>
              </div>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>Monthly Fee</span>
                <strong style={{ color: 'var(--text-primary)' }}>₹{selectedRoom.monthlyFee.toLocaleString()} / mo</strong>
              </div>
              <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '11px' }}>Room Condition</span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedRoom.condition}</strong>
              </div>
            </div>

            <div style={{ padding: '12px', borderRadius: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', fontSize: '12px' }}>
              <span style={{ fontWeight: 800, color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Furniture Inventory</span>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{selectedRoom.furnitureDetails.join(', ')}</p>
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
}
