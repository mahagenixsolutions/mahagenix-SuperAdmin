import React from 'react';
import type { AcademicSettingsConfig } from '../types';
import { FileText } from 'lucide-react';

interface SectionAssignmentProps {
  config: AcademicSettingsConfig;
  onChange: (updates: Partial<AcademicSettingsConfig>) => void;
}

export const SectionAssignment: React.FC<SectionAssignmentProps> = ({ config, onChange }) => {
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
        <FileText size={20} color="#3B7E5E" />
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
            Section 5: Assignment Operations & Submission Rules
          </h3>
          <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Configure submission formats, late penalty rates, rubric evaluation, and attachment limits.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Submission Mode</label>
          <select
            value={config.assignmentSubmissions}
            onChange={(e) => onChange({ assignmentSubmissions: e.target.value as any })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
          >
            <option value="Physical">Physical Submission</option>
            <option value="Digital">Digital Portal Submission</option>
            <option value="Mixed">Mixed (Physical + Digital)</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Late Penalty (% / Day)</label>
          <input
            type="number"
            value={config.latePenaltyPerDayPct}
            onChange={(e) => onChange({ latePenaltyPerDayPct: Number(e.target.value) })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Max Attachments Allowed</label>
          <input
            type="number"
            value={config.maxAttachments}
            onChange={(e) => onChange({ maxAttachments: Number(e.target.value) })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>Automated Student Due-Date Reminders</div>
          <div style={{ fontSize: '11px', color: '#64748B' }}>Send push notifications 24 hours prior to assignment deadlines.</div>
        </div>
        <button
          onClick={() => onChange({ autoAssignmentReminders: !config.autoAssignmentReminders })}
          style={{
            background: config.autoAssignmentReminders ? '#3B7E5E' : '#CBD5E1',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          {config.autoAssignmentReminders ? 'ENABLED' : 'DISABLED'}
        </button>
      </div>
    </div>
  );
};
