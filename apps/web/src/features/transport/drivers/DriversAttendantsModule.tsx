import React, { useState } from 'react';
import { useTransportStore } from '../shared/transportStore';
import { User, Users, ShieldCheck, Phone, Star, Award, Plus } from 'lucide-react';

export default function DriversAttendantsModule() {
  const { drivers } = useTransportStore();
  const [tab, setTab] = useState<'drivers' | 'attendants'>('drivers');

  const driversList = drivers.filter((d) => d.role === 'Driver');
  const attendantsList = drivers.filter((d) => d.role === 'Attendant');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--bg-surface-raised, #F1F5F9)', border: '1px solid var(--border-subtle, rgba(226, 232, 240, 0.8))', borderRadius: '9999px', padding: '4px 6px', gap: '4px', width: 'fit-content' }}>
        <button
          onClick={() => setTab('drivers')}
          style={{ padding: '8px 18px', borderRadius: '9999px', border: 'none', background: tab === 'drivers' ? '#ffffff' : 'transparent', color: tab === 'drivers' ? '#0284C7' : '#475569', fontWeight: tab === 'drivers' ? 700 : 600, fontSize: '13px', cursor: 'pointer', boxShadow: tab === 'drivers' ? '0 2px 8px rgba(2, 132, 199, 0.12), 0 1px 3px rgba(0, 0, 0, 0.06)' : 'none', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          Drivers Directory ({driversList.length})
        </button>
        <button
          onClick={() => setTab('attendants')}
          style={{ padding: '8px 18px', borderRadius: '9999px', border: 'none', background: tab === 'attendants' ? '#ffffff' : 'transparent', color: tab === 'attendants' ? '#0284C7' : '#475569', fontWeight: tab === 'attendants' ? 700 : 600, fontSize: '13px', cursor: 'pointer', boxShadow: tab === 'attendants' ? '0 2px 8px rgba(2, 132, 199, 0.12), 0 1px 3px rgba(0, 0, 0, 0.06)' : 'none', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          Bus Attendants Directory ({attendantsList.length})
        </button>
      </div>

      {tab === 'drivers' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
          {driversList.map((drv) => (
            <div key={drv.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{drv.name}</h4>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#F59E0B' }}>⭐ {drv.performanceRating} / 5</span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>License: <strong>{drv.licenseNumber}</strong> (Exp: {drv.licenseExpiry})</span>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Assigned Bus: <strong>{drv.assignedBusNumber || 'Unassigned'}</strong> ({drv.assignedRouteName})</span>
              <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '8px', fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Phone: {drv.phone}</span>
                <span>{drv.experienceYears} Yrs Exp</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
          {attendantsList.map((att) => (
            <div key={att.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{att.name}</h4>
                <span style={{ fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', background: '#DCFCE7', color: '#166534' }}>First-Aid Certified</span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Assigned Bus: <strong>{att.assignedBusNumber || 'Unassigned'}</strong> ({att.assignedRouteName})</span>
              <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '8px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                Phone Contact: {att.phone}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
