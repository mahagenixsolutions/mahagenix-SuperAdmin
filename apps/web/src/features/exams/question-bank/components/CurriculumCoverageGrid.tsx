import React from 'react';
import { motion } from 'framer-motion';
import type { CurriculumCoverageItem } from '../types';
import { 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';

interface CurriculumCoverageGridProps {
  coverageList: CurriculumCoverageItem[];
}

export const CurriculumCoverageGrid: React.FC<CurriculumCoverageGridProps> = ({ coverageList }) => {
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
              Syllabus & Curriculum Coverage Audit
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Identifies chapter gaps, unmapped learning outcomes, and question shortages across subjects.
            </p>
          </div>
        </div>

        <div style={{ fontSize: '13px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          Overall Coverage: 89.2%
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {coverageList.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -2 }}
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '14px'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                  {item.subject}
                </h4>
                <span style={{ fontSize: '14px', fontWeight: 800, color: item.coveragePct > 90 ? '#3B7E5E' : '#B45309' }}>
                  {item.coveragePct}%
                </span>
              </div>

              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                {item.coveredChapters} of {item.totalChapters} Chapters Covered ({item.totalQuestions} Questions)
              </div>
            </div>

            <div style={{ width: '100%', height: '6px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${item.coveragePct}%`, height: '100%', background: '#5FAF88', borderRadius: '3px' }} />
            </div>

            {/* Missing chapters alert */}
            {item.missingChapters.length > 0 && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', padding: '8px 10px', fontSize: '11px', color: '#991B1B', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                <AlertTriangle size={13} color="#EF4444" style={{ flexShrink: 0, marginTop: '1px' }} />
                <div>
                  <strong>Missing Coverage:</strong> {item.missingChapters.join(', ')}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
