import React from 'react';
import type { AcademicSettingsConfig } from '../types';
import { Bell } from 'lucide-react';

interface SectionNotificationsProps {
  config: AcademicSettingsConfig;
  onChange: (updates: Partial<AcademicSettingsConfig>) => void;
}

export const SectionNotifications: React.FC<SectionNotificationsProps> = ({ config, onChange }) => {
  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
        <Bell size={20} color="#3B7E5E" />
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
            Section 10: Institutional Communication & Multi-Channel Alert Preferences
          </h3>
          <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Configure recipient targeting (Faculty, Students, Parents) and notification dispatch rules.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '12px', fontWeight: 700 }}>Faculty Alerts</span>
          <button onClick={() => onChange({ notifyTeachers: !config.notifyTeachers })} style={{ background: config.notifyTeachers ? '#3B7E5E' : '#CBD5E1', color: 'white', border: 'none', borderRadius: '14px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
            {config.notifyTeachers ? 'ON' : 'OFF'}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '12px', fontWeight: 700 }}>Student Alerts</span>
          <button onClick={() => onChange({ notifyStudents: !config.notifyStudents })} style={{ background: config.notifyStudents ? '#3B7E5E' : '#CBD5E1', color: 'white', border: 'none', borderRadius: '14px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
            {config.notifyStudents ? 'ON' : 'OFF'}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '12px', fontWeight: 700 }}>Parent Alerts</span>
          <button onClick={() => onChange({ notifyParents: !config.notifyParents })} style={{ background: config.notifyParents ? '#3B7E5E' : '#CBD5E1', color: 'white', border: 'none', borderRadius: '14px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
            {config.notifyParents ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </div>
  );
};
