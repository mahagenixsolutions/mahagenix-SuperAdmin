import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  Layers, 
  ShieldCheck 
} from 'lucide-react';

interface ExecutiveHeroBannerProps {
  onManageSchedule: () => void;
  onOpenCalendar: () => void;
}

export const ExecutiveHeroBanner: React.FC<ExecutiveHeroBannerProps> = ({
  onManageSchedule,
  onOpenCalendar
}) => {
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
      {/* Decorative background glow */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '240px',
        height: '240px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(95,175,136,0.18) 0%, rgba(255,255,255,0) 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
        
        {/* Left Side: Exam Cycle Title & Countdown */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              background: '#EAF5F0',
              color: '#3B7E5E',
              border: '1px solid rgba(95, 175, 136, 0.3)',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <CheckCircle2 size={13} /> Active Examination Cycle
            </span>
            <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>
              Status: <strong style={{ color: '#0F172A' }}>Preparation Phase</strong>
            </span>
          </div>

          <h2 style={{ margin: '8px 0 0 0', fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>
            Mid-Term Examination 2026
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
            <div style={{
              background: '#FEF3C7',
              color: '#B45309',
              border: '1px solid #FDE68A',
              padding: '6px 14px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Clock size={16} /> 12 Days Remaining
            </div>

            <div style={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>
              Overall Institutional Readiness: <strong style={{ color: '#3B7E5E', fontSize: '16px' }}>89%</strong>
            </div>
          </div>
        </div>

        {/* Middle Progress Meters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          
          {/* Schools Ready */}
          <div style={{ textAlign: 'center', minWidth: '100px' }}>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Schools Ready</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>94%</div>
            <div style={{ width: '80px', height: '4px', background: '#E2E8F0', borderRadius: '2px', margin: '4px auto 0 auto' }}>
              <div style={{ width: '94%', height: '100%', background: '#5FAF88', borderRadius: '2px' }} />
            </div>
          </div>

          <div style={{ width: '1px', height: '36px', background: '#CBD5E1' }} />

          {/* Question Papers Approved */}
          <div style={{ textAlign: 'center', minWidth: '110px' }}>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Papers Approved</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#3B82F6', marginTop: '2px' }}>82%</div>
            <div style={{ width: '80px', height: '4px', background: '#E2E8F0', borderRadius: '2px', margin: '4px auto 0 auto' }}>
              <div style={{ width: '82%', height: '100%', background: '#3B82F6', borderRadius: '2px' }} />
            </div>
          </div>

          <div style={{ width: '1px', height: '36px', background: '#CBD5E1' }} />

          {/* Evaluation Progress */}
          <div style={{ textAlign: 'center', minWidth: '110px' }}>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Evaluation Rate</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#8B5CF6', marginTop: '2px' }}>61%</div>
            <div style={{ width: '80px', height: '4px', background: '#E2E8F0', borderRadius: '2px', margin: '4px auto 0 auto' }}>
              <div style={{ width: '61%', height: '100%', background: '#8B5CF6', borderRadius: '2px' }} />
            </div>
          </div>

        </div>

        {/* Right Side Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={onManageSchedule}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#3B7E5E',
              color: 'white',
              border: 'none',
              padding: '12px 18px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(59, 126, 94, 0.3)'
            }}
          >
            Manage Schedule <ArrowRight size={15} />
          </button>

          <button
            onClick={onOpenCalendar}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'white',
              color: '#1E293B',
              border: '1px solid #CBD5E1',
              padding: '12px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Calendar size={15} /> Exam Calendar
          </button>
        </div>

      </div>
    </motion.div>
  );
};
