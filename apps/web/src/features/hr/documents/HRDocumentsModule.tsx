import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockHRDocuments } from '../shared/mockHRData';
import type { HRDocument } from '../shared/types';
import { FileText, Download, Upload, ShieldCheck } from 'lucide-react';

export default function HRDocumentsModule() {
  const [docs, setDocs] = useState<HRDocument[]>(mockHRDocuments);

  const columns: GridColumn<HRDocument>[] = [
    { key: 'empName', title: 'Employee Name', render: (d) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{d.empName}</span> },
    { key: 'docType', title: 'Document Type', render: (d) => <StatusBadge status="info" label={d.docType} /> },
    { key: 'fileName', title: 'File Name', render: (d) => <span style={{ fontFamily: 'monospace' }}>{d.fileName}</span> },
    { key: 'uploadDate', title: 'Upload Date', render: (d) => d.uploadDate },
    { key: 'status', title: 'Verification', render: (d) => <StatusBadge status={d.status === 'Verified' ? 'success' : 'warning'} label={d.status} /> },
    { key: 'id', title: 'Action', render: (d) => (
      <button style={{ border: 'none', background: '#3B82F6', color: '#FFF', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Download size={12} /> Download
      </button>
    ) }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>HR Document Vault & Contracts</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Repository of Offer Letters, Contracts, ID proofs, certificates, and exit forms.</p>
        </div>
        <button style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#3B82F6', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
          + Upload Document
        </button>
      </div>

      <DataGrid columns={columns} data={docs} />
    </div>
  );
}
