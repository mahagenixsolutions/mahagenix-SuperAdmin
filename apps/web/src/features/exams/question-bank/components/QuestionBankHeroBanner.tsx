import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Sparkles, 
  Award, 
  ShieldCheck 
} from 'lucide-react';

export const QuestionBankHeroBanner: React.FC = () => {
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
        
        {/* Left Side: Summary metrics */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          
          {/* Total Questions */}
          <div style={{ minWidth: '130px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Total Questions
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
              18,420
            </div>
            <div style={{ fontSize: '11px', color: '#3B7E5E', fontWeight: 600, marginTop: '2px' }}>
              Across 24 Subjects
            </div>
          </div>

          <div style={{ width: '1px', height: '44px', background: '#CBD5E1' }} />

          {/* Approved */}
          <div style={{ minWidth: '120px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Approved
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>
              16,980
            </div>
            <div style={{ fontSize: '11px', color: '#047857', fontWeight: 600, marginTop: '2px' }}>
              92.1% Repository Ready
            </div>
          </div>

          <div style={{ width: '1px', height: '44px', background: '#CBD5E1' }} />

          {/* Pending Review */}
          <div style={{ minWidth: '100px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Pending Review
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#F59E0B', marginTop: '4px' }}>
              245
            </div>
            <div style={{ fontSize: '11px', color: '#B45309', fontWeight: 600, marginTop: '2px' }}>
              HOD Action Needed
            </div>
          </div>

          {/* Rejected */}
          <div style={{ minWidth: '80px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Rejected
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#EF4444', marginTop: '4px' }}>
              61
            </div>
            <div style={{ fontSize: '11px', color: '#DC2626', fontWeight: 600, marginTop: '2px' }}>
              Revision Sent
            </div>
          </div>

          <div style={{ width: '1px', height: '44px', background: '#CBD5E1' }} />

          {/* Avg Question Quality */}
          <div style={{ minWidth: '110px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Avg Quality Score
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#3B7E5E', marginTop: '4px' }}>
              94%
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, marginTop: '2px' }}>
              CBSE & ICSE Compliant
            </div>
          </div>

          {/* AI Suggestions */}
          <div style={{ minWidth: '110px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              AI Suggestions
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#8B5CF6', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={18} /> 128
            </div>
            <div style={{ fontSize: '11px', color: '#6B21A8', fontWeight: 600, marginTop: '2px' }}>
              Auto-Generated
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
};
