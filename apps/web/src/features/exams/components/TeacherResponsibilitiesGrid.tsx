import React from 'react';
import { motion } from 'framer-motion';
import type { TeacherExamResponsibility } from '../types';
import { 
  UserCheck, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  FileText 
} from 'lucide-react';

interface TeacherResponsibilitiesGridProps {
  teachers: TeacherExamResponsibility[];
  onRemindTeacher: (teacher: TeacherExamResponsibility) => void;
}

export const TeacherResponsibilitiesGrid: React.FC<TeacherResponsibilitiesGridProps> = ({
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
              Faculty Examination Allocation & Evaluation Progress
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Tracking invigilation duties, paper setter deadlines, and marking progress SLAs.
            </p>
          </div>
        </div>

        <div style={{ fontSize: '13px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          86 Faculty Members Deployed
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
              border: t.isLate ? '1.5px solid #FCA5A5' : '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            {/* Top Row: Avatar & Role */}
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

              <span style={{ background: '#EAF5F0', color: '#3B7E5E', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>
                {t.role}
              </span>
            </div>

            {/* Evaluation Progress Bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                <span>Evaluation Progress</span>
                <span style={{ fontWeight: 800, color: t.isLate ? '#DC2626' : '#3B7E5E' }}>{t.evaluationProgress}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${t.evaluationProgress}%`, height: '100%', background: t.isLate ? '#EF4444' : '#5FAF88', borderRadius: '3px' }} />
              </div>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', background: 'white', padding: '8px', borderRadius: '8px', border: '1px solid #F1F5F9' }}>
              <div>
                <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Invigilation</div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A' }}>{t.invigilationSessions} Sessions</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Pending Scripts</div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: t.answerSheetsPending > 20 ? '#DC2626' : '#0F172A' }}>
                  {t.answerSheetsPending} Papers
                </div>
              </div>
            </div>

            {/* Action */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: t.isLate ? '#DC2626' : '#64748B' }}>
                {t.isLate ? '⚠️ SLA Overdue' : '✓ On Schedule'}
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
                Send Reminder
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
