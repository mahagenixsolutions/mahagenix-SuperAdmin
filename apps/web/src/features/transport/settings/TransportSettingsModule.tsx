import React, { useState } from 'react';
import { Settings, ShieldCheck, Clock, MapPin, Fuel } from 'lucide-react';
import { useTransportStore } from '../shared/transportStore';

export default function TransportSettingsModule() {
  const { settings, updateSettings } = useTransportStore();

  const [formData, setFormData] = useState({
    maxBusCapacity: settings.maxBusCapacity,
    maxSpeedLimitKmH: settings.maxSpeedLimitKmH,
    idleTimeoutMins: settings.idleTimeoutMins,
    maintenanceIntervalKm: settings.maintenanceIntervalKm,
    fuelBudgetMonthly: settings.fuelBudgetMonthly,
    enableParentSmsAlerts: settings.enableParentSmsAlerts,
    enableGpsLiveTracking: settings.enableGpsLiveTracking,
    emergencyContactNumber: settings.emergencyContactNumber,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <form onSubmit={handleSave} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings size={18} style={{ color: '#10B981' }} /> Transport Fleet Policies & GPS Settings
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Speed Limit Threshold (km/h)</label>
            <input
              type="number"
              value={formData.maxSpeedLimitKmH}
              onChange={(e) => setFormData({ ...formData, maxSpeedLimitKmH: Number(e.target.value) })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Idle Timeout Alert (Mins)</label>
            <input
              type="number"
              value={formData.idleTimeoutMins}
              onChange={(e) => setFormData({ ...formData, idleTimeoutMins: Number(e.target.value) })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Servicing Interval (KM)</label>
            <input
              type="number"
              value={formData.maintenanceIntervalKm}
              onChange={(e) => setFormData({ ...formData, maintenanceIntervalKm: Number(e.target.value) })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Monthly Fuel Budget (₹)</label>
            <input
              type="number"
              value={formData.fuelBudgetMonthly}
              onChange={(e) => setFormData({ ...formData, fuelBudgetMonthly: Number(e.target.value) })}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>Emergency Contacts & Alerts</h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            <div>
              <label style={labelStyle}>Emergency Control Room Phone</label>
              <input
                type="text"
                value={formData.emergencyContactNumber}
                onChange={(e) => setFormData({ ...formData, emergencyContactNumber: e.target.value })}
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.enableParentSmsAlerts}
                  onChange={(e) => setFormData({ ...formData, enableParentSmsAlerts: e.target.checked })}
                />
                Enable Parent SMS Delay Alerts
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.enableGpsLiveTracking}
                  onChange={(e) => setFormData({ ...formData, enableGpsLiveTracking: e.target.checked })}
                />
                Enable GPS Telematics Live Broadcast
              </label>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
          <button type="submit" style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: '#10B981', color: '#FFF', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
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
