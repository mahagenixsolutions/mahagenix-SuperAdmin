import React, { useState } from 'react';
import { FileText, CheckCircle2, Clock, XCircle, Send } from 'lucide-react';
import { KPICard } from '../../../components/erp/KPICard';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';

const mockRequests = [
  { id: 'REQ-2026-101', employee: 'Sunita Verma', dept: 'Mathematics', type: 'Leave Request', details: '3 Days Casual Leave (Family Event)', status: 'Pending', date: '21 May 2026' },
  { id: 'REQ-2026-102', employee: 'Rajesh Khanna', dept: 'Administration', type: 'Letter Request', details: 'Salary Certificate for Bank Loan', status: 'Approved', date: '19 May 2026' },
  { id: 'REQ-2026-103', employee: 'Priya Sharma', dept: 'Science', type: 'Transfer Request', details: 'Shift to Senior Secondary Wing', status: 'Approved', date: '15 May 2026' },
  { id: 'REQ-2026-104', employee: 'Vikramaditya Roy', dept: 'IT & Computer', type: 'Document Request', details: 'Experience Certificate Copy', status: 'Approved', date: '10 May 2026' },
];

export default function EmployeeRequestsModule() {
  const [toast, setToast] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767.98);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const columns: GridColumn<typeof mockRequests[0]>[] = [
    {
      key: 'id',
      header: 'Request ID',
      render: (row) => <span style={{ fontWeight: 700, color: '#5850EC' }}>{row.id}</span>,
    },
    {
      key: 'employee',
      header: 'Employee',
      mobilePriority: 'high',
      render: (row) => <span style={{ fontWeight: 600, color: '#111827' }}>{row.employee}</span>,
    },
    { key: 'dept', header: 'Department' },
    {
      key: 'type',
      header: 'Request Type',
      mobilePriority: 'high',
      render: (row) => <span style={{ color: '#374151', fontWeight: 600 }}>{row.type}</span>,
    },
    { key: 'details', header: 'Details / Reason' },
    {
      key: 'status',
      header: 'Status',
      mobilePriority: 'high',
      render: (row) => {
        const statusColors: any = {
          Approved: { bg: '#ECFDF5', color: '#059669' },
          Pending: { bg: '#FFFBEB', color: '#D97706' },
          Rejected: { bg: '#FEF2F2', color: '#EF4444' },
        }[row.status] || { bg: '#F3F4F6', color: '#374151' };
        
        return (
          <span style={{ background: statusColors.bg, color: statusColors.color, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100 }}>
            {row.status}
          </span>
        );
      }
    },
    { key: 'date', header: 'Submitted Date' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', fontFamily: "'Inter', sans-serif" }}>
      {toast && (
        <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 9999, background: '#10B981', color: 'white', padding: '12px 20px', borderRadius: 12, fontWeight: 600, fontSize: 14 }}>
          {toast}
        </div>
      )}

      {/* KPI Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        <KPICard title="TOTAL REQUESTS" value="48 Requests" icon={<FileText size={20} />} tone="info" />
        <KPICard title="PENDING APPROVAL" value="4 Requests" icon={<Clock size={20} />} tone="warning" />
        <KPICard title="APPROVED THIS MONTH" value="38 Requests" icon={<CheckCircle2 size={20} />} tone="success" />
        <KPICard title="REJECTED" value="6 Requests" icon={<XCircle size={20} />} tone="danger" />
      </div>

      {/* Employee Requests Table Header & Container */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 18, padding: 20 }}>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'stretch' : 'center',
          marginBottom: 14,
          gap: isMobile ? 12 : 16,
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: '#111827' }}>Employee Service Requests & Approval Workflow</h3>
          <button
            onClick={() => showToast("Request Modal Opened")}
            style={{
              padding: '9px 16px',
              borderRadius: 10,
              border: 'none',
              background: '#5850EC',
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
            <Send size={15} /> Submit HR Request
          </button>
        </div>

        <DataGrid 
          columns={columns} 
          data={mockRequests} 
          keyField="id" 
          actions={(row) => row.status === 'Pending' ? (
            <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
              <button style={{ padding: '4px 10px', background: '#10B981', color: 'white', border: 'none', borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>Approve</button>
              <button style={{ padding: '4px 10px', background: '#EF4444', color: 'white', border: 'none', borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>Reject</button>
            </div>
          ) : <div style={{ width: '130px' }}></div>}
        />
      </div>

    </div>
  );
}
