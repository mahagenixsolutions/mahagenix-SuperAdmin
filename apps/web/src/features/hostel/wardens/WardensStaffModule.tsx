import React, { useState } from 'react';
import { useHostelStore } from '../shared/hostelStore';
import { ShieldCheck, Phone, Mail, Clock, Plus } from 'lucide-react';

export default function WardensStaffModule() {
  const { wardens, showToast } = useHostelStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Hostel Wardens & Staff Roster</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Manage assigned building wardens, shift schedules, night duty logs, and emergency contacts.</p>
        </div>
        <button
          onClick={() => showToast('Add Warden Staff modal triggered.')}
          style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#6366F1', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Add Warden Staff
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
        {wardens.map((wdn) => (
          <div key={wdn.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', background: 'rgba(99,102,241,0.1)', color: '#6366F1' }}>{wdn.role}</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#10B981' }}>{wdn.attendanceStatus}</span>
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{wdn.name}</h4>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Assigned Block: <strong>{wdn.assignedBuilding}</strong></span>
            <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Shift: {wdn.dutyShift}</span>
            <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '10px', fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span>Phone: <strong>{wdn.phone}</strong></span>
              <span>Email: <strong>{wdn.email}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
