import React, { useState } from 'react';
import { Settings, ShieldCheck, Clock, Utensils, Key } from 'lucide-react';
import { useHostelStore } from '../shared/hostelStore';

export default function HostelSettingsModule() {
  const { settings, updateSettings } = useHostelStore();

  const [formData, setFormData] = useState({
    curfewTimeNight: settings.curfewTimeNight,
    morningRollCallTime: settings.morningRollCallTime,
    maxVisitorDurationHours: settings.maxVisitorDurationHours,
    roomTransferApprovalRequired: settings.roomTransferApprovalRequired,
    enableParentSmsRollCall: settings.enableParentSmsRollCall,
    enableGatePassBarcode: settings.enableGatePassBarcode,
    chiefWardenHelpline: settings.chiefWardenHelpline,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <form onSubmit={handleSave} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings size={18} style={{ color: '#6366F1' }} /> Hostel Rules, Curfew Timings & Gate Policies
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Night Curfew Cutoff Time</label>
            <input
              type="text"
              value={formData.curfewTimeNight}
              onChange={(e) => setFormData({ ...formData, curfewTimeNight: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Morning Roll Call Check Time</label>
            <input
              type="text"
              value={formData.morningRollCallTime}
              onChange={(e) => setFormData({ ...formData, morningRollCallTime: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Max Visitor Duration (Hours)</label>
            <input
              type="number"
              value={formData.maxVisitorDurationHours}
              onChange={(e) => setFormData({ ...formData, maxVisitorDurationHours: Number(e.target.value) })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Chief Warden Emergency Helpline</label>
            <input
              type="text"
              value={formData.chiefWardenHelpline}
              onChange={(e) => setFormData({ ...formData, chiefWardenHelpline: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>Automated System Notifications & Gate Pass Verification</h4>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.enableParentSmsRollCall}
                onChange={(e) => setFormData({ ...formData, enableParentSmsRollCall: e.target.checked })}
              />
              Enable Parent SMS Alert on Late Roll Call Check-in
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.enableGatePassBarcode}
                onChange={(e) => setFormData({ ...formData, enableGatePassBarcode: e.target.checked })}
              />
              Enable Barcode Gate Pass Scanner Verification
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.roomTransferApprovalRequired}
                onChange={(e) => setFormData({ ...formData, roomTransferApprovalRequired: e.target.checked })}
              />
              Require Warden Approval for Room Transfers
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
          <button type="submit" style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: '#6366F1', color: '#FFF', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
            Save Hostel Settings & Rules
          </button>
        </div>
      </form>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 800,
  color: 'var(--text-secondary)',
  textTransform: 'uppercase',
  marginBottom: '6px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  borderRadius: '8px',
  border: '1px solid var(--border-subtle)',
  background: 'var(--bg-surface-raised)',
  color: 'var(--text-primary)',
  outline: 'none',
  fontSize: '13px',
};
