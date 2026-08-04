import React, { useState } from 'react';
import { ShieldCheck, Search, Download, Clock } from 'lucide-react';
import { mockAuditLogs } from '../shared/mockFinanceData';
import type { FinancialAuditLog } from '../shared/types';

export default function AuditModule() {
  const [logs] = useState<FinancialAuditLog[]>(mockAuditLogs);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Financial Activity & Compliance Audit Log</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Tamper-evident audit trail recording every receipt, voucher, approval, and refund.</p>
        </div>

        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontSize: '13px', cursor: 'pointer', fontWeight: 600 }}>
          <Download size={15} /> Export Audit Log
        </button>
      </div>

      <div style={{ background: 'var(--bg-surface)', borderRadius: '14px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: 'var(--bg-surface-raised)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontWeight: 600 }}>
              <th style={{ padding: '12px 16px' }}>TIMESTAMP</th>
              <th style={{ padding: '12px 16px' }}>USER</th>
              <th style={{ padding: '12px 16px' }}>MODULE</th>
              <th style={{ padding: '12px 16px' }}>ACTION</th>
              <th style={{ padding: '12px 16px' }}>AMOUNT</th>
              <th style={{ padding: '12px 16px' }}>DETAILS & IP</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
                <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontSize: '12px', fontFamily: 'monospace' }}>{log.timestamp}</td>
                <td style={{ padding: '14px 16px', fontWeight: 700 }}>{log.user}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(59,130,246,0.1)', color: '#3B82F6', fontSize: '11px', fontWeight: 600 }}>{log.module}</span>
                </td>
                <td style={{ padding: '14px 16px', fontWeight: 600 }}>{log.action}</td>
                <td style={{ padding: '14px 16px', fontWeight: 800, color: 'var(--accent-primary)' }}>
                  {log.amount ? `₹${log.amount.toLocaleString('en-IN')}` : '-'}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontSize: '12px' }}>{log.details}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>IP: {log.ipAddress}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
