import React from 'react';
import { motion } from 'framer-motion';
import type { TeacherAvailability, TeacherStatus } from '../types';
import { 
  UserCheck, 
  Wifi, 
  WifiOff, 
  Clock, 
  CalendarPlus, 
  AlertCircle, 
  CheckCircle2,
  Video
} from 'lucide-react';

interface TeacherAvailabilityGridProps {
  teachers: TeacherAvailability[];
  onAssignClass: (teacher: TeacherAvailability) => void;
}

export const TeacherAvailabilityGrid: React.FC<TeacherAvailabilityGridProps> = ({
  teachers,
  onAssignClass
}) => {
  const getStatusBadge = (status: TeacherStatus) => {
    switch (status) {
      case 'Available':
        return { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0', icon: <CheckCircle2 size={12} /> };
      case 'Teaching':
        return { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE', icon: <Video size={12} /> };
      case 'On Leave':
        return { bg: '#FEF2F2', color: '#DC2626', border: '#FCA5A5', icon: <AlertCircle size={12} /> };
      case 'Meeting':
        return { bg: '#F3E8FF', color: '#7E22CE', border: '#DDD6FE', icon: <Clock size={12} /> };
      case 'Internet Issue':
        return { bg: '#FEF3C7', color: '#B45309', border: '#FDE68A', icon: <WifiOff size={12} /> };
      default:
        return { bg: '#F1F5F9', color: '#475569', border: '#CBD5E1', icon: <UserCheck size={12} /> };
    }
  };

  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid #F1F5F9'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: '#F3E8FF',
            color: '#7E22CE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <UserCheck size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Faculty Live Availability
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Real-time online connection state, current assignments, and emergency substitution readiness.
            </p>
          </div>
        </div>

        <div style={{ fontSize: '13px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          {teachers.filter(t => t.status === 'Available' || t.status === 'Teaching').length} / {teachers.length} Faculty Online
        </div>
      </div>

      {/* Grid of Teachers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {teachers.map((teacher, index) => {
          const badge = getStatusBadge(teacher.status);

          return (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.04 }}
              style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              {/* Top Row: Avatar + Name + Status */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ position: 'relative' }}>
                    <img
                      src={teacher.avatar}
                      alt={teacher.name}
                      style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <span style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: teacher.status === 'Available' || teacher.status === 'Teaching' ? '#10B981' : '#EF4444',
                      border: '2px solid white'
                    }} />
                  </div>

                  <div>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                      {teacher.name}
                    </h4>
                    <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>
                      {teacher.department}
                    </span>
                  </div>
                </div>

                <span style={{
                  background: badge.bg,
                  color: badge.color,
                  border: `1px solid ${badge.border}`,
                  padding: '3px 10px',
                  borderRadius: '16px',
                  fontSize: '11px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  {badge.icon} {teacher.status}
                </span>
              </div>

              {/* Network & Last Online Info */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                background: 'white',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #F1F5F9'
              }}>
                <div>
                  <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Connection</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Wifi size={12} color="#10B981" /> {teacher.networkQuality}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Last Online</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                    {teacher.lastOnline}
                  </div>
                </div>
              </div>

              {/* Next Class & Assign Button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                <div style={{ fontSize: '11px', color: '#64748B' }}>
                  Next Class: <strong style={{ color: '#0F172A' }}>{teacher.nextClassTime || 'None scheduled'}</strong>
                </div>

                <button
                  onClick={() => onAssignClass(teacher)}
                  disabled={teacher.status === 'On Leave'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: teacher.status === 'On Leave' ? '#F1F5F9' : '#3B7E5E',
                    color: teacher.status === 'On Leave' ? '#94A3B8' : 'white',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: teacher.status === 'On Leave' ? 'not-allowed' : 'pointer'
                  }}
                >
                  <CalendarPlus size={13} /> Assign Class
                </button>
              </div>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
