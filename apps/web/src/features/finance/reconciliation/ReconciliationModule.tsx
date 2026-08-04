import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { mockReconciliations } from '../shared/mockFinanceData';
import type { ReconciliationRecord } from '../shared/types';

export default function ReconciliationModule() {
  const [reconciliations, setReconciliations] = useState<ReconciliationRecord[]>(mockReconciliations);
  const [toast, setToast] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleResolve = (id: string) => {
    setReconciliations(reconciliations.map(r => r.id === id ? { ...r, status: 'Resolved', discrepancy: 0 } : r));
    showNotification(`Reconciliation record ${id} marked as resolved!`);
  };

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

      {/* Action Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Bank & Payment Gateway Reconciliation Engine</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Automated matching for Bank statements, UPI, POS terminals, and cash desk totals.</p>
        </div>

        <button 
          onClick={() => showNotification("Auto-Reconciliation scan completed. 1 discrepancy found.")}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '8px', border: 'none', background: 'var(--accent-primary)', color: '#FFF', fontSize: '13px', cursor: 'pointer', fontWeight: 700 }}
        >
          <RefreshCw size={15} /> Run Auto Match Scan
        </button>
      </div>

      {/* Table */}
      <div style={{ background: 'var(--bg-surface)', borderRadius: '14px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: 'var(--bg-surface-raised)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontWeight: 600 }}>
              <th style={{ padding: '12px 16px' }}>REF NO & GATEWAY</th>
              <th style={{ padding: '12px 16px' }}>DATE</th>
              <th style={{ padding: '12px 16px' }}>BOOK AMOUNT</th>
              <th style={{ padding: '12px 16px' }}>BANK AMOUNT</th>
              <th style={{ padding: '12px 16px' }}>DISCREPANCY</th>
              <th style={{ padding: '12px 16px' }}>STATUS</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {reconciliations.map((r) => (
              <tr key={r.id} style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontWeight: 700 }}>{r.referenceNo}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{r.gateway}</div>
                </td>
                <td style={{ padding: '14px 16px' }}>{r.date}</td>
                <td style={{ padding: '14px 16px', fontWeight: 600 }}>₹{r.bookAmount.toLocaleString('en-IN')}</td>
                <td style={{ padding: '14px 16px', fontWeight: 600 }}>₹{r.bankAmount.toLocaleString('en-IN')}</td>
                <td style={{ padding: '14px 16px', fontWeight: 800, color: r.discrepancy === 0 ? '#10B981' : '#EF4444' }}>
                  {r.discrepancy === 0 ? '₹0 (Exact Match)' : `₹${r.discrepancy}`}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                    background: r.status === 'Matched' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                    color: r.status === 'Matched' ? '#10B981' : '#EF4444'
                  }}>
                    {r.status}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                  {r.status === 'Unmatched' && (
                    <button 
                      onClick={() => handleResolve(r.id)}
                      style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', background: '#F59E0B', color: '#FFF', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Reconcile & Resolve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
