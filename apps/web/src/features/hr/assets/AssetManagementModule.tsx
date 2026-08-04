import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockAssets } from '../shared/mockHRData';
import type { AssetItem } from '../shared/types';
import { Laptop, Key, ShieldCheck, RefreshCw } from 'lucide-react';

export default function AssetManagementModule() {
  const [assets, setAssets] = useState<AssetItem[]>(mockAssets);

  const columns: GridColumn<AssetItem>[] = [
    { key: 'assetCode', title: 'Asset Code', render: (a) => <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{a.assetCode}</span> },
    { key: 'assetType', title: 'Asset Type', render: (a) => <StatusBadge status="info" label={a.assetType} /> },
    { key: 'assignedToEmp', title: 'Assigned Employee', render: (a) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{a.assignedToEmp}</span> },
    { key: 'serialNumber', title: 'Serial Number', render: (a) => a.serialNumber },
    { key: 'assignmentDate', title: 'Assignment Date', render: (a) => a.assignmentDate },
    { key: 'condition', title: 'Condition', render: (a) => <StatusBadge status={a.condition === 'Good' ? 'success' : 'warning'} label={a.condition} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Staff Asset Management & Equipment Assignment</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Track laptops, tablets, access cards, keys, and projector assignments.</p>
        </div>
        <button style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#3B82F6', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
          + Assign New Asset
        </button>
      </div>

      <DataGrid columns={columns} data={assets} />
    </div>
  );
}
