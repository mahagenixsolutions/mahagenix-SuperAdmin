import React from 'react';
import { motion } from 'framer-motion';
import type { ScheduledClass } from '../types';
import { 
  Clock, 
  Calendar, 
  Video, 
  CheckCircle2, 
  AlertCircle, 
  FileCheck,
  ExternalLink
} from 'lucide-react';

interface UpcomingClassesPanelProps {
  upcomingClasses: ScheduledClass[];
  onNotifyClass: (item: ScheduledClass) => void;
}

export const UpcomingClassesPanel: React.FC<UpcomingClassesPanelProps> = ({
  upcomingClasses,
  onNotifyClass
}) => {
  const getPrepBadge = (status: ScheduledClass['preparationStatus']) => {
    switch (status) {
      case 'Ready':
        return { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0' };
      case 'Deck Ready':
        return { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' };
      case 'Link Pending':
        return { bg: '#FEF2F2', color: '#DC2626', border: '#FCA5A5' };
      case 'Co-Host Required':
        return { bg: '#FEF3C7', color: '#B45309', border: '#FDE68A' };
      default:
        return { bg: '#F1F5F9', color: '#475569', border: '#CBD5E1' };
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
            <Clock size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Upcoming Sessions (Next 24 Hours)
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Pre-flight readiness checklist for meeting link generation, presentation deck uploads, and co-host assignments.
            </p>
          </div>
        </div>

        <span style={{ fontSize: '13px', fontWeight: 700, color: '#7E22CE', background: '#F3E8FF', padding: '6px 14px', borderRadius: '20px' }}>
          {upcomingClasses.length} Scheduled Sessions
        </span>
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {upcomingClasses.map((item, index) => {
          const prep = getPrepBadge(item.preparationStatus);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.04 }}
              style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 800,
                  color: '#3B7E5E',
                  background: '#EAF5F0',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  minWidth: '85px',
                  textAlign: 'center'
                }}>
                  {item.timeSlot}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                      {item.subject}
                    </h4>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', background: '#E2E8F0', padding: '2px 6px', borderRadius: '4px' }}>
                      {item.grade}-{item.section}
                    </span>
                  </div>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                    Teacher: {item.teacherName} • Topic: {item.topic}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Platform Badge */}
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Video size={13} color="#3B7E5E" /> {item.platform}
                </span>

                {/* Preparation Status */}
                <span style={{
                  background: prep.bg,
                  color: prep.color,
                  border: `1px solid ${prep.border}`,
                  padding: '4px 10px',
                  borderRadius: '16px',
                  fontSize: '11px',
                  fontWeight: 700
                }}>
                  {item.preparationStatus}
                </span>

                {/* Action */}
                <button
                  onClick={() => onNotifyClass(item)}
                  style={{
                    background: 'white',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#0F172A',
                    cursor: 'pointer'
                  }}
                >
                  Send Reminder
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
