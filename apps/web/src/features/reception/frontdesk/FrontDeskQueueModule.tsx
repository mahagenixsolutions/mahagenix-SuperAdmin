import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockFrontDeskTasks } from '../shared/mockReceptionData';
import type { FrontDeskTask } from '../shared/types';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function FrontDeskQueueModule() {
  const [tasks, setTasks] = useState<FrontDeskTask[]>(mockFrontDeskTasks);

  const columns: GridColumn<FrontDeskTask>[] = [
    { key: 'taskCode', title: 'Task Code', render: (t) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{t.taskCode}</span> },
    { key: 'title', title: 'Action Item Title', render: (t) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{t.title}</span> },
    { key: 'category', title: 'Category', render: (t) => <StatusBadge status="info" label={t.category} /> },
    { key: 'assignedTo', title: 'Assigned Role', render: (t) => t.assignedTo },
    { key: 'priority', title: 'Priority', render: (t) => <StatusBadge status={t.priority === 'High' ? 'danger' : 'warning'} label={t.priority} /> },
    { key: 'status', title: 'Status', render: (t) => <StatusBadge status={t.status === 'Completed' ? 'success' : 'warning'} label={t.status} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Front Desk Queue & Emergency Contacts</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Manage daily front-desk action items, queue notes, and emergency speed dials.</p>
        </div>
      </div>

      <DataGrid columns={columns} data={tasks} />
    </div>
  );
}
