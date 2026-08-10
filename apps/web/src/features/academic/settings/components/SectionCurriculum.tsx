import React from 'react';
import { motion } from 'framer-motion';
import type { AcademicSettingsConfig } from '../types';
import { BookOpen, Sparkles } from 'lucide-react';

interface SectionCurriculumProps {
  config: AcademicSettingsConfig;
  onChange: (updates: Partial<AcademicSettingsConfig>) => void;
}

export const SectionCurriculum: React.FC<SectionCurriculumProps> = ({ config, onChange }) => {
  const boards: AcademicSettingsConfig['educationBoard'][] = ['CBSE', 'ICSE', 'State Board', 'IB', 'Cambridge'];

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
        <BookOpen size={20} color="#3B7E5E" />
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
            Section 2: Curriculum & Education Board Settings
          </h3>
          <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Select primary educational affiliation board, curriculum version, and syllabus tracking targets.
          </p>
        </div>
      </div>

      <div>
        <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '8px' }}>Education Board Affiliation</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '8px' }}>
          {boards.map(board => (
            <button
              key={board}
              onClick={() => onChange({ educationBoard: board })}
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                background: config.educationBoard === board ? '#3B7E5E' : 'white',
                color: config.educationBoard === board ? 'white' : '#475569'
              }}
            >
              {board}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Curriculum Blueprint Version</label>
          <input
            type="text"
            value={config.curriculumVersion}
            onChange={(e) => onChange({ curriculumVersion: e.target.value })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Syllabus Completion Target %</label>
          <input
            type="number"
            value={config.syllabusTargetPct}
            onChange={(e) => onChange({ syllabusTargetPct: Number(e.target.value) })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>Automated AI Curriculum Tracking</div>
          <div style={{ fontSize: '11px', color: '#64748B' }}>Auto-calculate syllabus completion % from lesson plan submissions & teacher logbooks.</div>
        </div>
        <button
          onClick={() => onChange({ autoCurriculumTracking: !config.autoCurriculumTracking })}
          style={{
            background: config.autoCurriculumTracking ? '#3B7E5E' : '#CBD5E1',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          {config.autoCurriculumTracking ? 'ENABLED' : 'DISABLED'}
        </button>
      </div>

    </div>
  );
};
