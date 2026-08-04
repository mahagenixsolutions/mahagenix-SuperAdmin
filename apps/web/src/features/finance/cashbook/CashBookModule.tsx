import React, { useState } from 'react';
import { Wallet, ArrowDownRight, ArrowUpRight, Plus, Download, CheckCircle } from 'lucide-react';
import { mockCashBook } from '../shared/mockFinanceData';
import type { CashBookEntry } from '../shared/types';

export default function CashBookModule() {
  const [cashEntries, setCashEntries] = useState<CashBookEntry[]>(mockCashBook);
  const [toast, setToast] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const openingBalance = 46200;
  const totalCashIn = cashEntries.reduce((acc, c) => acc + c.cashIn, 0);
  const totalCashOut = cashEntries.reduce((acc, c) => acc + c.cashOut, 0);
  const closingBalance = openingBalance + totalCashIn - totalCashOut;

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

      {/* Cash Register Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>OPENING CASH BALANCE</span>
          <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 0 0' }}>₹{openingBalance.toLocaleString('en-IN')}</h3>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>08:00 AM Session Start</span>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>TODAY'S CASH IN</span>
          <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#10B981', margin: '4px 0 0 0' }}>+₹{totalCashIn.toLocaleString('en-IN')}</h3>
          <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>Fee Receipts</span>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>TODAY'S CASH OUT</span>
          <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#EF4444', margin: '4px 0 0 0' }}>-₹{totalCashOut.toLocaleString('en-IN')}</h3>
          <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: 600 }}>Petty Cash Expenses</span>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>CLOSING CASH BALANCE</span>
          <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--accent-primary)', margin: '4px 0 0 0' }}>₹{closingBalance.toLocaleString('en-IN')}</h3>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Vault Verified</span>
        </div>
      </div>

      {/* Cash Ledger Table */}
      <div style={{ background: 'var(--bg-surface)', borderRadius: '14px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: 'var(--bg-surface-raised)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontWeight: 600 }}>
              <th style={{ padding: '12px 16px' }}>VOUCHER NO</th>
              <th style={{ padding: '12px 16px' }}>DATE & CASHIER</th>
              <th style={{ padding: '12px 16px' }}>DESCRIPTION</th>
              <th style={{ padding: '12px 16px' }}>CASH IN (+)</th>
              <th style={{ padding: '12px 16px' }}>CASH OUT (-)</th>
            </tr>
          </thead>
          <tbody>
            {cashEntries.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
                <td style={{ padding: '14px 16px', fontWeight: 700, fontFamily: 'monospace' }}>{c.voucherNo}</td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontWeight: 600 }}>{c.date}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Cashier: {c.handoverCashier}</div>
                </td>
                <td style={{ padding: '14px 16px' }}>{c.description}</td>
                <td style={{ padding: '14px 16px', fontWeight: 800, color: c.cashIn > 0 ? '#10B981' : 'var(--text-muted)' }}>
                  {c.cashIn > 0 ? `+₹${c.cashIn.toLocaleString('en-IN')}` : '-'}
                </td>
                <td style={{ padding: '14px 16px', fontWeight: 800, color: c.cashOut > 0 ? '#EF4444' : 'var(--text-muted)' }}>
                  {c.cashOut > 0 ? `-₹${c.cashOut.toLocaleString('en-IN')}` : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
