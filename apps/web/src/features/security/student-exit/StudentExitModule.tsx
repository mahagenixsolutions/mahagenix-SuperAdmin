import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockStudentExits } from '../shared/mockSecurityData';
import type { StudentExitPermit } from '../shared/types';
import { Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function StudentExitModule() {
  const [exits, setExits] = useState<StudentExitPermit[]>(mockStudentExits);

  const columns: GridColumn<StudentExitPermit>[] = [
    { key: 'passNumber', title: 'Pass #', render: (s) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{s.passNumber}</span> },
    { key: 'studentName', title: 'Student Name', render: (s) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{s.studentName} ({s.classGrade})</span> },
    { key: 'exitReason', title: 'Exit Reason', render: (s) => <StatusBadge status="info" label={s.exitReason} /> },
    { key: 'guardianName', title: 'Guardian / Phone', render: (s) => `${s.guardianName} (${s.guardianPhone})` },
    { key: 'approvalStatus', title: 'Principal Approval', render: (s) => <StatusBadge status="success" label={s.approvalStatus} /> },
    { key: 'exitTime', title: 'Exit / Est Return', render: (s) => `${s.exitTime} (Est: ${s.expectedReturnTime})` },
    { key: 'status', title: 'Status', render: (s) => <StatusBadge status={s.status === 'Returned' ? 'success' : 'warning'} label={s.status} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Student Early Exit Register & Guardian Verification</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Process medical exit permits, parent pickup verification, and Principal approvals.</p>
        </div>
        <button style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#3B82F6', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
          + Issue Student Exit Pass
        </button>
      </div>

      <DataGrid columns={columns} data={exits} />
    </div>
  );
}
