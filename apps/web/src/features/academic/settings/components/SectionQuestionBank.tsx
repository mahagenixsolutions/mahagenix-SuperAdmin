import React from 'react';
import type { AcademicSettingsConfig } from '../types';
import { HelpCircle } from 'lucide-react';

interface SectionQuestionBankProps {
  config: AcademicSettingsConfig;
  onChange: (updates: Partial<AcademicSettingsConfig>) => void;
}

export const SectionQuestionBank: React.FC<SectionQuestionBankProps> = ({ config, onChange }) => {
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
        <HelpCircle size={20} color="#3B7E5E" />
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
            Section 9: Question Bank Taxonomy & Review Policy
          </h3>
          <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Configure Bloom's taxonomy tagging, duplicate detection, and AI question generation workflows.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '12px', fontWeight: 700 }}>HOD Review Required</span>
          <button onClick={() => onChange({ questionReviewRequired: !config.questionReviewRequired })} style={{ background: config.questionReviewRequired ? '#3B7E5E' : '#CBD5E1', color: 'white', border: 'none', borderRadius: '14px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
            {config.questionReviewRequired ? 'ON' : 'OFF'}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '12px', fontWeight: 700 }}>Duplicate Detection</span>
          <button onClick={() => onChange({ duplicateDetectionEnabled: !config.duplicateDetectionEnabled })} style={{ background: config.duplicateDetectionEnabled ? '#3B7E5E' : '#CBD5E1', color: 'white', border: 'none', borderRadius: '14px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
            {config.duplicateDetectionEnabled ? 'ON' : 'OFF'}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '12px', fontWeight: 700 }}>AI Question Gen</span>
          <button onClick={() => onChange({ aiQuestionGenEnabled: !config.aiQuestionGenEnabled })} style={{ background: config.aiQuestionGenEnabled ? '#3B7E5E' : '#CBD5E1', color: 'white', border: 'none', borderRadius: '14px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
            {config.aiQuestionGenEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </div>
  );
};
