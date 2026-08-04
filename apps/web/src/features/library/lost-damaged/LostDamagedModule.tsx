import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockLostDamaged } from '../shared/mockLibraryData';
import type { LostDamagedRecord } from '../shared/types';
import { ShieldAlert, AlertTriangle, Wrench, CheckCircle2 } from 'lucide-react';

export default function LostDamagedModule() {
  const [records, setRecords] = useState<LostDamagedRecord[]>(mockLostDamaged);

  const columns: GridColumn<LostDamagedRecord>[] = [
    { key: 'barcode', title: 'Copy Barcode', render: (l) => <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{l.barcode}</span> },
    { key: 'bookTitle', title: 'Book Title', render: (l) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{l.bookTitle}</span> },
    { key: 'memberName', title: 'Responsible Member', render: (l) => l.memberName },
    { key: 'type', title: 'Issue Type', render: (l) => <StatusBadge status={l.type === 'Lost' ? 'danger' : 'warning'} label={l.type} /> },
    { key: 'replacementCost', title: 'Compensation Fee', render: (l) => <span style={{ fontWeight: 800, color: '#EF4444' }}>₹{l.replacementCost}</span> },
    { key: 'compensationStatus', title: 'Payment Status', render: (l) => <StatusBadge status={l.compensationStatus === 'Paid' ? 'success' : 'warning'} label={l.compensationStatus} /> },
    { key: 'repairStatus', title: 'Repair Status', render: (l) => <StatusBadge status={l.repairStatus === 'Under Repair' ? 'info' : 'danger'} label={l.repairStatus} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Lost & Damaged Books Registry</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Track replacement costs, compensation receipts, binding repairs, and insurance claims.</p>
        </div>
        <button style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#EF4444', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
          + Report Damaged / Lost Book
        </button>
      </div>

      <DataGrid columns={columns} data={records} />
    </div>
  );
}
