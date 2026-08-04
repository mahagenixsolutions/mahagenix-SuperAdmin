import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { KPICard } from '../../../components/erp/KPICard';
import { useLibraryStore } from '../shared/libraryStore';
import type { InventoryCopy } from '../shared/types';
import { QrCode, Barcode, ShieldAlert, CheckCircle2, RefreshCw, Printer, Search, X } from 'lucide-react';

export default function BookInventoryModule() {
  const { inventory, books, showToast } = useLibraryStore();
  const [shelfFilter, setShelfFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');
  const [search, setSearch] = useState('');
  const [showBarcodeSheet, setShowBarcodeSheet] = useState(false);

  const filteredInventory = inventory.filter((item) => {
    const matchSearch =
      item.bookTitle.toLowerCase().includes(search.toLowerCase()) ||
      item.barcode.toLowerCase().includes(search.toLowerCase()) ||
      item.shelf.toLowerCase().includes(search.toLowerCase());
    const matchShelf = !shelfFilter || item.shelf.toLowerCase().includes(shelfFilter.toLowerCase());
    const matchCondition = !conditionFilter || item.condition === conditionFilter;
    return matchSearch && matchShelf && matchCondition;
  });

  const availableCount = inventory.filter((i) => i.status === 'Available').length;
  const issuedCount = inventory.filter((i) => i.status === 'Issued').length;
  const auditCount = inventory.filter((i) => i.condition === 'Needs Repair' || i.condition === 'Damaged' || i.status === 'Under Audit').length;

  const columns: GridColumn<InventoryCopy>[] = [
    { key: 'barcode', title: 'Barcode Copy ID', render: (inv) => <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--text-primary)' }}>{inv.barcode}</span> },
    { key: 'bookTitle', title: 'Book Title', render: (inv) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{inv.bookTitle}</span> },
    { key: 'shelf', title: 'Shelf Rack', render: (inv) => <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{inv.shelf}</span> },
    {
      key: 'condition',
      title: 'Condition',
      render: (inv) => (
        <StatusBadge
          status={inv.condition === 'Good' ? 'success' : inv.condition === 'Fair' ? 'warning' : 'danger'}
          label={inv.condition}
        />
      ),
    },
    {
      key: 'status',
      title: 'Stock Status',
      render: (inv) => (
        <StatusBadge
          status={inv.status === 'Available' ? 'success' : inv.status === 'Issued' ? 'info' : 'warning'}
          label={inv.status}
        />
      ),
    },
    { key: 'addedDate', title: 'Added Date', render: (inv) => inv.addedDate },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
        <KPICard title="REGISTERED PHYSICAL COPIES" value={inventory.length.toString()} icon={<Barcode size={20} />} />
        <KPICard title="AVAILABLE ON SHELF" value={availableCount.toString()} icon={<CheckCircle2 size={20} />} tone="success" />
        <KPICard title="ISSUED COPIES" value={issuedCount.toString()} icon={<Barcode size={20} />} tone="primary" />
        <KPICard title="NEEDS AUDIT / REPAIR" value={`${auditCount} Copies`} icon={<ShieldAlert size={20} />} tone="warning" />
        <KPICard title="STOCK VERIFICATION ACCURACY" value="99.6%" icon={<RefreshCw size={20} />} tone="info" />
      </div>

      {/* Control Bar */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '260px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '8px 12px' }}>
          <Search size={16} style={{ color: 'var(--text-secondary)' }} />
          <input
            type="text"
            placeholder="Filter by Copy Barcode, Title, Shelf Rack..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13px', color: 'var(--text-primary)' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <select value={conditionFilter} onChange={(e) => setConditionFilter(e.target.value)} style={selectStyle}>
            <option value="">All Conditions</option>
            <option value="Good">Good Condition</option>
            <option value="Fair">Fair</option>
            <option value="Needs Repair">Needs Repair</option>
            <option value="Damaged">Damaged</option>
          </select>

          <button
            onClick={() => setShowBarcodeSheet(true)}
            style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Printer size={16} /> Batch Barcode Label Sheet
          </button>
        </div>
      </div>

      <DataGrid columns={columns} data={filteredInventory} />

      {/* Barcode Sheet Modal */}
      {showBarcodeSheet && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{ background: '#FFF', color: '#111827', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '640px', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #E5E7EB', paddingBottom: '12px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>Library Barcode & QR Code Label Sheet</h3>
                <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#6B7280' }}>Print physical barcode labels for book spines and shelf mapping.</p>
              </div>
              <button onClick={() => setShowBarcodeSheet(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
              {inventory.map((item) => (
                <div key={item.id} style={{ border: '2px dashed #9CA3AF', borderRadius: '8px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F9FAFB' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#4F46E5', display: 'block' }}>{item.shelf}</span>
                    <strong style={{ fontSize: '12px', display: 'block', color: '#111827' }}>{item.bookTitle}</strong>
                    <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#374151', display: 'block', marginTop: '4px', background: '#E5E7EB', padding: '2px 6px', borderRadius: '4px' }}>
                      {item.barcode}
                    </span>
                  </div>
                  <Barcode size={36} color="#111827" />
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowBarcodeSheet(false)} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #D1D5DB', background: '#F3F4F6', color: '#111827', fontWeight: 700, cursor: 'pointer' }}>Close</button>
              <button onClick={() => window.print()} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#4F46E5', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>Print Label Sheet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  border: '1px solid var(--border-subtle)',
  background: 'var(--bg-surface-raised)',
  borderRadius: '8px',
  padding: '8px 12px',
  fontSize: '12px',
  color: 'var(--text-primary)',
  outline: 'none',
};
