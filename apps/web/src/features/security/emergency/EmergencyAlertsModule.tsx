import React, { useState } from 'react';
import { ShieldAlert, Bell, Flame, HeartPulse, Lock, Megaphone } from 'lucide-react';

export default function EmergencyAlertsModule() {
  const [activeAlert, setActiveAlert] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const handleBroadcast = (type: string) => {
    setActiveAlert(type);
    setToast(`🚨 BROADCASTING CAMPUS-WIDE EMERGENCY: ${type.toUpperCase()}! Security guards and Principal notified.`);
    setTimeout(() => setToast(null), 4000);
  };

  const handleClearAlert = () => {
    setActiveAlert(null);
    setToast('✅ Campus Status: ALL CLEAR. Emergency resolved.');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      {toast && (
        <div style={{ padding: '14px 20px', borderRadius: '12px', background: activeAlert ? '#FEF2F2' : 'var(--bg-surface-raised)', border: activeAlert ? '2px solid #EF4444' : '1px solid #10B981', fontWeight: 700, fontSize: '13px', color: activeAlert ? '#991B1B' : 'var(--text-primary)', boxShadow: '0 4px 12px rgba(239,68,68,0.2)' }}>
          {toast}
        </div>
      )}

      {/* Emergency Action Buttons */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={20} style={{ color: '#EF4444' }} /> Emergency Response & Broadcast Console
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>Trigger instant campus-wide alarms, SMS to all staff, and automated gate lockdowns.</p>
          </div>
          {activeAlert && (
            <button onClick={handleClearAlert} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#10B981', color: '#FFF', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>
              Declare All Clear
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {[
            { label: 'Campus Lockdown', color: '#EF4444', icon: <Lock size={20} /> },
            { label: 'Fire Emergency', color: '#F97316', icon: <Flame size={20} /> },
            { label: 'Medical Emergency', color: '#EC4899', icon: <HeartPulse size={20} /> },
            { label: 'Campus Evacuation', color: '#8B5CF6', icon: <Megaphone size={20} /> },
          ].map((btn, idx) => (
            <button
              key={idx}
              onClick={() => handleBroadcast(btn.label)}
              style={{
                padding: '16px', borderRadius: '12px', border: 'none',
                background: btn.color, color: '#FFF', fontWeight: 800, fontSize: '13px',
                cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              {btn.icon}
              Trigger {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
