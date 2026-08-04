import React, { useState } from 'react';
import {
  DollarSign,
  Search,
  Filter,
  Download,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Printer,
  UserCheck
} from 'lucide-react';
import { KPICard } from '../../../components/erp/KPICard';
import DataGrid from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';

interface FeeRecord {
  id: string;
  receipt: string;
  student: string;
  grade: string;
  category: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Partial';
  date: string;
}

const INITIAL_FEE_RECORDS: FeeRecord[] = [
  { id: '1', receipt: 'REC-2026-001', student: 'Rahul Sharma', grade: 'Grade 10-A', category: 'Tuition & Annual Fee', amount: '₹45,000', status: 'Paid', date: '22 May 2026' },
  { id: '2', receipt: 'REC-2026-002', student: 'Ananya Roy', grade: 'Grade 8-B', category: 'Transport Fee', amount: '₹18,500', status: 'Paid', date: '22 May 2026' },
  { id: '3', receipt: 'REC-2026-003', student: 'Kavya Verma', grade: 'Grade 12-Science', category: 'Tuition Fee (Term 2)', amount: '₹25,000', status: 'Pending', date: 'Due 25 May' },
  { id: '4', receipt: 'REC-2026-004', student: 'Rohan Gupta', grade: 'Grade 6-C', category: 'Hostel & Mess Fee', amount: '₹32,000', status: 'Partial', date: '20 May 2026' },
];

export default function FeeManagementModule() {
  const [records] = useState<FeeRecord[]>(INITIAL_FEE_RECORDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const filteredRecords = records.filter(
    (r) =>
      r.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.receipt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: GridColumn<FeeRecord>[] = [
    {
      key: 'receipt',
      title: 'Receipt #',
      mobilePriority: 'high',
      render: (r) => <span style={{ fontWeight: 700, color: '#4F46E5' }}>{r.receipt}</span>,
    },
    {
      key: 'student',
      title: 'Student Name',
      mobilePriority: 'high',
      render: (r) => <span style={{ fontWeight: 600, color: '#111827' }}>{r.student}</span>,
    },
    {
      key: 'status',
      title: 'Status',
      mobilePriority: 'high',
      render: (r) => {
        const toneMap: Record<string, 'success' | 'danger' | 'warning'> = {
          Paid: 'success',
          Pending: 'danger',
          Partial: 'warning',
        };
        return <StatusBadge status={toneMap[r.status] || 'neutral'} label={r.status} />;
      },
    },
    {
      key: 'grade',
      title: 'Class / Sec',
      render: (r) => <span style={{ color: '#6B7280' }}>{r.grade}</span>,
    },
    {
      key: 'category',
      title: 'Fee Category',
      render: (r) => <span style={{ color: '#374151' }}>{r.category}</span>,
    },
    {
      key: 'amount',
      title: 'Amount Paid',
      render: (r) => <span style={{ fontWeight: 700, color: '#111827' }}>{r.amount}</span>,
    },
    {
      key: 'date',
      title: 'Date',
      render: (r) => <span style={{ color: '#6B7280' }}>{r.date}</span>,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', fontFamily: "'Inter', sans-serif" }}>
      
      {toast && (
        <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 9999, background: '#10B981', color: 'white', padding: '12px 20px', borderRadius: 12, fontWeight: 600, fontSize: 14 }}>
          {toast}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        <KPICard title="TOTAL FEE TARGET" value="₹1.50 Cr" icon={<DollarSign size={20} />} tone="info" />
        <KPICard title="COLLECTED TO DATE" value="₹1.42 Cr" icon={<CheckCircle2 size={20} />} trend={{ value: '94.6%', isPositive: true }} tone="success" />
        <KPICard title="PENDING DUES" value="₹8.4 L" icon={<AlertTriangle size={20} />} tone="warning" />
        <KPICard title="SCHOLARSHIPS GRANTED" value="₹4.2 L" icon={<UserCheck size={20} />} tone="info" />
      </div>

      {/* Filter & Action Toolbar */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 16, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 280 }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 360 }}>
            <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: 12, top: 10 }} />
            <input
              type="text"
              placeholder="Search by Student Name, Roll No, or Receipt No..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '8px 12px 8px 36px', borderRadius: 10, border: '1px solid #D1D5DB', fontSize: 13 }}
            />
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 10, border: '1px solid #E5E7EB', background: '#F9FAFB', fontSize: 13, fontWeight: 600, color: '#374151', cursor: 'pointer' }}>
            <Filter size={15} /> Filter
          </button>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => showToast("Exporting Fee Register...")} style={{ padding: '8px 14px', borderRadius: 10, border: '1px solid #E5E7EB', background: '#FFFFFF', fontSize: 13, fontWeight: 600, color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Download size={15} /> Export
          </button>
          <button onClick={() => showToast("Collect Fee Modal Opened")} style={{ padding: '8px 16px', borderRadius: 10, border: 'none', background: '#10B981', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Plus size={16} /> Collect Fee
          </button>
        </div>
      </div>

      {/* Student Fee Register Table with Responsive Mobile Cards & 3 Dots Flow */}
      <div style={cardStyle}>
        <h3 style={{ ...cardTitleStyle, marginBottom: 14 }}>Student Fee Collection Register</h3>
        <DataGrid<FeeRecord>
          columns={columns}
          data={filteredRecords}
          keyField="id"
          rowActions={[
            {
              label: 'Print Receipt',
              icon: <Printer size={15} />,
              onClick: (row) => showToast(`Printing receipt ${row.receipt}...`),
            },
          ]}
        />
      </div>

    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 18, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: 15, fontWeight: 700, color: '#111827', margin: 0,
};
