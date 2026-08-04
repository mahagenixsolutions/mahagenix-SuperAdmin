import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockAttendance } from '../shared/mockHRData';
import type { HRAttendance } from '../shared/types';
import { Clock, Calendar, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function HRAttendanceModule() {
  const [attendance, setAttendance] = useState<HRAttendance[]>(mockAttendance);

  const columns: GridColumn<HRAttendance>[] = [
    { key: 'empId', title: 'Emp ID', render: (a) => <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{a.empId}</span> },
    { key: 'empName', title: 'Employee Name', render: (a) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{a.empName}</span> },
    { key: 'department', title: 'Department', render: (a) => <StatusBadge status="info" label={a.department} /> },
    { key: 'date', title: 'Date', render: (a) => a.date },
    { key: 'checkIn', title: 'Check In', render: (a) => <span style={{ fontWeight: 700, color: a.status === 'Late' ? '#EF4444' : '#10B981' }}>{a.checkIn}</span> },
    { key: 'checkOut', title: 'Check Out', render: (a) => a.checkOut },
    { key: 'overtimeHours', title: 'Overtime', render: (a) => a.overtimeHours > 0 ? <span style={{ fontWeight: 800, color: '#3B82F6' }}>+{a.overtimeHours} hrs</span> : '0 hrs' },
    { key: 'status', title: 'Status', render: (a) => <StatusBadge status={a.status === 'Present' ? 'success' : a.status === 'Late' ? 'warning' : 'danger'} label={a.status} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Employee Attendance & Overtime Tracker</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Biometric check in/out logs, late arrivals, and overtime calculations.</p>
        </div>
        <button style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#3B82F6', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
          + Attendance Correction
        </button>
      </div>

      <DataGrid columns={columns} data={attendance} />
    </div>
  );
}
