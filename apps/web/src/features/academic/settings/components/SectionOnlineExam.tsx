import React from 'react';
import type { AcademicSettingsConfig } from '../types';
import { FileCheck } from 'lucide-react';

interface SectionOnlineExamProps {
  config: AcademicSettingsConfig;
  onChange: (updates: Partial<AcademicSettingsConfig>) => void;
}

export const SectionOnlineExam: React.FC<SectionOnlineExamProps> = ({ config, onChange }) => {
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
        <FileCheck size={20} color="#3B7E5E" />
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
            Section 8: Online Examination & Proctoring Security Rules
          </h3>
          <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Configure proctored browser locks, question randomization, negative marking, and duration.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Default Exam Duration (Mins)</label>
          <input
            type="number"
            value={config.onlineExamDurationMins}
            onChange={(e) => onChange({ onlineExamDurationMins: Number(e.target.value) })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Negative Marking Rate</label>
          <input
            type="number"
            step="0.05"
            value={config.negativeMarking}
            onChange={(e) => onChange({ negativeMarking: Number(e.target.value) })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyRight: 'center' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Proctored Browser Lock</label>
          <button
            onClick={() => onChange({ browserLockEnabled: !config.browserLockEnabled })}
            style={{
              background: config.browserLockEnabled ? '#3B7E5E' : '#CBD5E1',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {config.browserLockEnabled ? 'STRICT LOCK ENABLED' : 'NORMAL MODE'}
          </button>
        </div>
      </div>
    </div>
  );
};
