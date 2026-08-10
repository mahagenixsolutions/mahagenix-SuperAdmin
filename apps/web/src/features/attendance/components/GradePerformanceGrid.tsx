import React from 'react';
import { motion } from 'framer-motion';
import { gradeAttendanceData } from '../mockData';
import { Layers, ArrowUpRight, ArrowDownRight, Eye } from 'lucide-react';

interface GradePerformanceGridProps {
  onViewGrade: (grade: string) => void;
}

export const GradePerformanceGrid: React.FC<GradePerformanceGridProps> = ({ onViewGrade }) => {
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
              Grade-Level Attendance Performance Scorecards
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Attendance benchmarks across Grade 8 through Grade 12.
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        {gradeAttendanceData.map((g) => (
          <motion.div
            key={g.grade}
            whileHover={{ y: -2 }}
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                {g.grade}
              </h4>
              <span style={{
                background: g.pct > 94 ? '#ECFDF5' : '#FEF3C7',
                color: g.pct > 94 ? '#047857' : '#B45309',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '10px',
                fontWeight: 800
              }}>
                {g.pct > 94 ? 'Optimal' : 'Advisory'}
              </span>
            </div>

            <div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: g.pct > 94 ? '#3B7E5E' : '#D97706' }}>
                {g.pct}%
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                Present: {g.present} | Absent: {g.absent} | Late: {g.late}
              </div>
            </div>

            <button
              onClick={() => onViewGrade(g.grade)}
              style={{
                width: '100%',
                background: 'white',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                padding: '6px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#1E293B',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
            >
              <Eye size={12} /> View Section Details
            </button>

          </motion.div>
        ))}
      </div>
    </div>
  );
};
