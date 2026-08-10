import React from 'react';
import { motion } from 'framer-motion';
import type { TeacherComplianceItem } from '../types';
import { UserCheck, Clock, CheckCircle2, Bell } from 'lucide-react';

interface TeacherComplianceMatrixProps {
  teachers: TeacherComplianceItem[];
  onRemindTeacher: (teacher: TeacherComplianceItem) => void;
}

export const TeacherComplianceMatrix: React.FC<TeacherComplianceMatrixProps> = ({ teachers, onRemindTeacher }) => {
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
              Faculty Attendance Submission Compliance Matrix
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Tracking class teacher morning roll call submission speed, pending registers, and SLA compliance.
            </p>
          </div>
        </div>

        <div style={{ fontSize: '13px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          97% On-Time Roll Call
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {teachers.map((t) => (
          <div
            key={t.id}
            style={{
              background: '#F8FAFC',
              border: t.complianceScorePct < 90 ? '1.5px solid #FCA5A5' : '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={t.teacherAvatar} alt={t.teacherName} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                    {t.teacherName}
                  </h4>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>{t.department}</div>
                </div>
              </div>

              <span style={{ fontSize: '13px', fontWeight: 800, color: t.complianceScorePct >= 95 ? '#10B981' : '#F59E0B' }}>
                {t.complianceScorePct}%
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', background: 'white', padding: '10px', borderRadius: '8px', border: '1px solid #F1F5F9', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600 }}>Submitted</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>{t.submittedCount}</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600 }}>Avg Time</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#3B7E5E' }}>{t.avgSubmissionTime}</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600 }}>Pending</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: t.pendingCount > 0 ? '#DC2626' : '#0F172A' }}>{t.pendingCount}</div>
              </div>
            </div>

            <button
              onClick={() => onRemindTeacher(t)}
              style={{
                width: '100%',
                background: 'white',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                padding: '6px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#1E293B',
                cursor: 'pointer'
              }}
            >
              Send Submission Alert
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
