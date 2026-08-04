import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useReceptionStore } from '../shared/receptionStore';
import type { LostFoundItem } from '../shared/types';
import { Search, Package, CheckCircle2, Plus } from 'lucide-react';

export default function LostFoundModule() {
  const { lostFoundItems, reportLostFoundItem } = useReceptionStore();
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [type, setType] = useState<LostFoundItem['type']>('Found');
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState<LostFoundItem['category']>('Water Bottle');
  const [location, setLocation] = useState('Basketball Court');

  const columns: GridColumn<LostFoundItem>[] = [
    { key: 'itemCode', title: 'Item Code', render: (l) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{l.itemCode}</span> },
    { key: 'type', title: 'Type', render: (l) => <StatusBadge status={l.type === 'Found' ? 'success' : 'danger'} label={l.type} /> },
    { key: 'itemName', title: 'Item Description', render: (l) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{l.itemName}</span> },
    { key: 'category', title: 'Category', render: (l) => <StatusBadge status="info" label={l.category} /> },
    { key: 'locationFoundLost', title: 'Location', render: (l) => l.locationFoundLost },
    { key: 'dateReported', title: 'Date Reported', render: (l) => l.dateReported },
    { key: 'status', title: 'Status', render: (l) => <StatusBadge status={l.status === 'Claimed' ? 'success' : 'warning'} label={l.status} /> },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName) return;
    reportLostFoundItem(type, itemName, category, location);
    setShowModal(false);
    setItemName('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Campus Lost & Found Registry</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Log items lost or found on campus, verify student/staff claims, and record handovers.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Register Item
        </button>
      </div>

      <DataGrid columns={columns} data={lostFoundItems} />

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '440px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Register Lost / Found Item</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Report Type</label>
                  <select value={type} onChange={(e) => setType(e.target.value as any)} style={inputStyle}>
                    <option value="Found">Found Item</option>
                    <option value="Lost">Lost Item Report</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value as any)} style={inputStyle}>
                    <option value="Water Bottle">Water Bottle</option>
                    <option value="Bag / Backpack">Bag / Backpack</option>
                    <option value="Books & Stationery">Books & Stationery</option>
                    <option value="Electronics & Watch">Electronics & Watch</option>
                    <option value="Clothing / Uniform">Clothing / Uniform</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Item Description</label>
                <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} style={inputStyle} placeholder="e.g. Blue Milton Water Bottle" required />
              </div>
              <div>
                <label style={labelStyle}>Location Found / Lost</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={inputStyle} required />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                  Register Item
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
