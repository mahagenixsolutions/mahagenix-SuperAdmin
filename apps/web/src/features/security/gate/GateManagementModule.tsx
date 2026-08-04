import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockGateLogs } from '../shared/mockSecurityData';
import type { GateLogEntry } from '../shared/types';
import { QrCode, Radio, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function GateManagementModule() {
  const [logs, setLogs] = useState<GateLogEntry[]>(mockGateLogs);
  const [toast, setToast] = useState<string | null>(null);

  const handleSimulateScan = () => {
    setToast('✅ Scanned QR Badge: Access Granted for Gate 1 Entrance!');
    setTimeout(() => setToast(null), 3000);
  };

  const columns: GridColumn<GateLogEntry>[] = [
    { key: 'logCode', title: 'Log #', render: (g) => <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{g.logCode}</span> },
    { key: 'gateNumber', title: 'Gate Station', render: (g) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{g.gateNumber}</span> },
    { key: 'personName', title: 'Person Name', render: (g) => g.personName },
    { key: 'personType', title: 'Role', render: (g) => <StatusBadge status="info" label={g.personType} /> },
    { key: 'verificationMethod', title: 'Verification', render: (g) => <StatusBadge status="success" label={g.verificationMethod} /> },
    { key: 'entryTime', title: 'Entry / Exit Time', render: (g) => `${g.entryTime} ${g.exitTime ? `- ${g.exitTime}` : ''}` },
    { key: 'status', title: 'Status', render: (g) => <StatusBadge status={g.status === 'In Campus' ? 'warning' : 'success'} label={g.status} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      {toast && (
        <div style={{ padding: '12px 18px', borderRadius: '10px', background: 'var(--bg-surface-raised)', border: '1px solid #10B981', fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>
          {toast}
        </div>
      )}

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Gate Operations & QR / RFID Access Scanner</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Real-time gate turnstile logs, RFID card scans, and biometric access verification.</p>
        </div>
        <button onClick={handleSimulateScan} style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#3B82F6', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <QrCode size={14} /> Scan Badge / QR
        </button>
      </div>

      <DataGrid columns={columns} data={logs} />
    </div>
  );
}
