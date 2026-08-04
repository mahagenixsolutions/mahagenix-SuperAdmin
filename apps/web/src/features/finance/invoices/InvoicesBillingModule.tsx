import React, { useState, useEffect } from 'react';
import { FileText, Plus, Search, Download, CheckCircle2, Clock, Printer } from 'lucide-react';
import { KPICard } from '../../../components/erp/KPICard';
import DataGrid from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';

interface InvoiceRecord {
  id: string;
  num: string;
  billedTo: string;
  category: string;
  amount: string;
  status: 'Paid' | 'Pending';
  date: string;
}

const mockInvoices: InvoiceRecord[] = [
  { id: '1', num: 'INV-2026-890', billedTo: 'Greenfield Parents Association', category: 'Annual Event Sponsorship', amount: '₹1,50,000', status: 'Paid', date: '15 May 2026' },
  { id: '2', num: 'INV-2026-891', billedTo: 'EduTech Solutions Ltd', category: 'Lab Hardware Lease', amount: '₹85,000', status: 'Pending', date: '28 May 2026' },
  { id: '3', num: 'INV-2026-892', billedTo: 'Karnataka State Board', category: 'Examination Center Fee', amount: '₹2,10,000', status: 'Paid', date: '10 May 2026' },
];

export default function InvoicesBillingModule() {
  const [toast, setToast] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767.98);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const columns: GridColumn<InvoiceRecord>[] = [
    {
      key: 'num',
      title: 'Invoice #',
      mobilePriority: 'high',
      render: (r) => <span style={{ fontWeight: 700, color: '#3B82F6' }}>{r.num}</span>,
    },
    {
      key: 'billedTo',
      title: 'Billed To',
      mobilePriority: 'high',
      render: (r) => <span style={{ fontWeight: 600, color: '#111827' }}>{r.billedTo}</span>,
    },
    {
      key: 'status',
      title: 'Status',
      mobilePriority: 'high',
      render: (r) => (
        <StatusBadge status={r.status === 'Paid' ? 'success' : 'warning'} label={r.status} />
      ),
    },
    {
      key: 'category',
      title: 'Billing Category',
      render: (r) => <span style={{ color: '#6B7280' }}>{r.category}</span>,
    },
    {
      key: 'amount',
      title: 'Amount',
      render: (r) => <span style={{ fontWeight: 700, color: '#111827' }}>{r.amount}</span>,
    },
    {
      key: 'date',
      title: 'Due Date',
      render: (r) => <span style={{ color: '#6B7280' }}>{r.date}</span>,
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
        <KPICard title="TOTAL INVOICES ISSUED" value="1,420 Invoices" icon={<FileText size={20} />} tone="info" />
        <KPICard title="PAID INVOICES" value="₹1.48 Cr" icon={<CheckCircle2 size={20} />} tone="success" />
        <KPICard title="OUTSTANDING INVOICES" value="₹12.4 L" icon={<Clock size={20} />} tone="warning" />
        <KPICard title="CREDIT / DEBIT NOTES" value="14 Notes" icon={<FileText size={20} />} tone="info" />
      </div>

      <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 18, padding: 20 }}>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'stretch' : 'center',
          marginBottom: 14,
          gap: isMobile ? 12 : 16,
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: '#111827' }}>Invoices & Billing Register</h3>
          <button
            onClick={() => showToast("Invoice Builder Modal Opened")}
            style={{
              padding: '8px 16px',
              borderRadius: 10,
              border: 'none',
              background: '#3B82F6',
              color: 'white',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              whiteSpace: 'nowrap',
              width: isMobile ? '100%' : 'auto',
            }}
          >
            <Plus size={16} /> Generate Invoice
          </button>
        </div>

        <DataGrid<InvoiceRecord>
          columns={columns}
          data={mockInvoices}
          keyField="id"
          rowActions={[
            {
              label: 'Print Invoice PDF',
              icon: <Printer size={15} />,
              onClick: (r) => showToast(`Printing Invoice ${r.num}...`),
            },
          ]}
        />
      </div>
    </div>
  );
}
