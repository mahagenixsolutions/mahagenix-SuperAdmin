import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockMaintenance } from '../shared/mockHostelData';
import type { HostelMaintenance } from '../shared/types';
import { Wrench, Calendar, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function MaintenanceModule() {
  const [maintenance, setMaintenance] = useState<HostelMaintenance[]>(mockMaintenance);

  const columns: GridColumn<HostelMaintenance>[] = [
    { key: 'requestCode', title: 'Request #', render: (m) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{m.requestCode}</span> },
    { key: 'roomNumber', title: 'Room / Block', render: (m) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{m.roomNumber} ({m.buildingName})</span> },
    { key: 'issueType', title: 'Issue Type', render: (m) => <StatusBadge status="info" label={m.issueType} /> },
    { key: 'reportedBy', title: 'Reported By', render: (m) => m.reportedBy },
    { key: 'reportDate', title: 'Reported Date', render: (m) => m.reportDate },
    { key: 'vendorName', title: 'Assigned Technician', render: (m) => m.vendorName },
    { key: 'status', title: 'Status', render: (m) => <StatusBadge status={m.status === 'Completed' ? 'success' : m.status === 'In Progress' ? 'warning' : 'danger'} label={m.status} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Room Maintenance & Repair Desk</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Process electrical, plumbing, carpentry, and AC repair requests reported by students.</p>
        </div>
        <button style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#6366F1', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
          + Schedule Maintenance
        </button>
      </div>

      <DataGrid columns={columns} data={maintenance} />
    </div>
  );
}
