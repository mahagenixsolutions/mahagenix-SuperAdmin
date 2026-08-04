import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockStaffEntries } from '../shared/mockSecurityData';
import type { StaffEntryLog } from '../shared/types';
import { Users, Clock, Radio } from 'lucide-react';

export default function StaffEntryModule() {
  const [entries, setEntries] = useState<StaffEntryLog[]>(mockStaffEntries);

  const columns: GridColumn<StaffEntryLog>[] = [
    { key: 'empId', title: 'Emp ID', render: (st) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{st.empId}</span> },
    { key: 'staffName', title: 'Staff Member Name', render: (st) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{st.staffName}</span> },
    { key: 'designation', title: 'Designation / Dept', render: (st) => `${st.designation} (${st.department})` },
    { key: 'rfidCardId', title: 'RFID Badge ID', render: (st) => st.rfidCardId },
    { key: 'checkInTime', title: 'Gate Check In / Out', render: (st) => `${st.checkInTime} ${st.checkOutTime ? `- ${st.checkOutTime}` : ''}` },
    { key: 'status', title: 'Status', render: (st) => <StatusBadge status={st.status === 'On Duty' ? 'success' : 'warning'} label={st.status} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Faculty & Staff RFID Gate Attendance Register</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Track teacher and staff RFID turnstile check-ins, late entry warnings, and overtime logs.</p>
        </div>
      </div>

      <DataGrid columns={columns} data={entries} />
    </div>
  );
}
