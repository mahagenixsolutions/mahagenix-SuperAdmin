import React from 'react';
import type { AcademicSettingsConfig } from '../types';
import { Layers } from 'lucide-react';

interface SectionLessonPlanProps {
  config: AcademicSettingsConfig;
  onChange: (updates: Partial<AcademicSettingsConfig>) => void;
}

export const SectionLessonPlan: React.FC<SectionLessonPlanProps> = ({ config, onChange }) => {
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
        <Layers size={20} color="#3B7E5E" />
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
            Section 6: Lesson Plan Governance & Approval Workflows
          </h3>
          <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Set lesson plan submission frequencies, HOD signoff requirements, and automated reminders.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Submission Frequency</label>
          <select
            value={config.lessonPlanFrequency}
            onChange={(e) => onChange({ lessonPlanFrequency: e.target.value as any })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
          >
            <option value="Weekly">Weekly Submission (Every Friday)</option>
            <option value="Monthly">Monthly Scope & Sequence Submission</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyRight: 'center' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>HOD Signoff Requirement</label>
          <button
            onClick={() => onChange({ lessonPlanApprovalRequired: !config.lessonPlanApprovalRequired })}
            style={{
              background: config.lessonPlanApprovalRequired ? '#3B7E5E' : '#CBD5E1',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {config.lessonPlanApprovalRequired ? 'MANDATORY HOD SIGNOFF' : 'OPTIONAL HOD REVIEW'}
          </button>
        </div>
      </div>
    </div>
  );
};
