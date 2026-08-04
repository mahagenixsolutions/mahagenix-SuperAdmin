import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockCheckpoints } from '../shared/mockSecurityData';
import type { SecurityCheckpoint } from '../shared/types';
import { ShieldCheck, MapPin, Clock } from 'lucide-react';

export default function CheckpointsModule() {
  const [checkpoints, setCheckpoints] = useState<SecurityCheckpoint[]>(mockCheckpoints);

  const columns: GridColumn<SecurityCheckpoint>[] = [
    { key: 'checkpointCode', title: 'CP #', render: (c) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{c.checkpointCode}</span> },
    { key: 'checkpointName', title: 'Checkpoint Location', render: (c) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{c.checkpointName}</span> },
    { key: 'assignedGuard', title: 'Assigned Guard', render: (c) => c.assignedGuard },
    { key: 'scanInterval', title: 'Scan Interval', render: (c) => <StatusBadge status="info" label={c.scanInterval} /> },
    { key: 'lastScannedTime', title: 'Last Scan', render: (c) => c.lastScannedTime },
    { key: 'status', title: 'Status', render: (c) => <StatusBadge status={c.status === 'Active' ? 'success' : 'warning'} label={c.status} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Security Checkpoints & Guard Patrol QR Scans</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Audit perimeter wall checkpoints, guard scan frequencies, and inspection logs.</p>
        </div>
      </div>

      <DataGrid columns={columns} data={checkpoints} />
    </div>
  );
}
