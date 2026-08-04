import React, { useState } from 'react';
import { Settings, Sliders, Shield, FileText, CheckCircle } from 'lucide-react';

export default function FinanceSettingsModule() {
  const [activeFy, setActiveFy] = useState('2024-25');
  const [taxRate, setTaxRate] = useState('18% GST');
  const [approvalLimit, setApprovalLimit] = useState('₹50,000 (Principal Approval Required above limit)');
  const [toast, setToast] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
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
          <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Institutional Finance & Accounting Settings</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Financial year management, approval thresholds, tax rates, receipt templates.</p>
        </div>
      </div>

      <div style={{ background: 'var(--bg-surface)', borderRadius: '14px', border: '1px solid var(--border-subtle)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
        <div>
          <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Active Financial Year</label>
          <select 
            value={activeFy} onChange={(e) => setActiveFy(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', marginTop: '6px' }}
          >
            <option value="2024-25">FY 2024-25 (Current Active Session)</option>
            <option value="2025-26">FY 2025-26 (Upcoming Open)</option>
            <option value="2023-24">FY 2023-24 (Closed & Archived)</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Standard GST Rate Template</label>
          <input 
            type="text" value={taxRate} onChange={(e) => setTaxRate(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', marginTop: '6px' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Expense & PO Approval Threshold</label>
          <input 
            type="text" value={approvalLimit} onChange={(e) => setApprovalLimit(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', marginTop: '6px' }}
          />
        </div>

        <button 
          onClick={() => showNotification("Finance configuration updated successfully!")}
          style={{ width: 'fit-content', padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'var(--accent-primary)', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
