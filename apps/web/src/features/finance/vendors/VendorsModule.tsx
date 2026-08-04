import React, { useState, useEffect } from 'react';
import { Building, Phone, Mail, FileText, Plus } from 'lucide-react';
import { mockVendors } from '../shared/mockFinanceData';
import type { Vendor } from '../shared/types';
import DataGrid from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';

export default function VendorsModule() {
  const [vendors] = useState<Vendor[]>(mockVendors);
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

  const columns: GridColumn<Vendor>[] = [
    {
      key: 'vendorName',
      title: 'VENDOR NAME',
      mobilePriority: 'high',
      render: (v) => <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>{v.vendorName}</span>,
    },
    {
      key: 'outstandingBalance',
      title: 'OUTSTANDING',
      mobilePriority: 'high',
      render: (v) => (
        <span style={{ fontWeight: 800, color: v.outstandingBalance > 0 ? '#EF4444' : '#10B981' }}>
          ₹{v.outstandingBalance.toLocaleString('en-IN')}
        </span>
      ),
    },
    {
      key: 'category',
      title: 'CATEGORY',
      render: (v) => (
        <span style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(59,130,246,0.1)', color: '#3B82F6', fontSize: '11px', fontWeight: 600 }}>
          {v.category}
        </span>
      ),
    },
    {
      key: 'gstin',
      title: 'GSTIN',
      render: (v) => <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>{v.gstin}</span>,
    },
    {
      key: 'contactPerson',
      title: 'CONTACT PERSON',
      render: (v) => (
        <div>
          <div style={{ fontWeight: 600 }}>{v.contactPerson}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{v.phone}</div>
        </div>
      ),
    },
    {
      key: 'totalPaid',
      title: 'TOTAL PAID',
      render: (v) => <span style={{ fontWeight: 600 }}>₹{v.totalPaid.toLocaleString('en-IN')}</span>,
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

      {/* Header Banner */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'stretch' : 'center',
        background: 'var(--bg-surface)',
        padding: '16px',
        borderRadius: '12px',
        border: '1px solid var(--border-subtle)',
        gap: '12px',
      }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Vendor & Supplier Directory</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Maintain supplier profiles, GSTIN, invoice history, and outstanding payables.</p>
        </div>

        <button 
          onClick={() => showNotification("Add Vendor form opened")}
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
          <Plus size={16} /> Add Vendor
        </button>
      </div>

      {/* Vendors DataGrid Container */}
      <div style={{ background: 'var(--bg-surface)', borderRadius: '14px', border: '1px solid var(--border-subtle)', padding: '16px' }}>
        <DataGrid<Vendor>
          columns={columns}
          data={vendors}
          keyField="id"
          rowActions={[
            {
              label: 'View Vendor Profile',
              icon: <Building size={15} />,
              onClick: (v) => showNotification(`Viewing profile for ${v.vendorName}...`),
            },
          ]}
        />
      </div>
    </div>
  );
}
