import React from 'react';
import { motion } from 'framer-motion';
import type { TeacherAssignmentPerformance } from '../types';
import { 
  UserCheck, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Award 
} from 'lucide-react';

interface TeacherPerformanceMatrixProps {
  teachers: TeacherAssignmentPerformance[];
  onRemindTeacher: (teacher: TeacherAssignmentPerformance) => void;
}

export const TeacherPerformanceMatrix: React.FC<TeacherPerformanceMatrixProps> = ({
  teachers,
  onRemindTeacher
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
            background: '#EAF5F0',
            color: '#3B7E5E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <UserCheck size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Faculty Evaluation Speed & Marking SLA Matrix
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Monitoring faculty evaluation turnaround time, pending answer script queues, and grading SLA compliance.
            </p>
          </div>
        </div>

        <div style={{ fontSize: '13px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          1.8 Days Avg Evaluation Speed
        </div>
      </div>

      {/* Grid of Teachers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {teachers.map((t) => (
          <motion.div
            key={t.id}
            whileHover={{ y: -2 }}
            style={{
              background: '#F8FAFC',
              border: t.slaStatus === 'Overdue' ? '1.5px solid #FCA5A5' : '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            {/* Top Row: Avatar & SLA */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={t.avatar} alt={t.teacherName} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                    {t.teacherName}
                  </h4>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>{t.department}</div>
                </div>
              </div>

              <span style={{
                background: t.slaStatus === 'Optimal' ? '#ECFDF5' : t.slaStatus === 'Warning' ? '#FEF3C7' : '#FEF2F2',
                color: t.slaStatus === 'Optimal' ? '#047857' : t.slaStatus === 'Warning' ? '#B45309' : '#DC2626',
                fontSize: '11px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '6px'
              }}>
                {t.slaStatus}
              </span>
            </div>

            {/* Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', background: 'white', padding: '10px', borderRadius: '8px', border: '1px solid #F1F5F9', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Created</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>{t.assignmentsCreated}</div>
              </div>

              <div>
                <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Avg Speed</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#3B7E5E', marginTop: '2px' }}>{t.avgEvaluationDays}d</div>
              </div>

              <div>
                <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Pending</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: t.pendingEvaluationsCount > 10 ? '#DC2626' : '#0F172A', marginTop: '2px' }}>{t.pendingEvaluationsCount}</div>
              </div>
            </div>

            {/* Action */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                Completion: <strong style={{ color: '#0F172A' }}>{t.studentCompletionRatePct}%</strong>
              </span>

              <button
                onClick={() => onRemindTeacher(t)}
                style={{
                  background: 'white',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '5px 10px',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#1E293B',
                  cursor: 'pointer'
                }}
              >
                Send SLA Reminder
              </button>
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  );
};
