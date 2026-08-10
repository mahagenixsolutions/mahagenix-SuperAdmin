import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  TrendingUp 
} from 'lucide-react';

export const AssignmentHeroBanner: React.FC = () => {
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
          
          {/* Assignments This Week */}
          <div style={{ minWidth: '130px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Assignments This Week
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
              148
            </div>
            <div style={{ fontSize: '11px', color: '#3B7E5E', fontWeight: 600, marginTop: '2px' }}>
              124 Published Live
            </div>
          </div>

          <div style={{ width: '1px', height: '44px', background: '#CBD5E1' }} />

          {/* Pending Reviews */}
          <div style={{ minWidth: '110px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Pending Reviews
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#F59E0B', marginTop: '4px' }}>
              18
            </div>
            <div style={{ fontSize: '11px', color: '#B45309', fontWeight: 600, marginTop: '2px' }}>
              Policy Check Needed
            </div>
          </div>

          <div style={{ width: '1px', height: '44px', background: '#CBD5E1' }} />

          {/* Awaiting Evaluation */}
          <div style={{ minWidth: '120px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Awaiting Evaluation
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#3B82F6', marginTop: '4px' }}>
              22
            </div>
            <div style={{ fontSize: '11px', color: '#1E40AF', fontWeight: 600, marginTop: '2px' }}>
              6 Late Evaluations
            </div>
          </div>

          {/* Completed Evaluations */}
          <div style={{ minWidth: '110px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Evaluated
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>
              84
            </div>
            <div style={{ fontSize: '11px', color: '#047857', fontWeight: 600, marginTop: '2px' }}>
              Marks Recorded
            </div>
          </div>

          <div style={{ width: '1px', height: '44px', background: '#CBD5E1' }} />

          {/* Avg Submission Rate */}
          <div style={{ minWidth: '120px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Avg Submission Rate
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#3B7E5E', marginTop: '4px' }}>
              93.4%
            </div>
            <div style={{ fontSize: '11px', color: '#3B7E5E', fontWeight: 600, marginTop: '2px' }}>
              +1.8% vs last week
            </div>
          </div>

          {/* Student Completion Rate */}
          <div style={{ minWidth: '120px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Student Completion
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
              91.8%
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, marginTop: '2px' }}>
              1,380 Students Active
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
};
