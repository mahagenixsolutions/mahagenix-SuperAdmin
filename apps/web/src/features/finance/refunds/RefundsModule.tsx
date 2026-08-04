import React, { useState } from 'react';
import { RotateCcw, CheckCircle, Clock, Plus } from 'lucide-react';
import { mockRefunds } from '../shared/mockFinanceData';
import type { RefundRecord } from '../shared/types';

export default function RefundsModule() {
  const [refunds, setRefunds] = useState<RefundRecord[]>(mockRefunds);
  const [toast, setToast] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleApproveRefund = (id: string) => {
    setRefunds(refunds.map(r => r.id === id ? { ...r, status: 'Approved', approvedBy: 'Dr. Ramesh Sharma' } : r));
    showNotification(`Refund ${id} approved!`);
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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Fee Refund & Security Deposit Management</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Process admission cancellations, duplicate fee payments, and caution money returns.</p>
        </div>

        <button 
          onClick={() => showNotification("Refund Request form opened.")}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '8px', border: 'none', background: 'var(--accent-primary)', color: '#FFF', fontSize: '13px', cursor: 'pointer', fontWeight: 700 }}
        >
          <Plus size={16} /> Create Refund Request
        </button>
      </div>

      <div style={{ background: 'var(--bg-surface)', borderRadius: '14px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: 'var(--bg-surface-raised)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontWeight: 600 }}>
              <th style={{ padding: '12px 16px' }}>REFUND NO</th>
              <th style={{ padding: '12px 16px' }}>STUDENT & CLASS</th>
              <th style={{ padding: '12px 16px' }}>CATEGORY</th>
              <th style={{ padding: '12px 16px' }}>AMOUNT</th>
              <th style={{ padding: '12px 16px' }}>DATE</th>
              <th style={{ padding: '12px 16px' }}>STATUS</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {refunds.map((r) => (
              <tr key={r.id} style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
                <td style={{ padding: '14px 16px', fontWeight: 700, color: 'var(--accent-primary)' }}>{r.refundNo}</td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontWeight: 700 }}>{r.studentName}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{r.class} • Roll: {r.rollNo}</div>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(139,92,246,0.1)', color: '#8B5CF6', fontSize: '11px', fontWeight: 600 }}>
                    {r.category}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', fontWeight: 800, color: '#EF4444' }}>₹{r.amount.toLocaleString('en-IN')}</td>
                <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{r.requestedDate}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                    background: r.status === 'Approved' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                    color: r.status === 'Approved' ? '#10B981' : '#F59E0B'
                  }}>
                    {r.status}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                  {r.status === 'Pending Approval' && (
                    <button 
                      onClick={() => handleApproveRefund(r.id)}
                      style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', background: '#10B981', color: '#FFF', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Approve Refund
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
