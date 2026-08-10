import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Star, 
  TrendingUp 
} from 'lucide-react';

export const PerformanceHeroBanner: React.FC = () => {
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
          
          {/* Overall Faculty Index */}
          <div style={{ minWidth: '140px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Faculty Index
            </div>
            <div style={{ fontSize: '30px', fontWeight: 800, color: '#3B7E5E', marginTop: '4px' }}>
              94.2%
            </div>
            <div style={{ fontSize: '11px', color: '#047857', fontWeight: 600, marginTop: '2px' }}>
              86 Active Educators
            </div>
          </div>

          <div style={{ width: '1px', height: '44px', background: '#CBD5E1' }} />

          {/* Top Performers (A+) */}
          <div style={{ minWidth: '110px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Top Tier (A+)
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>
              34
            </div>
            <div style={{ fontSize: '11px', color: '#047857', fontWeight: 600, marginTop: '2px' }}>
              Outstanding Educators
            </div>
          </div>

          {/* Satisfactory (B/C) */}
          <div style={{ minWidth: '110px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Satisfactory (B/C)
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#3B82F6', marginTop: '4px' }}>
              46
            </div>
            <div style={{ fontSize: '11px', color: '#1E40AF', fontWeight: 600, marginTop: '2px' }}>
              Meets Expectations
            </div>
          </div>

          {/* PIP Required */}
          <div style={{ minWidth: '90px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Under PIP
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#EF4444', marginTop: '4px' }}>
              6
            </div>
            <div style={{ fontSize: '11px', color: '#DC2626', fontWeight: 600, marginTop: '2px' }}>
              Mentoring Active
            </div>
          </div>

          <div style={{ width: '1px', height: '44px', background: '#CBD5E1' }} />

          {/* Avg Student Rating */}
          <div style={{ minWidth: '120px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Student Rating
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#F59E0B', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Star size={20} fill="#F59E0B" /> 4.8 / 5
            </div>
            <div style={{ fontSize: '11px', color: '#B45309', fontWeight: 600, marginTop: '2px' }}>
              1,420 Feedback Forms
            </div>
          </div>

          {/* Syllabus Execution */}
          <div style={{ minWidth: '120px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Syllabus Execution
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
              96.4%
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, marginTop: '2px' }}>
              Marking SLA: 95.8%
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
};
