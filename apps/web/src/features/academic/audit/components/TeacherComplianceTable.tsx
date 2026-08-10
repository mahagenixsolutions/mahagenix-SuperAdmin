import React from 'react';
import { motion } from 'framer-motion';
import type { TeacherAuditCompliance } from '../types';
import { Users, Eye, Bell, ShieldAlert } from 'lucide-react';

interface TeacherComplianceTableProps {
  teachers: TeacherAuditCompliance[];
  onViewAudit: (t: TeacherAuditCompliance) => void;
  onRemind: (t: TeacherAuditCompliance) => void;
  onIntervene: (t: TeacherAuditCompliance) => void;
}

export const TeacherComplianceTable: React.FC<TeacherComplianceTableProps> = ({
  teachers,
  onViewAudit,
  onRemind,
  onIntervene
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
            <Users size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Faculty Academic Compliance & Quality Ledger
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Detailed compliance matrix across Lesson Plans, Homework, Assignments, Attendance, and Assessments.
            </p>
          </div>
        </div>

        <span style={{ fontSize: '12px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          95.8% Overall Compliance
        </span>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Teacher</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Dept</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Lesson Plans</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Homework</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Assignments</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Attendance</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Syllabus %</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Score %</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Risk Level</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((row) => (
              <tr key={row.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={row.avatar} alt={row.teacherName} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                    <span style={{ fontWeight: 800, color: '#0F172A' }}>{row.teacherName}</span>
                  </div>
                </td>

                <td style={{ padding: '14px', fontWeight: 600, color: '#334155' }}>
                  {row.department}
                </td>

                <td style={{ padding: '14px', fontWeight: 700, color: row.lessonPlansPct >= 90 ? '#3B7E5E' : '#DC2626' }}>
                  {row.lessonPlansPct}%
                </td>

                <td style={{ padding: '14px', fontWeight: 700, color: row.homeworkPct >= 90 ? '#3B7E5E' : '#DC2626' }}>
                  {row.homeworkPct}%
                </td>

                <td style={{ padding: '14px', fontWeight: 700, color: row.assignmentsPct >= 90 ? '#3B7E5E' : '#DC2626' }}>
                  {row.assignmentsPct}%
                </td>

                <td style={{ padding: '14px', fontWeight: 700, color: '#0F172A' }}>
                  {row.attendancePct}%
                </td>

                <td style={{ padding: '14px', fontWeight: 700, color: row.syllabusPct >= 90 ? '#3B7E5E' : '#F59E0B' }}>
                  {row.syllabusPct}%
                </td>

                <td style={{ padding: '14px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: row.overallScorePct >= 90 ? '#3B7E5E' : '#DC2626' }}>
                    {row.overallScorePct}%
                  </span>
                </td>

                <td style={{ padding: '14px' }}>
                  <span style={{
                    background: row.riskLevel === 'Low' ? '#ECFDF5' : row.riskLevel === 'Moderate' ? '#FEF3C7' : '#FEF2F2',
                    color: row.riskLevel === 'Low' ? '#047857' : row.riskLevel === 'Moderate' ? '#B45309' : '#DC2626',
                    border: `1px solid ${row.riskLevel === 'Low' ? '#A7F3D0' : row.riskLevel === 'Moderate' ? '#FDE68A' : '#FCA5A5'}`,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 700
                  }}>
                    {row.riskLevel}
                  </span>
                </td>

                <td style={{ padding: '14px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                    <button onClick={() => onViewAudit(row)} style={{ background: 'white', border: '1px solid #CBD5E1', padding: '5px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                      Audit
                    </button>
                    <button onClick={() => onRemind(row)} style={{ background: 'white', border: '1px solid #CBD5E1', padding: '5px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                      Remind
                    </button>
                    <button onClick={() => onIntervene(row)} style={{ background: '#EAF5F0', color: '#3B7E5E', border: 'none', padding: '5px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
                      Intervene
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
