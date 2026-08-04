import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockTransportFees } from '../shared/mockTransportData';
import type { TransportFeeRecord } from '../shared/types';
import { CreditCard, Landmark, DollarSign, CheckCircle2 } from 'lucide-react';

export default function TransportFeesModule() {
  const [fees, setFees] = useState<TransportFeeRecord[]>(mockTransportFees);

  const columns: GridColumn<TransportFeeRecord>[] = [
    { key: 'studentName', title: 'Student Name', render: (f) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{f.studentName}</span> },
    { key: 'classGrade', title: 'Class', render: (f) => f.classGrade },
    { key: 'routeZone', title: 'Distance Zone', render: (f) => <StatusBadge status="info" label={f.routeZone} /> },
    { key: 'annualFee', title: 'Annual Fee', render: (f) => `₹${f.annualFee.toLocaleString()}` },
    { key: 'amountPaid', title: 'Amount Paid', render: (f) => <span style={{ fontWeight: 700, color: '#10B981' }}>₹{f.amountPaid.toLocaleString()}</span> },
    { key: 'pendingAmount', title: 'Pending Amount', render: (f) => <span style={{ fontWeight: 800, color: f.pendingAmount > 0 ? '#EF4444' : 'var(--text-muted)' }}>₹{f.pendingAmount.toLocaleString()}</span> },
    { key: 'status', title: 'Payment Status', render: (f) => <StatusBadge status={f.status === 'Paid' ? 'success' : f.status === 'Partial' ? 'warning' : 'danger'} label={f.status} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Transport Fee Structure & Collections</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Route-wise distance zone fee slabs, pending collections, and fee receipts.</p>
        </div>
      </div>

      <DataGrid columns={columns} data={fees} />
    </div>
  );
}
