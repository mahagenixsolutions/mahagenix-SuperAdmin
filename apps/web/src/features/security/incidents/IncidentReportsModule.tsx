import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockIncidents } from '../shared/mockSecurityData';
import type { SecurityIncident } from '../shared/types';
import { AlertTriangle, ShieldAlert, Paperclip } from 'lucide-react';

export default function IncidentReportsModule() {
  const [incidents, setIncidents] = useState<SecurityIncident[]>(mockIncidents);

  const columns: GridColumn<SecurityIncident>[] = [
    { key: 'incidentCode', title: 'Incident #', render: (i) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{i.incidentCode}</span> },
    { key: 'category', title: 'Category', render: (i) => <StatusBadge status="warning" label={i.category} /> },
    { key: 'severity', title: 'Severity Level', render: (i) => <StatusBadge status={i.severity === 'Critical' ? 'danger' : 'warning'} label={i.severity} /> },
    { key: 'location', title: 'Campus Location', render: (i) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{i.location}</span> },
    { key: 'reportedBy', title: 'Reported By', render: (i) => i.reportedBy },
    { key: 'description', title: 'Summary', render: (i) => <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{i.description}</span> },
    { key: 'resolutionStatus', title: 'Status', render: (i) => <StatusBadge status={i.resolutionStatus === 'Resolved' ? 'success' : 'warning'} label={i.resolutionStatus} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Security Incident Reports & Investigation Logs</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Log security breaches, medical incidents, property damage, and evidence photos.</p>
        </div>
        <button style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#EF4444', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
          + Log Incident Report
        </button>
      </div>

      <DataGrid columns={columns} data={incidents} />
    </div>
  );
}
