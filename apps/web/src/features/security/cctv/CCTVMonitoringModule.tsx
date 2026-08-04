import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockCCTV } from '../shared/mockSecurityData';
import type { CCTVCamera } from '../shared/types';
import { Video, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function CCTVMonitoringModule() {
  const [cameras, setCameras] = useState<CCTVCamera[]>(mockCCTV);

  const columns: GridColumn<CCTVCamera>[] = [
    { key: 'cameraCode', title: 'Camera Code', render: (c) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{c.cameraCode}</span> },
    { key: 'cameraName', title: 'Camera Feed Name', render: (c) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{c.cameraName}</span> },
    { key: 'location', title: 'Location', render: (c) => c.location },
    { key: 'resolution', title: 'Resolution', render: (c) => <StatusBadge status="info" label={c.resolution} /> },
    { key: 'recordingHealth', title: 'Recording Health', render: (c) => <StatusBadge status="success" label={c.recordingHealth} /> },
    { key: 'status', title: 'Feed Status', render: (c) => <StatusBadge status={c.status === 'Online' ? 'success' : 'danger'} label={c.status} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>CCTV Video Surveillance & Camera Telematics</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Monitor 24 live perimeter camera feeds, online/offline status, and DVR storage health.</p>
        </div>
      </div>

      <DataGrid columns={columns} data={cameras} />
    </div>
  );
}
