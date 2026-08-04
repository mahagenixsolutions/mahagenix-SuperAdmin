import React, { useState } from 'react';
import { Settings, ShieldCheck, Clock, Landmark, QrCode, Bell } from 'lucide-react';
import { useLibraryStore } from '../shared/libraryStore';

export default function LibrarySettingsModule() {
  const { settings, updateSettings, showToast } = useLibraryStore();

  const [formData, setFormData] = useState({
    maxBooksStudent: settings.maxBooksStudent,
    maxBooksTeacher: settings.maxBooksTeacher,
    maxBooksStaff: settings.maxBooksStaff,
    durationDaysStudent: settings.durationDaysStudent,
    durationDaysTeacher: settings.durationDaysTeacher,
    finePerDay: settings.finePerDay,
    gracePeriodDays: settings.gracePeriodDays,
    reservationPickupWindowDays: settings.reservationPickupWindowDays,
    barcodePrefix: settings.barcodePrefix,
    enableSmsAlerts: settings.enableSmsAlerts,
    enableEmailReminders: settings.enableEmailReminders,
    libraryTimings: settings.libraryTimings,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <form onSubmit={handleSave} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings size={18} style={{ color: '#4F46E5' }} /> Library Policy Rules & System Settings
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Student Borrow Limit (Books)</label>
            <input
              type="number"
              value={formData.maxBooksStudent}
              onChange={(e) => setFormData({ ...formData, maxBooksStudent: Number(e.target.value) })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Teacher Borrow Limit (Books)</label>
            <input
              type="number"
              value={formData.maxBooksTeacher}
              onChange={(e) => setFormData({ ...formData, maxBooksTeacher: Number(e.target.value) })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Student Loan Duration (Days)</label>
            <input
              type="number"
              value={formData.durationDaysStudent}
              onChange={(e) => setFormData({ ...formData, durationDaysStudent: Number(e.target.value) })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Teacher Loan Duration (Days)</label>
            <input
              type="number"
              value={formData.durationDaysTeacher}
              onChange={(e) => setFormData({ ...formData, durationDaysTeacher: Number(e.target.value) })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Overdue Fine Rate (₹ / Day)</label>
            <input
              type="number"
              value={formData.finePerDay}
              onChange={(e) => setFormData({ ...formData, finePerDay: Number(e.target.value) })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Grace Period (Days)</label>
            <input
              type="number"
              value={formData.gracePeriodDays}
              onChange={(e) => setFormData({ ...formData, gracePeriodDays: Number(e.target.value) })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Reservation Pickup Window (Days)</label>
            <input
              type="number"
              value={formData.reservationPickupWindowDays}
              onChange={(e) => setFormData({ ...formData, reservationPickupWindowDays: Number(e.target.value) })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Barcode Prefix</label>
            <input
              type="text"
              value={formData.barcodePrefix}
              onChange={(e) => setFormData({ ...formData, barcodePrefix: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>Notification & Operating Hours</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            <div>
              <label style={labelStyle}>Library Opening Hours</label>
              <input
                type="text"
                value={formData.libraryTimings}
                onChange={(e) => setFormData({ ...formData, libraryTimings: e.target.value })}
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.enableSmsAlerts}
                  onChange={(e) => setFormData({ ...formData, enableSmsAlerts: e.target.checked })}
                />
                Enable Overdue SMS Alerts
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.enableEmailReminders}
                  onChange={(e) => setFormData({ ...formData, enableEmailReminders: e.target.checked })}
                />
                Enable Email Reminders
              </label>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
          <button type="submit" style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: '#FFF', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
            Save Settings & Policy Rules
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
