import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  Activity, 
  Send 
} from 'lucide-react';

interface AttendanceHeroBannerProps {
  onViewLive: () => void;
  onSendAlerts: () => void;
}

export const AttendanceHeroBanner: React.FC<AttendanceHeroBannerProps> = ({
  onViewLive,
  onSendAlerts
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
        
        {/* Left Side: Metrics Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          
          {/* Today Overall Attendance */}
          <div style={{ minWidth: '140px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Today's Attendance
            </div>
            <div style={{ fontSize: '30px', fontWeight: 800, color: '#3B7E5E', marginTop: '4px' }}>
              93.4%
            </div>
            <div style={{ fontSize: '11px', color: '#047857', fontWeight: 600, marginTop: '2px' }}>
              Monthly Avg: 92.8%
            </div>
          </div>

          <div style={{ width: '1px', height: '44px', background: '#CBD5E1' }} />

          {/* Students Present */}
          <div style={{ minWidth: '110px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Present
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>
              2,456
            </div>
            <div style={{ fontSize: '11px', color: '#047857', fontWeight: 600, marginTop: '2px' }}>
              Students On Campus
            </div>
          </div>

          {/* Students Absent */}
          <div style={{ minWidth: '90px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Absent
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#EF4444', marginTop: '4px' }}>
              146
            </div>
            <div style={{ fontSize: '11px', color: '#DC2626', fontWeight: 600, marginTop: '2px' }}>
              Parents Notified
            </div>
          </div>

          {/* Late Arrivals */}
          <div style={{ minWidth: '90px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Late
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#F59E0B', marginTop: '4px' }}>
              32
            </div>
            <div style={{ fontSize: '11px', color: '#B45309', fontWeight: 600, marginTop: '2px' }}>
              Arrivals Marked
            </div>
          </div>

          <div style={{ width: '1px', height: '44px', background: '#CBD5E1' }} />

          {/* Teacher Submission Rate */}
          <div style={{ minWidth: '120px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Teacher Compliance
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
              97%
            </div>
            <div style={{ fontSize: '11px', color: '#3B82F6', fontWeight: 600, marginTop: '2px' }}>
              4 Classes Pending
            </div>
          </div>

          {/* Institutional Health Badge */}
          <div style={{ minWidth: '130px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Attendance Health
            </div>
            <span style={{
              display: 'inline-block',
              marginTop: '6px',
              background: '#ECFDF5',
              color: '#047857',
              border: '1px solid #A7F3D0',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 800
            }}>
              ✓ Excellent
            </span>
          </div>

        </div>

        {/* Right Side Quick Actions */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onViewLive}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#3B7E5E',
              color: 'white',
              border: 'none',
              padding: '9px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Activity size={15} /> Live Monitor
          </button>

          <button
            onClick={onSendAlerts}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'white',
              color: '#1E293B',
              border: '1px solid #CBD5E1',
              padding: '9px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Send size={15} color="#EF4444" /> Send Alerts
          </button>
        </div>

      </div>
    </motion.div>
  );
};
