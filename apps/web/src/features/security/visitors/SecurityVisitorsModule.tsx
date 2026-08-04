import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { DetailDrawer } from '../../../components/erp/DetailDrawer';
import { mockSecurityVisitors } from '../shared/mockSecurityData';
import type { SecurityVisitor } from '../shared/types';
import { Search, Filter, Printer, ShieldAlert, CheckCircle2, UserX } from 'lucide-react';

export default function SecurityVisitorsModule() {
  const [visitors, setVisitors] = useState<SecurityVisitor[]>(mockSecurityVisitors);
  const [search, setSearch] = useState('');
  const [selectedVisitor, setSelectedVisitor] = useState<SecurityVisitor | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const handlePrintPass = (passNo: string) => {
    setToast(`🖨️ Thermal Gate Pass Printed: ${passNo}`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggleBlacklist = (id: string, name: string) => {
    setVisitors(visitors.map(v => v.id === id ? { ...v, status: v.status === 'Blacklisted' ? 'In Premises' : 'Blacklisted' } : v));
    setToast(`⚠️ Blacklist status updated for visitor ${name}!`);
    setTimeout(() => setToast(null), 3500);
  };

  const filtered = visitors.filter(v => 
    v.visitorName.toLowerCase().includes(search.toLowerCase()) ||
    v.passNumber.toLowerCase().includes(search.toLowerCase()) ||
    v.phone.includes(search)
  );

  const columns: GridColumn<SecurityVisitor>[] = [
    { key: 'passNumber', title: 'Pass #', render: (v) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{v.passNumber}</span> },
    { key: 'visitorName', title: 'Visitor Name', render: (v) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{v.visitorName}</span> },
    { key: 'relation', title: 'Category', render: (v) => <StatusBadge status="info" label={v.relation} /> },
    { key: 'purpose', title: 'Purpose of Visit', render: (v) => v.purpose },
    { key: 'hostEmployee', title: 'Host Staff', render: (v) => <span style={{ fontWeight: 700, color: '#3B82F6' }}>{v.hostEmployee}</span> },
    { key: 'idProofType', title: 'Govt ID Proof', render: (v) => `${v.idProofType} (${v.idProofNumber})` },
    { key: 'status', title: 'Status', render: (v) => <StatusBadge status={v.status === 'Checked Out' ? 'success' : v.status === 'In Premises' ? 'warning' : 'danger'} label={v.status} /> },
    { key: 'id', title: 'Pass Actions', render: (v) => (
      <div style={{ display: 'flex', gap: '6px' }}>
        <button onClick={() => handlePrintPass(v.passNumber)} style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Printer size={12} /> Print
        </button>
        <button onClick={() => handleToggleBlacklist(v.id, v.visitorName)} style={{ border: 'none', background: v.status === 'Blacklisted' ? '#10B981' : '#EF4444', color: '#FFF', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
          {v.status === 'Blacklisted' ? 'Unblock' : 'Flag'}
        </button>
      </div>
    ) }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      {toast && (
        <div style={{ padding: '12px 18px', borderRadius: '10px', background: 'var(--bg-surface-raised)', border: '1px solid #3B82F6', fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>
          {toast}
        </div>
      )}

      {/* Search & Filter Bar */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '280px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '8px 12px' }}>
          <Search size={16} style={{ color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Search visitor name, pass #, phone, Govt ID..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13px', color: 'var(--text-primary)' }}
          />
        </div>

        <button style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#3B82F6', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
          + Register Visitor & Issue Badge
        </button>
      </div>

      <DataGrid columns={columns} data={filtered} />
    </div>
  );
}
