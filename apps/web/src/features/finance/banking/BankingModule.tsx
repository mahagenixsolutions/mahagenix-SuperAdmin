import React, { useState, useEffect } from 'react';
import { Landmark, ArrowLeftRight, CreditCard, ShieldCheck, Download, Plus, CheckCircle } from 'lucide-react';
import { mockBankAccounts } from '../shared/mockFinanceData';
import type { BankAccount } from '../shared/types';

export default function BankingModule() {
  const [banks, setBanks] = useState<BankAccount[]>(mockBankAccounts);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [fromBank, setFromBank] = useState('BNK-02');
  const [toBank, setToBank] = useState('BNK-01');
  const [transferAmount, setTransferAmount] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767.98);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(transferAmount);
    if (isNaN(amt) || amt <= 0) return;

    setBanks(banks.map(b => {
      if (b.id === fromBank) return { ...b, currentBalance: b.currentBalance - amt };
      if (b.id === toBank) return { ...b, currentBalance: b.currentBalance + amt };
      return b;
    }));

    setShowTransferModal(false);
    showNotification(`Inter-bank fund transfer of ₹${amt.toLocaleString('en-IN')} completed!`);
    setTransferAmount('');
  };

  const totalLiquidity = banks.reduce((acc, b) => acc + b.currentBalance, 0);

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

      {/* Top Banner (Responsive Desktop & Mobile) */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', 
        borderRadius: '16px',
        padding: isMobile ? '18px' : '24px',
        color: '#FFF',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'stretch' : 'center',
        gap: '16px',
      }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>TOTAL INSTITUTIONAL LIQUIDITY</span>
          <h2 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 800, margin: '4px 0 0 0', wordBreak: 'break-word' }}>
            ₹{totalLiquidity.toLocaleString('en-IN')}
          </h2>
          <span style={{ fontSize: '12px', color: '#10B981', fontWeight: 600, marginTop: '4px', display: 'block' }}>
            ● All 4 Treasury Accounts Operational & Reconciled
          </span>
        </div>

        <button 
          onClick={() => setShowTransferModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 20px',
            borderRadius: '10px',
            border: 'none',
            background: '#3B82F6',
            color: '#FFF',
            fontWeight: 700,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            width: isMobile ? '100%' : 'auto',
          }}
        >
          <ArrowLeftRight size={18} /> Transfer Funds
        </button>
      </div>

      {/* Bank Account Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {banks.map((b) => (
          <div key={b.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>{b.bankName}</h4>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{b.accountName}</span>
              </div>
              <span style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(59,130,246,0.1)', color: '#3B82F6', fontSize: '11px', fontWeight: 700 }}>
                {b.accountType}
              </span>
            </div>

            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>CURRENT BALANCE</span>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--accent-primary)', margin: '2px 0 0 0' }}>₹{b.currentBalance.toLocaleString('en-IN')}</h3>
            </div>

            <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '10px', fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
              <span>A/C: {b.accountNumber}</span>
              <span>IFSC: {b.ifscCode}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Inter-bank Transfer Modal */}
      {showTransferModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 999,
          display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'
        }}>
          <div style={{
            background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
            borderRadius: '16px', width: '100%', maxWidth: '460px', padding: '24px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 16px 0', color: 'var(--text-primary)' }}>Inter-Bank Account Transfer</h3>
            <form onSubmit={handleTransfer} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>From Account</label>
                <select 
                  value={fromBank} onChange={(e) => setFromBank(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', marginTop: '4px' }}
                >
                  {banks.map(b => <option key={b.id} value={b.id}>{b.bankName} - {b.accountName} (₹{b.currentBalance.toLocaleString('en-IN')})</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>To Account</label>
                <select 
                  value={toBank} onChange={(e) => setToBank(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', marginTop: '4px' }}
                >
                  {banks.map(b => <option key={b.id} value={b.id}>{b.bankName} - {b.accountName} (₹{b.currentBalance.toLocaleString('en-IN')})</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Transfer Amount (₹)</label>
                <input 
                  type="number" required placeholder="500000"
                  value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', marginTop: '4px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowTransferModal(false)} style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)' }}>Cancel</button>
                <button type="submit" style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', background: '#3B82F6', color: '#FFF', fontWeight: 700 }}>Execute Transfer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
