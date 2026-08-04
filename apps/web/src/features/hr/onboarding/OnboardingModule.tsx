import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockOnboarding } from '../shared/mockHRData';
import type { OnboardingTask } from '../shared/types';
import { CheckCircle2, UserCheck, ShieldCheck, Laptop } from 'lucide-react';

export default function OnboardingModule() {
  const [tasks, setTasks] = useState<OnboardingTask[]>(mockOnboarding);

  const columns: GridColumn<OnboardingTask>[] = [
    { key: 'candidateName', title: 'New Hire Name', render: (o) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{o.candidateName}</span> },
    { key: 'position', title: 'Role Title', render: (o) => o.position },
    { key: 'department', title: 'Department', render: (o) => <StatusBadge status="info" label={o.department} /> },
    { key: 'docVerification', title: 'Doc Verification', render: (o) => <StatusBadge status={o.docVerification === 'Completed' ? 'success' : 'warning'} label={o.docVerification} /> },
    { key: 'empIdGenerated', title: 'Employee ID Gen', render: (o) => o.empIdGenerated ? <span style={{ color: '#10B981', fontWeight: 800 }}>✓ Generated</span> : <span style={{ color: 'var(--text-muted)' }}>Pending</span> },
    { key: 'assetAssigned', title: 'Asset Allocation', render: (o) => o.assetAssigned ? <span style={{ color: '#10B981', fontWeight: 800 }}>✓ Laptop Assigned</span> : <span style={{ color: '#F59E0B', fontWeight: 700 }}>Pending</span> },
    { key: 'status', title: 'Overall Status', render: (o) => <StatusBadge status={o.status === 'Completed' ? 'success' : 'warning'} label={o.status} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Employee Onboarding Checklist</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Track document verification, ID generation, account creation, and asset assignment.</p>
        </div>
      </div>
      <DataGrid columns={columns} data={tasks} />
    </div>
  );
}
