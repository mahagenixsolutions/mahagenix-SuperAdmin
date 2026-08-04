import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockGuardPatrols } from '../shared/mockSecurityData';
import type { GuardPatrol } from '../shared/types';
import { ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';

export default function PatrolManagementModule() {
  const [patrols, setPatrols] = useState<GuardPatrol[]>(mockGuardPatrols);

  const columns: GridColumn<GuardPatrol>[] = [
    { key: 'patrolCode', title: 'Patrol #', render: (p) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{p.patrolCode}</span> },
    { key: 'routeName', title: 'Patrol Route', render: (p) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{p.routeName}</span> },
    { key: 'guardName', title: 'Assigned Guard', render: (p) => <span style={{ fontWeight: 700, color: '#3B82F6' }}>{p.guardName}</span> },
    { key: 'assignedShift', title: 'Shift', render: (p) => <StatusBadge status="info" label={p.assignedShift} /> },
    { key: 'checkpointsCovered', title: 'GPS Checkpoints', render: (p) => `${p.checkpointsCovered} / ${p.checkpointsTotal} Covered` },
    { key: 'startTime', title: 'Patrol Duration', render: (p) => `${p.startTime} ${p.endTime ? `- ${p.endTime}` : ''}` },
    { key: 'status', title: 'Status', render: (p) => <StatusBadge status={p.status === 'Completed' ? 'success' : 'warning'} label={p.status} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Guard Patrol Schedules & GPS Checkpoints</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Track perimeter routine patrols, GPS QR checkpoint scans, and missed patrol alerts.</p>
        </div>
        <button style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#3B82F6', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
          + Start Guard Patrol
        </button>
      </div>

      <DataGrid columns={columns} data={patrols} />
    </div>
  );
}
