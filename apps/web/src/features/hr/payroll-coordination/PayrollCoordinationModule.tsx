import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockPayrollCoordination } from '../shared/mockHRData';
import type { PayrollCoordination } from '../shared/types';
import { CreditCard, Landmark, CheckCircle2, DollarSign } from 'lucide-react';

export default function PayrollCoordinationModule() {
  const [payroll, setPayroll] = useState<PayrollCoordination[]>(mockPayrollCoordination);
  const [toast, setToast] = useState<string | null>(null);

  const handleSyncFinance = () => {
    setToast('✅ Synced: HR Payroll Coordination synced with Finance ERP Module!');
    setTimeout(() => setToast(null), 3500);
  };

  const columns: GridColumn<PayrollCoordination>[] = [
    { key: 'empId', title: 'Emp ID', render: (p) => <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{p.empId}</span> },
    { key: 'empName', title: 'Employee Name', render: (p) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{p.empName}</span> },
    { key: 'department', title: 'Department', render: (p) => <StatusBadge status="info" label={p.department} /> },
    { key: 'baseSalary', title: 'Base Salary', render: (p) => `₹${p.baseSalary.toLocaleString()}` },
    { key: 'allowances', title: 'Allowances', render: (p) => <span style={{ color: '#10B981', fontWeight: 700 }}>+₹{p.allowances.toLocaleString()}</span> },
    { key: 'deductions', title: 'Deductions', render: (p) => <span style={{ color: '#EF4444' }}>-₹{p.deductions.toLocaleString()}</span> },
    { key: 'netPayout', title: 'Net Payout', render: (p) => <span style={{ fontWeight: 800, color: '#3B82F6' }}>₹{p.netPayout.toLocaleString()}</span> },
    { key: 'financeSyncStatus', title: 'Finance Sync', render: (p) => <StatusBadge status={p.financeSyncStatus === 'Synced' ? 'success' : 'warning'} label={p.financeSyncStatus} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      {toast && (
        <div style={{ padding: '12px 18px', borderRadius: '10px', background: 'var(--bg-surface-raised)', border: '1px solid #3B82F6', fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>
          {toast}
        </div>
      )}

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Payroll Coordination & Salary Structure</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Coordinate base pay, allowances, deductions, and push monthly payroll to Finance ERP.</p>
        </div>
        <button onClick={handleSyncFinance} style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#3B82F6', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
          ⇄ Sync with Finance Module
        </button>
      </div>

      <DataGrid columns={columns} data={payroll} />
    </div>
  );
}
