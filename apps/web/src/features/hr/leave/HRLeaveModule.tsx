import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockLeaves } from '../shared/mockHRData';
import type { HRLeave } from '../shared/types';
import { Calendar, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export default function HRLeaveModule() {
  const [leaves, setLeaves] = useState<HRLeave[]>(mockLeaves);
  const [toast, setToast] = useState<string | null>(null);

  const handleApprove = (id: string, empName: string) => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status: 'Approved' } : l));
    setToast(`✅ Approved: Leave request approved for ${empName}.`);
    setTimeout(() => setToast(null), 3500);
  };

  const handleReject = (id: string, empName: string) => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status: 'Rejected' } : l));
    setToast(`❌ Rejected: Leave request rejected for ${empName}.`);
    setTimeout(() => setToast(null), 3500);
  };

  const columns: GridColumn<HRLeave>[] = [
    { key: 'empName', title: 'Employee Name', render: (l) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{l.empName}</span> },
    { key: 'department', title: 'Department', render: (l) => <StatusBadge status="info" label={l.department} /> },
    { key: 'leaveType', title: 'Leave Type', render: (l) => <span style={{ fontWeight: 700 }}>{l.leaveType}</span> },
    { key: 'startDate', title: 'Duration', render: (l) => <span>{l.startDate} to {l.endDate} ({l.durationDays} Days)</span> },
    { key: 'reason', title: 'Reason', render: (l) => <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{l.reason}</span> },
    { key: 'status', title: 'Status', render: (l) => <StatusBadge status={l.status === 'Approved' ? 'success' : l.status === 'Pending' ? 'warning' : 'danger'} label={l.status} /> },
    { key: 'id', title: 'Action', render: (l) => (
      l.status === 'Pending' ? (
        <div style={{ display: 'flex', gap: '6px' }}>
          <button onClick={() => handleApprove(l.id, l.empName)} style={{ border: 'none', background: '#10B981', color: '#FFF', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
            Approve
          </button>
          <button onClick={() => handleReject(l.id, l.empName)} style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: '#EF4444', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
            Reject
          </button>
        </div>
      ) : (
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Decision Recorded</span>
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
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Leave Requests & Balance Approvals</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Review sick, casual, earned, and emergency leave applications.</p>
        </div>
      </div>

      <DataGrid columns={columns} data={leaves} />
    </div>
  );
}
