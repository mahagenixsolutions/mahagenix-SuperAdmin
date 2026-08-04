import React, { useState } from 'react';
import { BookOpen, Plus, FileText, ArrowRightLeft, CheckCircle } from 'lucide-react';
import { mockJournals } from '../shared/mockFinanceData';
import type { JournalEntry } from '../shared/types';

export default function LedgerModule() {
  const [journals, setJournals] = useState<JournalEntry[]>(mockJournals);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // New Journal Form State
  const [description, setDescription] = useState('');
  const [debitAccount, setDebitAccount] = useState('Utility Expense Account');
  const [creditAccount, setCreditAccount] = useState('HDFC Operational Account');
  const [amount, setAmount] = useState('');

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateJournal = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!description || isNaN(val) || val <= 0) return;

    const newJnl: JournalEntry = {
      id: `JNL-${Math.floor(100 + Math.random() * 900)}`,
      journalNo: `JNL-2026-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      description,
      entries: [
        { accountName: debitAccount, accountCode: '5000', debit: val, credit: 0 },
        { accountName: creditAccount, accountCode: '1000', debit: 0, credit: val }
      ],
      postedBy: 'Rajesh Verma',
      status: 'Posted'
    };

    setJournals([newJnl, ...journals]);
    setShowModal(false);
    showNotification(`Journal Voucher ${newJnl.journalNo} posted successfully!`);
    setDescription('');
    setAmount('');
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

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>General Ledger & Double-Entry Journal Register</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Post balanced Debit & Credit adjustments across institution chart of accounts.</p>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '8px', border: 'none', background: 'var(--accent-primary)', color: '#FFF', fontSize: '13px', cursor: 'pointer', fontWeight: 700 }}
        >
          <Plus size={16} /> Post Journal Voucher
        </button>
      </div>

      {/* Journals List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {journals.map((j) => (
          <div key={j.id} style={{ background: 'var(--bg-surface)', borderRadius: '14px', border: '1px solid var(--border-subtle)', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
              <div>
                <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--accent-primary)' }}>{j.journalNo}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginLeft: '12px' }}>Date: {j.date}</span>
              </div>
              <span style={{ padding: '4px 10px', borderRadius: '20px', background: 'rgba(16,185,129,0.1)', color: '#10B981', fontSize: '11px', fontWeight: 700 }}>
                {j.status} • Posted by {j.postedBy}
              </span>
            </div>

            <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 12px 0' }}>Narration: {j.description}</p>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: 'var(--bg-surface-raised)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                  <th style={{ padding: '8px 12px' }}>ACCOUNT NAME</th>
                  <th style={{ padding: '8px 12px' }}>DEBIT (DR)</th>
                  <th style={{ padding: '8px 12px' }}>CREDIT (CR)</th>
                </tr>
              </thead>
              <tbody>
                {j.entries.map((e, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>{e.accountName}</td>
                    <td style={{ padding: '8px 12px', color: e.debit > 0 ? '#10B981' : 'var(--text-muted)', fontWeight: 700 }}>
                      {e.debit > 0 ? `₹${e.debit.toLocaleString('en-IN')}` : '-'}
                    </td>
                    <td style={{ padding: '8px 12px', color: e.credit > 0 ? '#3B82F6' : 'var(--text-muted)', fontWeight: 700 }}>
                      {e.credit > 0 ? `₹${e.credit.toLocaleString('en-IN')}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 999,
          display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'
        }}>
          <div style={{
            background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
            borderRadius: '16px', width: '100%', maxWidth: '480px', padding: '24px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 16px 0', color: 'var(--text-primary)' }}>Post Journal Entry (Debit / Credit)</h3>
            <form onSubmit={handleCreateJournal} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Narration / Description</label>
                <input type="text" required placeholder="Adjustment entry for..." value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', marginTop: '4px' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Debit Account (Dr)</label>
                <input type="text" required value={debitAccount} onChange={(e) => setDebitAccount(e.target.value)} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', marginTop: '4px' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Credit Account (Cr)</label>
                <input type="text" required value={creditAccount} onChange={(e) => setCreditAccount(e.target.value)} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', marginTop: '4px' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Balanced Amount (₹)</label>
                <input type="number" required placeholder="15000" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', marginTop: '4px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)' }}>Cancel</button>
                <button type="submit" style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', background: 'var(--accent-primary)', color: '#FFF', fontWeight: 700 }}>Post Journal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
