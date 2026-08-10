import React from 'react';
import { motion } from 'framer-motion';
import type { LiveExamSession } from '../types';
import { 
  Radio, 
  Clock, 
  Users, 
  WifiOff, 
  ShieldAlert, 
  Eye, 
  BarChart3, 
  PauseCircle, 
  PlayCircle,
  Video
} from 'lucide-react';

interface LiveExamMonitorProps {
  sessions: LiveExamSession[];
  onObserveExam: (session: LiveExamSession) => void;
  onViewLiveDashboard: (session: LiveExamSession) => void;
  onPauseExam: (sessionId: string) => void;
}

export const LiveExamMonitor: React.FC<LiveExamMonitorProps> = ({
  sessions,
  onObserveExam,
  onViewLiveDashboard,
  onPauseExam
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
            <Radio size={22} className="animate-pulse" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px' }}>
              Live Examination Monitor
              <span style={{
                background: '#10B981',
                color: 'white',
                fontSize: '12px',
                fontWeight: 700,
                padding: '2px 10px',
                borderRadius: '12px'
              }}>
                {sessions.length} Live Sessions Active
              </span>
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Real-time AI proctoring, webcam feed monitoring, tab-switching alerts, and latency oversight.
            </p>
          </div>
        </div>

        <div style={{ fontSize: '13px', fontWeight: 700, color: '#10B981', background: '#ECFDF5', padding: '6px 14px', borderRadius: '20px' }}>
          98.8% Candidate Attendance Rate
        </div>
      </div>

      {/* Grid of Active Exam Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '20px'
      }}>
        {sessions.map((item) => {
          const hasWarnings = item.warningsCount > 0;

          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -2 }}
              style={{
                background: 'white',
                border: hasWarnings ? '1.5px solid #FCA5A5' : '1px solid #E2E8F0',
                borderRadius: '14px',
                padding: '20px',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    background: '#ECFDF5',
                    color: '#047857',
                    border: '1px solid #A7F3D0',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
                    PROCTORING ACTIVE
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748B' }}>
                    {item.platform}
                  </span>
                </div>

                <span style={{ background: '#F1F5F9', color: '#334155', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700 }}>
                  {item.grade}-{item.section}
                </span>
              </div>

              {/* Title & Subject */}
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                  {item.examTitle}
                </h3>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px', fontWeight: 500 }}>
                  Invigilator: <strong>{item.teacherName}</strong>
                </div>
              </div>

              {/* Realtime Telemetry Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                
                {/* Time Remaining Countdown */}
                <div style={{ background: '#FEF3C7', padding: '8px 10px', borderRadius: '8px', border: '1px solid #FDE68A' }}>
                  <div style={{ fontSize: '10px', color: '#B45309', fontWeight: 700, textTransform: 'uppercase' }}>Time Left</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#92400E', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} color="#B45309" /> {item.timeRemainingMinutes}m
                  </div>
                </div>

                {/* Joined / Total */}
                <div style={{ background: '#F8FAFC', padding: '8px 10px', borderRadius: '8px', border: '1px solid #F1F5F9' }}>
                  <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Joined</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
                    {item.studentsJoined}/{item.totalStudents} ({item.attendancePercentage}%)
                  </div>
                </div>

                {/* Proctoring Warnings */}
                <div style={{ background: hasWarnings ? '#FEF2F2' : '#F8FAFC', padding: '8px 10px', borderRadius: '8px', border: `1px solid ${hasWarnings ? '#FCA5A5' : '#F1F5F9'}` }}>
                  <div style={{ fontSize: '10px', color: hasWarnings ? '#DC2626' : '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>AI Alerts</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: hasWarnings ? '#DC2626' : '#10B981', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldAlert size={14} /> {item.warningsCount} Flags
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '4px' }}>
                <button
                  onClick={() => onObserveExam(item)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    background: '#3B7E5E',
                    color: 'white',
                    border: 'none',
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Eye size={13} /> Observe
                </button>

                <button
                  onClick={() => onViewLiveDashboard(item)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    background: 'white',
                    color: '#1E293B',
                    border: '1px solid #CBD5E1',
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <BarChart3 size={13} /> Telemetry
                </button>

                <button
                  onClick={() => onPauseExam(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    background: '#FEF2F2',
                    color: '#EF4444',
                    border: '1px solid #FCA5A5',
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <PauseCircle size={13} /> Pause
                </button>
              </div>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
