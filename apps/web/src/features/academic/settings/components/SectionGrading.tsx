import React from 'react';
import type { AcademicSettingsConfig } from '../types';
import { Award } from 'lucide-react';

interface SectionGradingProps {
  config: AcademicSettingsConfig;
  onChange: (updates: Partial<AcademicSettingsConfig>) => void;
}

export const SectionGrading: React.FC<SectionGradingProps> = ({ config, onChange }) => {
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
        <Award size={20} color="#3B7E5E" />
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
            Section 3: Grading System & Assessment Weightage Rules
          </h3>
          <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Configure CGPA scale, pass mark thresholds, grace marks policy, and exam component weightage.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Grade Scale Standard</label>
          <input
            type="text"
            value={config.gradeScale}
            onChange={(e) => onChange({ gradeScale: e.target.value })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Pass Percentage (%)</label>
          <input
            type="number"
            value={config.passPercentage}
            onChange={(e) => onChange({ passPercentage: Number(e.target.value) })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px' }}>
        <div>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Max Grace Marks</label>
          <input
            type="number"
            value={config.graceMarksMax}
            onChange={(e) => onChange({ graceMarksMax: Number(e.target.value) })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Internal Weight (%)</label>
          <input
            type="number"
            value={config.internalWeightagePct}
            onChange={(e) => onChange({ internalWeightagePct: Number(e.target.value) })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Practical Weight (%)</label>
          <input
            type="number"
            value={config.practicalWeightagePct}
            onChange={(e) => onChange({ practicalWeightagePct: Number(e.target.value) })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Final Exam Weight (%)</label>
          <input
            type="number"
            value={config.finalExamWeightagePct}
            onChange={(e) => onChange({ finalExamWeightagePct: Number(e.target.value) })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
          />
        </div>
      </div>
    </div>
  );
};
