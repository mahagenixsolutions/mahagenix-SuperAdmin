import React from 'react';
import { motion } from 'framer-motion';
import type { AtRiskStudent } from '../types';
import { 
  AlertTriangle, 
  Send, 
  Calendar, 
  Eye, 
  ShieldAlert 
} from 'lucide-react';

interface LowAttendanceAlertsTableProps {
  students: AtRiskStudent[];
  onViewProfile: (student: AtRiskStudent) => void;
  onNotifyParent: (student: AtRiskStudent) => void;
  onScheduleMeeting: (student: AtRiskStudent) => void;
}

export const LowAttendanceAlertsTable: React.FC<LowAttendanceAlertsTableProps> = ({
  students,
  onViewProfile,
  onNotifyParent,
  onScheduleMeeting
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
            background: '#FEF2F2',
            color: '#EF4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldAlert size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              At-Risk Students Below Mandatory 75% Attendance Threshold
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Official supervisory list of candidates at risk of exam hall ticket withholding under CBSE/ICSE rules.
            </p>
          </div>
        </div>

        <span style={{ fontSize: '12px', fontWeight: 700, color: '#EF4444', background: '#FEF2F2', padding: '6px 14px', borderRadius: '20px' }}>
          {students.length} Students At Risk
        </span>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Student</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Grade / Sec</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Attendance %</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Days Absent</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Parent Contact</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Warning Status</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Risk Level</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((st) => (
              <tr key={st.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={st.studentAvatar} alt={st.studentName} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: 800, color: '#0F172A' }}>{st.studentName}</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>{st.studentCode}</div>
                    </div>
                  </div>
                </td>

                <td style={{ padding: '14px', fontWeight: 700, color: '#3B7E5E' }}>
                  {st.grade}-{st.section}
                </td>

                <td style={{ padding: '14px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#DC2626' }}>
                    {st.attendancePct}%
                  </span>
                </td>

                <td style={{ padding: '14px', fontWeight: 700, color: '#0F172A' }}>
                  {st.daysAbsent} Days
                </td>

                <td style={{ padding: '14px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: st.parentContacted ? '#10B981' : '#F59E0B' }}>
                    {st.parentContacted ? '✓ Contacted' : '⚠️ Pending'}
                  </span>
                  <div style={{ fontSize: '10px', color: '#64748B' }}>{st.parentPhone}</div>
                </td>

                <td style={{ padding: '14px', fontWeight: 600, color: '#334155' }}>
                  {st.warningStatus}
                </td>

                <td style={{ padding: '14px' }}>
                  <span style={{
                    background: st.riskLevel === 'Critical' ? '#FEF2F2' : st.riskLevel === 'Severe' ? '#FFFBEB' : '#EFF6FF',
                    color: st.riskLevel === 'Critical' ? '#DC2626' : st.riskLevel === 'Severe' ? '#B45309' : '#1D4ED8',
                    border: `1px solid ${st.riskLevel === 'Critical' ? '#FCA5A5' : st.riskLevel === 'Severe' ? '#FDE68A' : '#BFDBFE'}`,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 700
                  }}>
                    {st.riskLevel}
                  </span>
                </td>

                <td style={{ padding: '14px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                    <button onClick={() => onViewProfile(st)} style={{ background: 'white', border: '1px solid #CBD5E1', padding: '5px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                      Profile
                    </button>
                    <button onClick={() => onNotifyParent(st)} style={{ background: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0', padding: '5px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
                      Notify
                    </button>
                    <button onClick={() => onScheduleMeeting(st)} style={{ background: '#EAF5F0', color: '#3B7E5E', border: 'none', padding: '5px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
                      Meet
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
