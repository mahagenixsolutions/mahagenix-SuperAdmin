import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useHostelStore } from '../shared/hostelStore';
import type { HostelAttendanceRecord } from '../shared/types';
import { Calendar, Clock, AlertTriangle, CheckCircle2, Check, X } from 'lucide-react';

export default function DailyAttendanceModule() {
  const { attendance, markNightRollCall } = useHostelStore();

  const columns: GridColumn<HostelAttendanceRecord>[] = [
    { key: 'studentId', title: 'Student ID', render: (a) => <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{a.studentId}</span> },
    { key: 'studentName', title: 'Student Name', render: (a) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{a.studentName}</span> },
    { key: 'roomNumber', title: 'Room Number', render: (a) => <StatusBadge status="info" label={a.roomNumber} /> },
    { key: 'buildingName', title: 'Building Block', render: (a) => a.buildingName },
    { key: 'date', title: 'Date', render: (a) => a.date },
    { key: 'morningStatus', title: 'Morning Check', render: (a) => <StatusBadge status={a.morningStatus === 'Present' ? 'success' : 'danger'} label={a.morningStatus} /> },
    { key: 'nightRollCallStatus', title: 'Night Curfew (09:30 PM)', render: (a) => <StatusBadge status={a.nightRollCallStatus === 'Present' ? 'success' : a.nightRollCallStatus === 'Late Return' ? 'warning' : 'danger'} label={a.nightRollCallStatus} /> },
    { key: 'remarks', title: 'Remarks / Return Time', render: (a) => <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>{a.remarks || a.returnTime || 'On Time'}</span> },
    {
      key: 'id',
      title: 'Roll Call Action',
      render: (a) => (
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => markNightRollCall(a.id, 'Present')}
            style={{ border: 'none', background: '#10B981', color: '#FFF', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
          >
            Present
          </button>
          <button
            onClick={() => markNightRollCall(a.id, 'Late Return', 'Late check-in recorded after 09:30 PM')}
            style={{ border: 'none', background: '#F59E0B', color: '#FFF', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
          >
            Late Return
          </button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Daily Hostel Attendance & Night Curfew Roll Call</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Morning roll call, night curfew check (9:30 PM), late return alerts, and warden attendance sheets.</p>
        </div>
      </div>

      <DataGrid columns={columns} data={attendance} />
    </div>
  );
}
