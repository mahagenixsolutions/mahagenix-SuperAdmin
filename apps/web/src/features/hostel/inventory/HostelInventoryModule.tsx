import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useHostelStore } from '../shared/hostelStore';
import type { HostelInventoryItem } from '../shared/types';
import { Bed, Layers, CheckCircle2, Plus } from 'lucide-react';

export default function HostelInventoryModule() {
  const { inventory, showToast } = useHostelStore();

  const columns: GridColumn<HostelInventoryItem>[] = [
    { key: 'id', title: 'Asset ID', render: (i) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{i.id}</span> },
    { key: 'itemName', title: 'Asset Item Name', render: (i) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{i.itemName}</span> },
    { key: 'category', title: 'Category', render: (i) => <StatusBadge status="info" label={i.category} /> },
    { key: 'totalQuantity', title: 'Total Qty', render: (i) => `${i.totalQuantity} Units` },
    { key: 'inUseQuantity', title: 'In Active Use', render: (i) => <span style={{ fontWeight: 700, color: '#6366F1' }}>{i.inUseQuantity} Units</span> },
    { key: 'inStockQuantity', title: 'In Spare Stock', render: (i) => <span style={{ fontWeight: 700, color: '#10B981' }}>{i.inStockQuantity} Units</span> },
    { key: 'damagedQuantity', title: 'Damaged / Repair', render: (i) => <span style={{ fontWeight: 700, color: i.damagedQuantity > 0 ? '#EF4444' : 'var(--text-secondary)' }}>{i.damagedQuantity} Units</span> },
    { key: 'lastAuditDate', title: 'Last Audit Date', render: (i) => i.lastAuditDate },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Hostel Furniture & Equipment Inventory Audit</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Track single cot beds, mattresses, study tables, wardrobes, electricals, and kitchen stock.</p>
        </div>
        <button
          onClick={() => showToast('Add Inventory Stock modal triggered.')}
          style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#6366F1', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Add Inventory Stock
        </button>
      </div>

      <DataGrid columns={columns} data={inventory} />
    </div>
  );
}
