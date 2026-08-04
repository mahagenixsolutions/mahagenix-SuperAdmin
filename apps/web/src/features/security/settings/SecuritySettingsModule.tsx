import React, { useState } from 'react';
import { Settings, ShieldCheck, Clock, Bell, Video } from 'lucide-react';

export default function SecuritySettingsModule() {
  const [visitorPassValidity, setVisitorPassValidity] = useState('4 Hours');
  const [autoLockdownTrigger, setAutoLockdownTrigger] = useState(true);
  const [patrolScanTolerance, setPatrolScanTolerance] = useState('15 Minutes');
  const [toast, setToast] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToast('✅ Saved: Campus security rules and gate policies updated successfully!');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      {toast && (
        <div style={{ padding: '12px 18px', borderRadius: '10px', background: 'var(--bg-surface-raised)', border: '1px solid #10B981', fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>
          {toast}
        </div>
      )}

      <form onSubmit={handleSave} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings size={18} style={{ color: '#3B82F6' }} /> Gate Rules, Visitor Policies & Emergency Parameters
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Visitor Thermal Pass Expiry</label>
            <input 
              type="text" 
              value={visitorPassValidity}
              onChange={(e) => setVisitorPassValidity(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', outline: 'none', fontSize: '13px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Missed Patrol Alert Delay</label>
            <input 
              type="text" 
              value={patrolScanTolerance}
              onChange={(e) => setPatrolScanTolerance(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', outline: 'none', fontSize: '13px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Emergency Gate Lockdown Mode</label>
            <select 
              value={autoLockdownTrigger ? 'Enabled' : 'Disabled'}
              onChange={(e) => setAutoLockdownTrigger(e.target.value === 'Enabled')}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', outline: 'none', fontSize: '13px' }}
            >
              <option value="Enabled">Enabled (Automated Gate Turnstile Lock)</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
          <button type="submit" style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: '#3B82F6', color: '#FFF', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
            Save Security Rules
          </button>
        </div>
      </form>
    </div>
  );
}
