import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useTransportStore } from '../shared/transportStore';
import type { TransportRequestItem } from '../shared/types';
import { FileText, CheckCircle2, XCircle, Clock } from 'lucide-react';

export default function TransportRequestsModule() {
  const { requests, approveRequest, rejectRequest } = useTransportStore();

  const columns: GridColumn<TransportRequestItem>[] = [
    { key: 'id', title: 'Ref #', render: (r) => <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{r.id}</span> },
    { key: 'studentName', title: 'Student Name', render: (r) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{r.studentName}</span> },
    { key: 'classGrade', title: 'Class Grade', render: (r) => r.classGrade },
    { key: 'requestType', title: 'Request Type', render: (r) => <StatusBadge status="info" label={r.requestType} /> },
    { key: 'requestedRoute', title: 'Requested Route', render: (r) => <span style={{ fontWeight: 700, color: '#3B82F6' }}>{r.requestedRoute}</span> },
    { key: 'requestedStop', title: 'Requested Stop', render: (r) => r.requestedStop },
    { key: 'reason', title: 'Reason', render: (r) => <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>{r.reason}</span> },
    { key: 'requestDate', title: 'Date', render: (r) => r.requestDate },
    { key: 'status', title: 'Status', render: (r) => <StatusBadge status={r.status === 'Approved' ? 'success' : r.status === 'Rejected' ? 'danger' : 'warning'} label={r.status} /> },
    {
      key: 'id',
      title: 'Desk Action',
      render: (r) =>
        r.status === 'Pending' ? (
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => approveRequest(r.id)}
              style={{ border: 'none', background: '#10B981', color: '#FFF', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
            >
              Approve & Assign
            </button>
            <button
              onClick={() => rejectRequest(r.id)}
              style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
            >
              Reject
            </button>
          </div>
        ) : (
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{r.status}</span>
        ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Transport Allocation & Change Requests Queue</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Approve new transport applications, route change requests, and pickup/drop stop updates.</p>
        </div>
      </div>

      <DataGrid columns={columns} data={requests} />
    </div>
  );
}
