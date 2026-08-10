import React from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  CalendarPlus, 
  Layers, 
  UserCheck, 
  Download, 
  Settings, 
  Activity, 
  CheckCircle2, 
  Clock, 
  Users, 
  AlertCircle, 
  RefreshCw,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface HeroBannerProps {
  onScheduleClick: () => void;
  onBulkScheduleClick: () => void;
  onAssignTeacherClick: () => void;
  onExportClick: () => void;
  onSettingsClick: () => void;
  onViewLiveClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onScheduleClick,
  onBulkScheduleClick,
  onAssignTeacherClick,
  onExportClick,
  onSettingsClick,
  onViewLiveClick
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header Row */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap',
        gap: '16px',
        width: '100%'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: '1 1 auto', minWidth: '320px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #5FAF88 0%, #3B7E5E 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(95, 175, 136, 0.3)',
            flexShrink: 0,
            marginTop: '2px'
          }}>
            <Video size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
                Online Learning Command Center
              </h1>
              <span style={{
                background: '#EAF5F0',
                color: '#3B7E5E',
                border: '1px solid rgba(95, 175, 136, 0.3)',
                padding: '3px 10px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                whiteSpace: 'nowrap'
              }}>
                <ShieldCheck size={13} /> Institution Level
              </span>
            </div>
            <p style={{ margin: '4px 0 0 0', color: '#64748B', fontSize: '13px', lineHeight: 1.4 }}>
              Manage, monitor, schedule, and supervise all live and recorded online classes across the institution.
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', flexShrink: 0 }}>
          <button
            onClick={onScheduleClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'linear-gradient(135deg, #5FAF88 0%, #479670 100%)',
              color: 'white',
              border: 'none',
              padding: '9px 16px',
              borderRadius: '9px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 3px 10px rgba(95, 175, 136, 0.35)',
              transition: 'transform 0.15s ease'
            }}
          >
            <CalendarPlus size={15} /> Schedule Online Class
          </button>

          <button
            onClick={onBulkScheduleClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'white',
              color: '#1E293B',
              border: '1px solid #E2E8F0',
              padding: '9px 13px',
              borderRadius: '9px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Layers size={14} /> Bulk Schedule
          </button>

          <button
            onClick={onAssignTeacherClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'white',
              color: '#1E293B',
              border: '1px solid #E2E8F0',
              padding: '9px 13px',
              borderRadius: '9px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <UserCheck size={14} /> Assign Teacher
          </button>

          <button
            onClick={onExportClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'white',
              color: '#475569',
              border: '1px solid #E2E8F0',
              padding: '9px 12px',
              borderRadius: '9px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Download size={14} /> Export
          </button>

          <button
            onClick={onSettingsClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              background: 'white',
              color: '#475569',
              border: '1px solid #E2E8F0',
              borderRadius: '9px',
              cursor: 'pointer'
            }}
            title="Platform Settings"
          >
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* Hero Summary Banner Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
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
        {/* Subtle decorative background blur circle */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(95,175,136,0.18) 0%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          
          {/* Metrics Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            
            {/* Total Today */}
            <div style={{ minWidth: '110px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Today's Classes
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
                48
              </div>
            </div>

            <div style={{ width: '1px', height: '40px', background: '#CBD5E1' }} />

            {/* Live Now with Pulse */}
            <div style={{ minWidth: '120px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ position: 'relative', display: 'flex', width: '9px', height: '9px' }}>
                  <span style={{
                    animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                    position: 'absolute',
                    display: 'inline-flex',
                    height: '100%',
                    width: '100%',
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    opacity: 0.75
                  }} />
                  <span style={{
                    position: 'relative',
                    display: 'inline-flex',
                    borderRadius: '50%',
                    height: '9px',
                    width: '9px',
                    backgroundColor: '#10B981'
                  }} />
                </span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#047857', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Classes Live Now
                </span>
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#047857', marginTop: '4px' }}>
                18
              </div>
            </div>

            <div style={{ width: '1px', height: '40px', background: '#CBD5E1' }} />

            {/* Completed */}
            <div style={{ minWidth: '100px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Completed
              </div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#334155', marginTop: '4px' }}>
                21
              </div>
            </div>

            {/* Cancelled */}
            <div style={{ minWidth: '80px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Cancelled
              </div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#EF4444', marginTop: '4px' }}>
                2
              </div>
            </div>

            {/* Rescheduled */}
            <div style={{ minWidth: '90px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Rescheduled
              </div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#F59E0B', marginTop: '4px' }}>
                3
              </div>
            </div>

            <div style={{ width: '1px', height: '40px', background: '#CBD5E1' }} />

            {/* Avg Attendance */}
            <div style={{ minWidth: '110px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Avg Attendance
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#3B7E5E', marginTop: '4px' }}>
                92%
              </div>
            </div>

            {/* Avg Duration */}
            <div style={{ minWidth: '110px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Avg Duration
              </div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#334155', marginTop: '4px' }}>
                47 mins
              </div>
            </div>

            <div style={{ width: '1px', height: '40px', background: '#CBD5E1' }} />

            {/* Platform Health */}
            <div style={{ minWidth: '110px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Platform Health
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <CheckCircle2 size={18} color="#10B981" />
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#065F46' }}>Healthy</span>
              </div>
            </div>

          </div>

          {/* Right Action Button */}
          <button
            onClick={onViewLiveClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#3B7E5E',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(59, 126, 94, 0.3)',
              transition: 'background 0.2s'
            }}
          >
            View Live Classes ({18}) <ArrowRight size={16} />
          </button>

        </div>
      </motion.div>
    </div>
  );
};
