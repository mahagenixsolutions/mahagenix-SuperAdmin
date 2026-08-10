import React from 'react';
import { motion } from 'framer-motion';
import type { AcademicSettingsConfig } from '../types';
import { Calendar, RefreshCw, Plus } from 'lucide-react';

interface SectionAcademicYearProps {
  config: AcademicSettingsConfig;
  onChange: (updates: Partial<AcademicSettingsConfig>) => void;
  onUpdateAcademicYear: () => void;
  onGenerateCalendar: () => void;
}

export const SectionAcademicYear: React.FC<SectionAcademicYearProps> = ({
  config,
  onChange,
  onUpdateAcademicYear,
  onGenerateCalendar
}) => {
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
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
        <Calendar size={20} color="#3B7E5E" />
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
            Section 1: Academic Year & Term Configuration
          </h3>
          <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Configure institutional academic sessions, term structures, semester systems, and working days.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Current Academic Year</label>
          <input
            type="text"
            value={config.academicYear}
            onChange={(e) => onChange({ academicYear: e.target.value })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Academic Session Range</label>
          <input
            type="text"
            value={config.sessionRange}
            onChange={(e) => onChange({ sessionRange: e.target.value })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Term Structure</label>
          <input
            type="text"
            value={config.termStructure}
            onChange={(e) => onChange({ termStructure: e.target.value })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'block', marginBottom: '6px' }}>Promotion Policy Minimum %</label>
          <input
            type="number"
            value={config.promotionPolicyPct}
            onChange={(e) => onChange({ promotionPolicyPct: Number(e.target.value) })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
          />
        </div>
      </div>

      {/* Toggle row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>Enable Semester System</div>
          <div style={{ fontSize: '11px', color: '#64748B' }}>Split academic year into Semester 1 & Semester 2 evaluation cycles.</div>
        </div>
        <button
          onClick={() => onChange({ semesterSystem: !config.semesterSystem })}
          style={{
            background: config.semesterSystem ? '#3B7E5E' : '#CBD5E1',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          {config.semesterSystem ? 'ENABLED' : 'DISABLED'}
        </button>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
        <button
          onClick={onUpdateAcademicYear}
          style={{ background: '#3B7E5E', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <RefreshCw size={14} /> Update Academic Year
        </button>
        <button
          onClick={onGenerateCalendar}
          style={{ background: 'white', border: '1px solid #CBD5E1', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={14} color="#3B7E5E" /> Generate Academic Calendar
        </button>
      </div>

    </div>
  );
};
