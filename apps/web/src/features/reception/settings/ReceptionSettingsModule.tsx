import React, { useState } from 'react';
import { Settings, ShieldCheck, Clock, FileText } from 'lucide-react';
import { useReceptionStore } from '../shared/receptionStore';

export default function ReceptionSettingsModule() {
  const { settings, updateSettings } = useReceptionStore();

  const [formData, setFormData] = useState({
    officeOpeningTime: settings.officeOpeningTime,
    officeClosingTime: settings.officeClosingTime,
    maxVisitorPassValidityHours: settings.maxVisitorPassValidityHours,
    autoSmsOnVisitorCheckIn: settings.autoSmsOnVisitorCheckIn,
    autoSmsOnGatePassApproval: settings.autoSmsOnGatePassApproval,
    chiefReceptionistHelpline: settings.chiefReceptionistHelpline,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <form onSubmit={handleSave} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings size={18} style={{ color: '#0284C7' }} /> Front Office Operational Rules & Visitor Policies
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Office Opening Time</label>
            <input
              type="text"
              value={formData.officeOpeningTime}
              onChange={(e) => setFormData({ ...formData, officeOpeningTime: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Office Closing Time</label>
            <input
              type="text"
              value={formData.officeClosingTime}
              onChange={(e) => setFormData({ ...formData, officeClosingTime: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Visitor Pass Validity (Hours)</label>
            <input
              type="number"
              value={formData.maxVisitorPassValidityHours}
              onChange={(e) => setFormData({ ...formData, maxVisitorPassValidityHours: Number(e.target.value) })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Chief Receptionist Helpline</label>
            <input
              type="text"
              value={formData.chiefReceptionistHelpline}
              onChange={(e) => setFormData({ ...formData, chiefReceptionistHelpline: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>Automated System SMS & Gate Pass Notifications</h4>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.autoSmsOnVisitorCheckIn}
                onChange={(e) => setFormData({ ...formData, autoSmsOnVisitorCheckIn: e.target.checked })}
              />
              Send Instant SMS to Host Employee on Visitor Check-In
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.autoSmsOnGatePassApproval}
                onChange={(e) => setFormData({ ...formData, autoSmsOnGatePassApproval: e.target.checked })}
              />
              Send SMS Alert to Security & Parents on Gate Pass Approval
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
          <button type="submit" style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFF', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
            Save Reception Settings
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
