import React, { useState, useEffect } from 'react';
import { Users, Calendar, DollarSign, Download, CheckCircle, Clock, FileText, Send } from 'lucide-react';
import { mockPayroll } from '../shared/mockFinanceData';
import type { PayrollRecord } from '../shared/types';
import DataGrid from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';

export default function PayrollModule() {
  const [payrollList, setPayrollList] = useState<PayrollRecord[]>(mockPayroll);
  const [toast, setToast] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767.98);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleProcessSalary = (id: string) => {
    setPayrollList(payrollList.map(p => p.id === id ? { ...p, status: 'Processed', paymentDate: new Date().toISOString().split('T')[0] } : p));
    showNotification(`Payroll record ${id} processed successfully!`);
  };

  const totalPayroll = payrollList.reduce((acc, p) => acc + p.netSalary, 0);
  const processedPayroll = payrollList.filter(p => p.status === 'Processed').reduce((acc, p) => acc + p.netSalary, 0);
  const pendingPayroll = payrollList.filter(p => p.status === 'Pending').reduce((acc, p) => acc + p.netSalary, 0);

  const columns: GridColumn<PayrollRecord>[] = [
    {
      key: 'staffName',
      title: 'STAFF NAME & ROLE',
      mobilePriority: 'high',
      render: (p) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{p.staffName}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{p.staffId} • {p.role}</div>
        </div>
      ),
    },
    {
      key: 'netSalary',
      title: 'NET PAYABLE',
      mobilePriority: 'high',
      render: (p) => (
        <span style={{ fontWeight: 800, fontSize: '14px', color: 'var(--accent-primary)' }}>
          ₹{p.netSalary.toLocaleString('en-IN')}
        </span>
      ),
    },
    {
      key: 'status',
      title: 'STATUS',
      mobilePriority: 'high',
      render: (p) => (
        <StatusBadge
          status={p.status === 'Processed' ? 'success' : 'warning'}
          label={p.status}
        />
      ),
    },
    {
      key: 'baseSalary',
      title: 'BASE SALARY',
      render: (p) => <span style={{ fontWeight: 600 }}>₹{p.baseSalary.toLocaleString('en-IN')}</span>,
    },
    {
      key: 'allowances',
      title: 'ALLOWANCES',
      render: (p) => <span style={{ color: '#10B981' }}>+₹{p.allowances.toLocaleString('en-IN')}</span>,
    },
    {
      key: 'deductions',
      title: 'DEDUCTIONS (PF+ESI+TDS)',
      render: (p) => {
        const totalDeduction = p.pfDeduction + p.esiDeduction + p.tdsDeduction;
        return <span style={{ color: '#EF4444' }}>-₹{totalDeduction.toLocaleString('en-IN')}</span>;
      },
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          background: 'var(--bg-secondary)', border: '1px solid #10B981',
          borderRadius: '10px', padding: '12px 20px', boxShadow: 'var(--shadow-lg)'
        }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{toast}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>TOTAL SALARY (JULY 2026)</span>
          <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: '6px 0 0 0' }}>₹{totalPayroll.toLocaleString('en-IN')}</h3>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>4 Staff Records</span>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>PROCESSED SALARY</span>
          <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#10B981', margin: '6px 0 0 0' }}>₹{processedPayroll.toLocaleString('en-IN')}</h3>
          <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>Direct Deposited</span>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>PENDING SALARY</span>
          <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#F59E0B', margin: '6px 0 0 0' }}>₹{pendingPayroll.toLocaleString('en-IN')}</h3>
          <span style={{ fontSize: '11px', color: '#F59E0B', fontWeight: 600 }}>Due by July 31st</span>
        </div>
      </div>

      {/* Responsive Header Banner */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'stretch' : 'center',
        flexDirection: isMobile ? 'column' : 'row',
        background: 'var(--bg-surface)',
        padding: '16px',
        borderRadius: '12px',
        border: '1px solid var(--border-subtle)',
        gap: '12px',
      }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>School Payroll Register</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Manage teacher & staff salary structures, PF, ESI, TDS, and pay slips.</p>
        </div>

        <div style={{ display: 'flex', gap: '10px', width: isMobile ? '100%' : 'auto' }}>
          <button 
            onClick={() => showNotification("Payroll Batch processed for all pending staff.")}
            style={{
              flex: isMobile ? 1 : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '9px 16px',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--accent-primary)',
              color: '#FFF',
              fontSize: '13px',
              cursor: 'pointer',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            <Send size={15} /> Run Batch Payroll
          </button>
        </div>
      </div>

      {/* Payroll Table Container with DataGrid Mobile Card View & 3 Dots Flow */}
      <div style={{ background: 'var(--bg-surface)', borderRadius: '14px', border: '1px solid var(--border-subtle)', padding: '16px' }}>
        <DataGrid<PayrollRecord>
          columns={columns}
          data={payrollList}
          keyField="id"
          rowActions={[
            {
              label: 'Process Pay',
              icon: <CheckCircle size={15} />,
              onClick: (p) => handleProcessSalary(p.id),
            },
            {
              label: 'Pay Slip PDF',
              icon: <FileText size={15} />,
              onClick: (p) => showNotification(`Pay slip generated for ${p.staffName}`),
            },
          ]}
        />
      </div>
    </div>
  );
}
