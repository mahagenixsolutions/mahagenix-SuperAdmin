import React, { useState } from 'react';
import { Settings, ShieldCheck, Clock, Calendar, FileText } from 'lucide-react';

export default function HRSettingsModule() {
  const [sickLeaveLimit, setSickLeaveLimit] = useState('12');
  const [casualLeaveLimit, setCasualLeaveLimit] = useState('12');
  const [workingHours, setWorkingHours] = useState('08:00 AM - 04:30 PM');
  const [empNumberFormat, setEmpNumberFormat] = useState('SCH-EMP-XXX');
  const [toast, setToast] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToast('✅ Saved: HR policies and leave rules updated successfully!');
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
          <Settings size={18} style={{ color: '#3B82F6' }} /> HR Policy Rules & System Configuration
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Annual Sick Leave Allowance (Days)</label>
            <input 
              type="number" 
              value={sickLeaveLimit}
              onChange={(e) => setSickLeaveLimit(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', outline: 'none', fontSize: '13px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Annual Casual Leave Allowance (Days)</label>
            <input 
              type="number" 
              value={casualLeaveLimit}
              onChange={(e) => setCasualLeaveLimit(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', outline: 'none', fontSize: '13px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Standard Working Hours</label>
            <input 
              type="text" 
              value={workingHours}
              onChange={(e) => setWorkingHours(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', outline: 'none', fontSize: '13px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Employee ID Number Format</label>
            <input 
              type="text" 
              value={empNumberFormat}
              onChange={(e) => setEmpNumberFormat(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', outline: 'none', fontSize: '13px' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
          <button type="submit" style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: '#3B82F6', color: '#FFF', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
            Save HR System Policies
          </button>
        </div>
      </form>
    </div>
  );
}
