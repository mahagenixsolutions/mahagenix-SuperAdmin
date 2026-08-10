import React from 'react';
import { motion } from 'framer-motion';
import type { AssignmentItem } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  Eye, 
  Bell, 
  ShieldCheck 
} from 'lucide-react';

interface TodayAssignmentsTableProps {
  assignments: AssignmentItem[];
  onViewDetails: (item: AssignmentItem) => void;
  onRemindTeacher: (item: AssignmentItem) => void;
  onAudit: (item: AssignmentItem) => void;
}

export const TodayAssignmentsTable: React.FC<TodayAssignmentsTableProps> = ({
  assignments,
  onViewDetails,
  onRemindTeacher,
  onAudit
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
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
            Today's Active Assignment Operations Ledger
          </h2>
          <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Master operational table monitoring today's submissions, evaluations, and SLA compliance.
          </p>
        </div>

        <span style={{ fontSize: '12px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          {assignments.length} Active Today
        </span>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Assignment Title</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Subject</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Teacher</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Grade / Sec</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Students</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Submission %</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Evaluation %</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((row) => (
              <tr key={row.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '14px', fontWeight: 700, color: '#0F172A' }}>
                  {row.title}
                  <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500, marginTop: '2px' }}>Due: {row.dueDate}</div>
                </td>

                <td style={{ padding: '14px', fontWeight: 600, color: '#334155' }}>
                  {row.subject}
                </td>

                <td style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src={row.teacherAvatar} alt={row.teacherName} style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }} />
                    <span style={{ fontWeight: 600, color: '#334155' }}>{row.teacherName}</span>
                  </div>
                </td>

                <td style={{ padding: '14px', fontWeight: 700, color: '#3B7E5E' }}>
                  {row.grade}-{row.section}
                </td>

                <td style={{ padding: '14px', fontWeight: 600, color: '#475569' }}>
                  {row.submittedStudents} / {row.totalStudents}
                </td>

                <td style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '60px', height: '5px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${row.submissionPercentage}%`, height: '100%', background: '#5FAF88' }} />
                    </div>
                    <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '12px' }}>{row.submissionPercentage}%</span>
                  </div>
                </td>

                <td style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '60px', height: '5px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${row.evaluationPercentage}%`, height: '100%', background: row.isOverdue ? '#EF4444' : '#3B82F6' }} />
                    </div>
                    <span style={{ fontWeight: 800, color: row.isOverdue ? '#DC2626' : '#0F172A', fontSize: '12px' }}>{row.evaluationPercentage}%</span>
                  </div>
                </td>

                <td style={{ padding: '14px' }}>
                  <span style={{
                    background: row.status === 'Completed' ? '#ECFDF5' : row.isOverdue ? '#FEF2F2' : '#EFF6FF',
                    color: row.status === 'Completed' ? '#047857' : row.isOverdue ? '#DC2626' : '#1D4ED8',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 700
                  }}>
                    {row.status}
                  </span>
                </td>

                <td style={{ padding: '14px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                    <button onClick={() => onViewDetails(row)} style={{ background: 'white', border: '1px solid #CBD5E1', padding: '5px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                      View
                    </button>
                    <button onClick={() => onRemindTeacher(row)} style={{ background: 'white', border: '1px solid #CBD5E1', padding: '5px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                      Remind
                    </button>
                    <button onClick={() => onAudit(row)} style={{ background: '#EAF5F0', color: '#3B7E5E', border: 'none', padding: '5px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
                      Audit
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
