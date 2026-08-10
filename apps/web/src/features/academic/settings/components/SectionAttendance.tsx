import React from 'react';
import type { AcademicSettingsConfig } from '../types';
import { CheckSquare } from 'lucide-react';

interface SectionAttendanceProps {
  config: AcademicSettingsConfig;
  onChange: (updates: Partial<AcademicSettingsConfig>) => void;
}

export const SectionAttendance: React.FC<SectionAttendanceProps> = ({ config, onChange }) => {
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
        <CheckSquare size={20} color="#3B7E5E" />
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
            Section 4: Institutional Attendance Rules & Compliance Policies
          </h3>
          <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Set minimum attendance thresholds, roll call lock times, and automated parent advisories.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Minimum Mandatory Attendance %</label>
          <input
            type="number"
            value={config.minAttendancePct}
            onChange={(e) => onChange({ minAttendancePct: Number(e.target.value) })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Late Entry Threshold (Mins)</label>
          <input
            type="number"
            value={config.lateEntryThresholdMins}
            onChange={(e) => onChange({ lateEntryThresholdMins: Number(e.target.value) })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Attendance Register Lock Time</label>
          <input
            type="text"
            value={config.attendanceLockTime}
            onChange={(e) => onChange({ attendanceLockTime: e.target.value })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>Automated Parent Absence SMS / App Alerts</div>
          <div style={{ fontSize: '11px', color: '#64748B' }}>Dispatch instant push & SMS alerts to parents when student is marked absent during morning roll call.</div>
        </div>
        <button
          onClick={() => onChange({ autoParentAttendanceAlert: !config.autoParentAttendanceAlert })}
          style={{
            background: config.autoParentAttendanceAlert ? '#3B7E5E' : '#CBD5E1',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          {config.autoParentAttendanceAlert ? 'ENABLED' : 'DISABLED'}
        </button>
      </div>
    </div>
  );
};
