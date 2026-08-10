import React from 'react';
import { motion } from 'framer-motion';
import type { ClassAttendanceFeed } from '../types';
import { 
  Activity, 
  Clock, 
  CheckCircle2, 
  Bell, 
  Eye 
} from 'lucide-react';

interface LiveAttendanceMonitorProps {
  feeds: ClassAttendanceFeed[];
  onViewClass: (feed: ClassAttendanceFeed) => void;
  onSendReminder: (feed: ClassAttendanceFeed) => void;
  onOpenAttendance: (feed: ClassAttendanceFeed) => void;
}

export const LiveAttendanceMonitor: React.FC<LiveAttendanceMonitorProps> = ({
  feeds,
  onViewClass,
  onSendReminder,
  onOpenAttendance
}) => {
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
            background: '#ECFDF5',
            color: '#10B981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Activity size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Real-Time Class Attendance Stream & Telemetry
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Live telemetry tracking morning roll call submission status across all sections.
            </p>
          </div>
        </div>

        <span style={{ fontSize: '12px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          Realtime Feed Active
        </span>
      </div>

      {/* Grid of Class Feeds */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {feeds.map((feed) => (
          <motion.div
            key={feed.id}
            whileHover={{ y: -2 }}
            style={{
              background: '#F8FAFC',
              border: feed.status === 'Pending' ? '1.5px solid #FCA5A5' : '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            {/* Top Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                  {feed.className} Section {feed.section}
                </h4>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                  Submitted: {feed.submissionTime}
                </div>
              </div>

              <span style={{
                background: feed.status === 'Submitted' ? '#ECFDF5' : feed.status === 'Delayed' ? '#FEF3C7' : '#FEF2F2',
                color: feed.status === 'Submitted' ? '#047857' : feed.status === 'Delayed' ? '#B45309' : '#DC2626',
                border: `1px solid ${feed.status === 'Submitted' ? '#A7F3D0' : feed.status === 'Delayed' ? '#FDE68A' : '#FCA5A5'}`,
                padding: '3px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700
              }}>
                {feed.status}
              </span>
            </div>

            {/* Teacher Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src={feed.teacherAvatar} alt={feed.teacherName} style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>{feed.teacherName}</span>
            </div>

            {/* Attendance Bar & Counters */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                <span>Rate: {feed.attendancePct}%</span>
                <span style={{ fontSize: '11px', color: '#64748B' }}>P: {feed.presentCount} | A: {feed.absentCount} | L: {feed.lateCount}</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${feed.attendancePct}%`, height: '100%', background: feed.attendancePct > 90 ? '#5FAF88' : '#F59E0B', borderRadius: '3px' }} />
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
              <button
                onClick={() => onViewClass(feed)}
                style={{ background: 'white', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '5px', fontSize: '10px', fontWeight: 600, cursor: 'pointer' }}
              >
                View
              </button>

              <button
                onClick={() => onSendReminder(feed)}
                style={{ background: 'white', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '5px', fontSize: '10px', fontWeight: 600, cursor: 'pointer' }}
              >
                Remind
              </button>

              <button
                onClick={() => onOpenAttendance(feed)}
                style={{ background: '#EAF5F0', color: '#3B7E5E', border: 'none', borderRadius: '6px', padding: '5px', fontSize: '10px', fontWeight: 700, cursor: 'pointer' }}
              >
                Audit
              </button>
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  );
};
