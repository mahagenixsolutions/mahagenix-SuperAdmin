import React, { useState } from 'react';
import { Clock, CheckCircle2, AlertTriangle, Building, CheckCircle } from 'lucide-react';
import { KPICard } from '../../../components/erp/KPICard';
import DataGrid from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';

interface PayableBill {
  id: string;
  billNum: string;
  vendorName: string;
  poNum: string;
  amount: string;
  status: 'Pending Approval' | 'Approved' | 'Paid';
  dueDate: string;
}

const mockPayableBills: PayableBill[] = [
  { id: '1', billNum: 'BILL-2026-104', vendorName: 'TechGuard Systems Ltd', poNum: 'PO-2026-042', amount: '₹1,80,000', status: 'Pending Approval', dueDate: '25 May 2026' },
  { id: '2', billNum: 'BILL-2026-105', vendorName: 'CleanCampus Sanitation Co.', poNum: 'PO-2026-044', amount: '₹45,000', status: 'Approved', dueDate: '28 May 2026' },
  { id: '3', billNum: 'BILL-2026-106', vendorName: 'Oxford Publishing House', poNum: 'PO-2026-040', amount: '₹2,10,000', status: 'Paid', dueDate: '15 May 2026' },
];

export default function AccountsPayableModule() {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const columns: GridColumn<PayableBill>[] = [
    {
      key: 'billNum',
      title: 'Bill #',
      mobilePriority: 'high',
      render: (r) => <span style={{ fontWeight: 700, color: '#3B82F6' }}>{r.billNum}</span>,
    },
    {
      key: 'vendorName',
      title: 'Vendor Name',
      mobilePriority: 'high',
      render: (r) => <span style={{ fontWeight: 600, color: '#111827' }}>{r.vendorName}</span>,
    },
    {
      key: 'status',
      title: 'Status',
      mobilePriority: 'high',
      render: (r) => (
        <StatusBadge
          status={r.status === 'Paid' ? 'success' : r.status === 'Approved' ? 'info' : 'warning'}
          label={r.status}
        />
      ),
    },
    {
      key: 'poNum',
      title: 'Purchase Order',
      render: (r) => <span style={{ color: '#6B7280' }}>{r.poNum}</span>,
    },
    {
      key: 'amount',
      title: 'Bill Amount',
      render: (r) => <span style={{ fontWeight: 700, color: '#111827' }}>{r.amount}</span>,
    },
    {
      key: 'dueDate',
      title: 'Due Date',
      render: (r) => <span style={{ color: '#6B7280' }}>{r.dueDate}</span>,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', fontFamily: "'Inter', sans-serif" }}>
      {toast && (
        <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 9999, background: '#10B981', color: 'white', padding: '12px 20px', borderRadius: 12, fontWeight: 600 }}>
          {toast}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        <KPICard title="ACCOUNTS PAYABLE DUES" value="₹6.8 L" icon={<Clock size={20} />} tone="warning" />
        <KPICard title="DUE THIS WEEK" value="₹2.4 L" icon={<AlertTriangle size={20} />} tone="warning" />
        <KPICard title="APPROVED BILLS" value="₹4.2 L" icon={<CheckCircle2 size={20} />} tone="success" />
        <KPICard title="ACTIVE VENDORS" value="18 Suppliers" icon={<Building size={20} />} tone="info" />
      </div>

      <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 18, padding: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 14px 0', color: '#111827' }}>Pending Vendor Bills & Accounts Payable</h3>
        <DataGrid<PayableBill>
          columns={columns}
          data={mockPayableBills}
          keyField="id"
          rowActions={[
            {
              label: 'Approve Payout',
              icon: <CheckCircle size={15} />,
              onClick: (r) => showToast(`Payout approved for ${r.vendorName}`),
            },
          ]}
        />
      </div>
    </div>
  );
}
