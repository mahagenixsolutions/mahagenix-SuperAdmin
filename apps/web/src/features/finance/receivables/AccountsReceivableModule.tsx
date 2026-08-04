import React, { useState, useEffect } from 'react';
import { FileText, AlertTriangle, Send, CheckCircle2 } from 'lucide-react';
import { KPICard } from '../../../components/erp/KPICard';
import DataGrid from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';

interface ReceivableRow {
  id: string;
  account: string;
  category: string;
  d0_30: string;
  d31_60: string;
  d90_plus: string;
  total: string;
}

const mockReceivables: ReceivableRow[] = [
  { id: '1', account: 'Grade 10 Pending Tuition Fees', category: 'Student Fees', d0_30: '₹4,50,000', d31_60: '₹1,20,000', d90_plus: '₹50,000', total: '₹6,20,000' },
  { id: '2', account: 'State Board Grant Reimbursement', category: 'Government Grant', d0_30: '₹6,00,000', d31_60: '₹2,50,000', d90_plus: '₹1,50,000', total: '₹10,00,000' },
  { id: '3', account: 'Canteen Vendor Lease Outstanding', category: 'Commercial Lease', d0_30: '₹1,90,000', d31_60: '₹50,000', d90_plus: '₹0', total: '₹2,40,000' },
];

export default function AccountsReceivableModule() {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const columns: GridColumn<ReceivableRow>[] = [
    {
      key: 'account',
      title: 'Account Name',
      mobilePriority: 'high',
      render: (r) => <span style={{ fontWeight: 700, color: '#111827' }}>{r.account}</span>,
    },
    {
      key: 'total',
      title: 'Total Outstanding',
      mobilePriority: 'high',
      render: (r) => <span style={{ fontWeight: 800, color: '#111827' }}>{r.total}</span>,
    },
    {
      key: 'category',
      title: 'Category',
      render: (r) => <span style={{ color: '#6B7280' }}>{r.category}</span>,
    },
    {
      key: 'd0_30',
      title: '0-30 Days',
      render: (r) => <span style={{ color: '#10B981', fontWeight: 600 }}>{r.d0_30}</span>,
    },
    {
      key: 'd31_60',
      title: '31-60 Days',
      render: (r) => <span style={{ color: '#F59E0B', fontWeight: 600 }}>{r.d31_60}</span>,
    },
    {
      key: 'd90_plus',
      title: '90+ Days',
      render: (r) => <span style={{ color: '#EF4444', fontWeight: 600 }}>{r.d90_plus}</span>,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', fontFamily: "'Inter', sans-serif" }}>
      {toast && (
        <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 9999, background: '#10B981', color: 'white', padding: '12px 20px', borderRadius: 12, fontWeight: 600, fontSize: 14 }}>
          {toast}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        <KPICard title="TOTAL RECEIVABLES" value="₹18.6 L" icon={<FileText size={20} />} tone="warning" />
        <KPICard title="0 - 30 DAYS AGING" value="₹12.4 L" icon={<CheckCircle2 size={20} />} tone="info" />
        <KPICard title="31 - 60 DAYS AGING" value="₹4.2 L" icon={<AlertTriangle size={20} />} tone="warning" />
        <KPICard title="90+ DAYS OVERDUE" value="₹2.0 L" icon={<AlertTriangle size={20} />} tone="danger" />
      </div>

      <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 18, padding: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 14px 0', color: '#111827' }}>Accounts Receivable Aging & Follow-Ups</h3>
        <DataGrid<ReceivableRow>
          columns={columns}
          data={mockReceivables}
          keyField="id"
          rowActions={[
            {
              label: 'Send Reminders',
              icon: <Send size={15} />,
              onClick: (r) => showToast(`Reminders sent for ${r.account}`),
            },
          ]}
        />
      </div>
    </div>
  );
}
