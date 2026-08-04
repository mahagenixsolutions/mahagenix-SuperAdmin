import React, { useState, useEffect } from 'react';
import { Shield, FileText, Download, CheckCircle, Eye } from 'lucide-react';
import { mockTaxReport } from '../shared/mockFinanceData';
import type { TaxReportItem } from '../shared/types';
import DataGrid from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';

export default function TaxationModule() {
  const [taxes] = useState<TaxReportItem[]>(mockTaxReport);
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

  const columns: GridColumn<TaxReportItem>[] = [
    {
      key: 'period',
      title: 'TAX PERIOD',
      mobilePriority: 'high',
      render: (t) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{t.period}</span>,
    },
    {
      key: 'gstCollected',
      title: 'GST COLLECTED',
      mobilePriority: 'high',
      render: (t) => <span style={{ color: '#10B981', fontWeight: 600 }}>₹{t.gstCollected.toLocaleString('en-IN')}</span>,
    },
    {
      key: 'status',
      title: 'FILING STATUS',
      mobilePriority: 'high',
      render: (t) => (
        <StatusBadge
          status={t.status === 'Filed' ? 'success' : 'warning'}
          label={t.status}
        />
      ),
    },
    {
      key: 'gstPaidInputCredit',
      title: 'INPUT TAX CREDIT (ITC)',
      render: (t) => <span style={{ color: '#3B82F6', fontWeight: 600 }}>₹{t.gstPaidInputCredit.toLocaleString('en-IN')}</span>,
    },
    {
      key: 'netGstPayable',
      title: 'NET GST PAYABLE',
      render: (t) => <span style={{ fontWeight: 800, color: '#EF4444' }}>₹{t.netGstPayable.toLocaleString('en-IN')}</span>,
    },
    {
      key: 'tdsDeducted',
      title: 'TDS DEDUCTED',
      render: (t) => <span style={{ fontWeight: 600 }}>₹{t.tdsDeducted.toLocaleString('en-IN')}</span>,
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

      {/* Header Banner (Responsive) */}
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
          <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Taxation & GST Compliance Hub</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Manage GSTR-1, GSTR-3B previews, TDS deductions on vendor & staff payouts.</p>
        </div>

        <button 
          onClick={() => showNotification("Exporting GST returns CSV report...")}
          style={{
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
            width: isMobile ? '100%' : 'auto',
          }}
        >
          <Download size={15} /> Export Tax Returns (CSV)
        </button>
      </div>

      {/* DataGrid Container with 2-field mobile cards & 3 dots popup flow */}
      <div style={{ background: 'var(--bg-surface)', borderRadius: '14px', border: '1px solid var(--border-subtle)', padding: '16px' }}>
        <DataGrid<TaxReportItem>
          columns={columns}
          data={taxes}
          keyField="period"
          rowActions={[
            {
              label: 'Download Return Certificate',
              icon: <FileText size={15} />,
              onClick: (t) => showNotification(`Downloading GST return certificate for ${t.period}...`),
            },
          ]}
        />
      </div>
    </div>
  );
}
