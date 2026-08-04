import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockLostFoundSec } from '../shared/mockSecurityData';
import type { LostFoundSecurity } from '../shared/types';
import { Package, CheckCircle2 } from 'lucide-react';

export default function LostFoundSecurityModule() {
  const [items, setItems] = useState<LostFoundSecurity[]>(mockLostFoundSec);

  const columns: GridColumn<LostFoundSecurity>[] = [
    { key: 'itemCode', title: 'Item Code', render: (l) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{l.itemCode}</span> },
    { key: 'itemName', title: 'Found Item Description', render: (l) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{l.itemName}</span> },
    { key: 'category', title: 'Category', render: (l) => <StatusBadge status="info" label={l.category} /> },
    { key: 'locationFound', title: 'Location Found', render: (l) => l.locationFound },
    { key: 'custodyGuard', title: 'Custody Guard', render: (l) => l.custodyGuard },
    { key: 'status', title: 'Status', render: (l) => <StatusBadge status={l.status === 'Claimed' ? 'success' : 'warning'} label={l.status} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Gate 1 Security Custody - Lost & Found Registry</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Log valuables, watches, and electronics turned in at security posts.</p>
        </div>
      </div>

      <DataGrid columns={columns} data={items} />
    </div>
  );
}
