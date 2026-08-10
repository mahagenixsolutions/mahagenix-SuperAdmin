import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Award, 
  TrendingUp 
} from 'lucide-react';

export const AuditExecutiveBanner: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F4F9F6 50%, #EAF5F0 100%)',
        border: '1px solid rgba(95, 175, 136, 0.25)',
        borderRadius: '16px',
        padding: '24px 28px',
        boxShadow: '0 8px 30px -4px rgba(95, 175, 136, 0.12)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
        
        {/* Metrics Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          
          {/* Overall Academic Compliance */}
          <div style={{ minWidth: '150px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Academic Compliance
            </div>
            <div style={{ fontSize: '30px', fontWeight: 800, color: '#3B7E5E', marginTop: '4px' }}>
              94%
            </div>
            <div style={{ fontSize: '11px', color: '#047857', fontWeight: 600, marginTop: '2px' }}>
              Institutional Index
            </div>
          </div>

          <div style={{ width: '1px', height: '44px', background: '#CBD5E1' }} />

          {/* Curriculum Coverage */}
          <div style={{ minWidth: '110px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Curriculum
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
              91%
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, marginTop: '2px' }}>
              Syllabus Progress
            </div>
          </div>

          {/* Lesson Plans */}
          <div style={{ minWidth: '100px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Lesson Plans
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>
              96%
            </div>
            <div style={{ fontSize: '11px', color: '#047857', fontWeight: 600, marginTop: '2px' }}>
              HOD Approved
            </div>
          </div>

          {/* Assessment Compliance */}
          <div style={{ minWidth: '100px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Assessments
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#F59E0B', marginTop: '4px' }}>
              89%
            </div>
            <div style={{ fontSize: '11px', color: '#B45309', fontWeight: 600, marginTop: '2px' }}>
              Blueprint Compliant
            </div>
          </div>

          {/* Homework Compliance */}
          <div style={{ minWidth: '100px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Homework
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#3B82F6', marginTop: '4px' }}>
              92%
            </div>
            <div style={{ fontSize: '11px', color: '#1E40AF', fontWeight: 600, marginTop: '2px' }}>
              Weekly Evaluation
            </div>
          </div>

          {/* Teaching Quality */}
          <div style={{ minWidth: '110px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Teaching Quality
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#8B5CF6', marginTop: '4px' }}>
              95%
            </div>
            <div style={{ fontSize: '11px', color: '#6B21A8', fontWeight: 600, marginTop: '2px' }}>
              Audited Rating
            </div>
          </div>

          <div style={{ width: '1px', height: '44px', background: '#CBD5E1' }} />

          {/* Audit Status & Next Audit */}
          <div style={{ minWidth: '140px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Audit Status
            </div>
            <span style={{
              display: 'inline-block',
              marginTop: '4px',
              background: '#ECFDF5',
              color: '#047857',
              border: '1px solid #A7F3D0',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 800
            }}>
              ✓ Healthy
            </span>
            <div style={{ fontSize: '11px', color: '#475569', fontWeight: 600, marginTop: '4px' }}>
              Next Audit: 12 August
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
};
