import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockGatePasses } from '../shared/mockHostelData';
import type { GatePass } from '../shared/types';
import { FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function GatePassModule() {
  const [passes, setPasses] = useState<GatePass[]>(mockGatePasses);
  const [toast, setToast] = useState<string | null>(null);

  const handleApprovePass = (id: string, name: string) => {
    setPasses(passes.map(p => p.id === id ? { ...p, status: 'Approved', parentApproval: 'Approved' } : p));
    setToast(`✅ Approved: Weekend Gate Pass approved for ${name}.`);
    setTimeout(() => setToast(null), 3500);
  };

  const columns: GridColumn<GatePass>[] = [
    { key: 'passNumber', title: 'Pass #', render: (p) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{p.passNumber}</span> },
    { key: 'studentName', title: 'Student Name', render: (p) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{p.studentName} (Room {p.roomNumber})</span> },
    { key: 'passType', title: 'Pass Type', render: (p) => <StatusBadge status="info" label={p.passType} /> },
    { key: 'departureDate', title: 'Departure Date', render: (p) => p.departureDate },
    { key: 'expectedReturn', title: 'Expected Return', render: (p) => p.expectedReturn },
    { key: 'parentApproval', title: 'Parent Permission', render: (p) => <StatusBadge status={p.parentApproval === 'Approved' ? 'success' : 'warning'} label={p.parentApproval} /> },
    { key: 'status', title: 'Pass Status', render: (p) => <StatusBadge status={p.status === 'Approved' ? 'success' : 'warning'} label={p.status} /> },
    { key: 'id', title: 'Action', render: (p) => (
      p.status === 'Pending' ? (
        <button onClick={() => handleApprovePass(p.id, p.studentName)} style={{ border: 'none', background: '#6366F1', color: '#FFF', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
          Approve Pass
        </button>
      ) : (
        <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700 }}>Approved</span>
      )
    ) }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      {toast && (
        <div style={{ padding: '12px 18px', borderRadius: '10px', background: 'var(--bg-surface-raised)', border: '1px solid #10B981', fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>
          {toast}
        </div>
      )}

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Gate Pass Approvals & Outing Permits</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Process weekend leave requests, emergency passes, parent approvals, and track late returns.</p>
        </div>
        <button style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#6366F1', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
          + Issue Gate Pass
        </button>
      </div>

      <DataGrid columns={columns} data={passes} />
    </div>
  );
}
