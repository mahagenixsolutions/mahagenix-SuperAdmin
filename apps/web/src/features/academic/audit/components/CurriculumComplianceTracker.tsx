import React from 'react';
import { motion } from 'framer-motion';
import type { CurriculumComplianceItem } from '../types';
import { TrendingUp, Layers, AlertTriangle } from 'lucide-react';

interface CurriculumComplianceTrackerProps {
  curriculumList: CurriculumComplianceItem[];
}

export const CurriculumComplianceTracker: React.FC<CurriculumComplianceTrackerProps> = ({ curriculumList }) => {
  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: '#EAF5F0',
            color: '#3B7E5E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Layers size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Curriculum Progress vs Expected Milestone Variance
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Tracking actual syllabus coverage against CBSE mid-term benchmarks.
            </p>
          </div>
        </div>

        <span style={{ fontSize: '13px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          91% Syllabus Delivered
        </span>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {curriculumList.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -2 }}
            style={{
              background: '#F8FAFC',
              border: item.variancePct < -10 ? '1.5px solid #FCA5A5' : '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                  {item.subject}
                </h4>
                <div style={{ fontSize: '11px', color: '#64748B' }}>{item.grade} • Teacher: {item.teacherName}</div>
              </div>

              <span style={{
                background: item.variancePct >= 0 ? '#ECFDF5' : item.variancePct >= -10 ? '#FEF3C7' : '#FEF2F2',
                color: item.variancePct >= 0 ? '#047857' : item.variancePct >= -10 ? '#B45309' : '#DC2626',
                border: `1px solid ${item.variancePct >= 0 ? '#A7F3D0' : item.variancePct >= -10 ? '#FDE68A' : '#FCA5A5'}`,
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700
              }}>
                {item.variancePct >= 0 ? `+${item.variancePct}% Ahead` : `${item.variancePct}% Lag`}
              </span>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                <span>Actual: {item.actualProgressPct}%</span>
                <span style={{ fontSize: '11px', color: '#64748B' }}>Target: {item.expectedProgressPct}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${item.actualProgressPct}%`, height: '100%', background: item.actualProgressPct >= item.expectedProgressPct ? '#5FAF88' : '#F59E0B', borderRadius: '3px' }} />
              </div>
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  );
};
