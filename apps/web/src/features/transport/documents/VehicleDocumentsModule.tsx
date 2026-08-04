import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { useTransportStore } from '../shared/transportStore';
import type { VehicleDocument } from '../shared/types';
import { FileText, AlertTriangle, CheckCircle2, Shield, Calendar, Search } from 'lucide-react';

export default function VehicleDocumentsModule() {
  const { documents, showToast } = useTransportStore();
  const [docTypeFilter, setDocTypeFilter] = useState('');
  const [search, setSearch] = useState('');

  const filteredDocs = documents.filter((d) => {
    const matchSearch =
      d.busNumber.toLowerCase().includes(search.toLowerCase()) ||
      d.documentNumber.toLowerCase().includes(search.toLowerCase()) ||
      d.issuingAuthority.toLowerCase().includes(search.toLowerCase());
    const matchType = !docTypeFilter || d.docType === docTypeFilter;
    return matchSearch && matchType;
  });

  const columns: GridColumn<VehicleDocument>[] = [
    { key: 'busNumber', title: 'Vehicle Number', render: (d) => <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{d.busNumber}</span> },
    { key: 'docType', title: 'Document Type', render: (d) => <StatusBadge status="info" label={d.docType} /> },
    { key: 'documentNumber', title: 'Document Ref No', render: (d) => <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{d.documentNumber}</span> },
    { key: 'issuingAuthority', title: 'Issuing Authority', render: (d) => d.issuingAuthority },
    { key: 'expiryDate', title: 'Expiry Date', render: (d) => <span style={{ fontWeight: 700, color: d.status === 'Expiring Soon' ? '#F59E0B' : d.status === 'Expired' ? '#EF4444' : 'var(--text-primary)' }}>{d.expiryDate}</span> },
    {
      key: 'status',
      title: 'Status',
      render: (d) => (
        <StatusBadge
          status={d.status === 'Valid' ? 'success' : d.status === 'Expiring Soon' ? 'warning' : 'danger'}
          label={d.status}
        />
      ),
    },
    {
      key: 'id',
      title: 'Action',
      render: (d) => (
        <button
          onClick={() => showToast(`Downloading compliance document ${d.documentNumber}...`)}
          style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
        >
          View Doc
        </button>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Vehicle Compliance & Document Vault</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Track Insurance policies, RTO Fitness Certificates, Pollution (PUC), and Road Permits.</p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '6px 12px' }}>
            <Search size={14} style={{ color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Search by Bus # or Ref..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '12px', color: 'var(--text-primary)' }}
            />
          </div>

          <select value={docTypeFilter} onChange={(e) => setDocTypeFilter(e.target.value)} style={selectStyle}>
            <option value="">All Document Types</option>
            <option value="Insurance Policy">Insurance Policy</option>
            <option value="Registration (RC)">Registration (RC)</option>
            <option value="Fitness Certificate">Fitness Certificate</option>
            <option value="Pollution (PUC)">Pollution (PUC)</option>
            <option value="Road Permit">Road Permit</option>
          </select>
        </div>
      </div>

      <DataGrid columns={columns} data={filteredDocs} />
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  border: '1px solid var(--border-subtle)',
  background: 'var(--bg-surface-raised)',
  borderRadius: '8px',
  padding: '8px 12px',
  fontSize: '12px',
  color: 'var(--text-primary)',
  outline: 'none',
};
