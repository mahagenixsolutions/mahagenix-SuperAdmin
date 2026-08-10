import React from 'react';
import { motion } from 'framer-motion';
import type { FacultyPerformanceItem } from '../types';
import { 
  Award, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Star 
} from 'lucide-react';

interface FacultyMatrixTableProps {
  facultyList: FacultyPerformanceItem[];
  onViewDossier: (item: FacultyPerformanceItem) => void;
  onAuditPerformance: (item: FacultyPerformanceItem) => void;
  onScheduleReview: (item: FacultyPerformanceItem) => void;
}

export const FacultyMatrixTable: React.FC<FacultyMatrixTableProps> = ({
  facultyList,
  onViewDossier,
  onAuditPerformance,
  onScheduleReview
}) => {
  const getRatingTierBadge = (tier: FacultyPerformanceItem['ratingTier']) => {
    switch (tier) {
      case 'A+ Outstanding':
        return { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0' };
      case 'A Exceeds Expectations':
        return { bg: '#EAF5F0', color: '#3B7E5E', border: 'rgba(95, 175, 136, 0.4)' };
      case 'B Meets Expectations':
        return { bg: '#EFF6FF', color: '#1E40AF', border: '#BFDBFE' };
      case 'C Needs Improvement':
        return { bg: '#FEF3C7', color: '#B45309', border: '#FDE68A' };
      case 'PIP Required':
        return { bg: '#FEF2F2', color: '#DC2626', border: '#FCA5A5' };
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
            <Award size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Faculty Performance Matrix & Rating Tier Ledger
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Comprehensive performance appraisal ratings, syllabus progress, and student satisfaction scores.
            </p>
          </div>
        </div>

        <span style={{ fontSize: '12px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          {facultyList.length} Faculty Members Evaluated
        </span>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Faculty Member</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Department</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Assigned Classes</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Index %</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Rating Tier</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Pass %</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Syllabus %</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Rating</th>
              <th style={{ padding: '12px 14px', fontWeight: 700, color: '#64748B', fontSize: '11px', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {facultyList.map((row) => {
              const badge = getRatingTierBadge(row.ratingTier);

              return (
                <tr key={row.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={row.avatar} alt={row.teacherName} style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 800, color: '#0F172A' }}>{row.teacherName}</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>{row.employeeId}</div>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '14px', fontWeight: 600, color: '#334155' }}>
                    {row.department}
                  </td>

                  <td style={{ padding: '14px', fontSize: '12px', color: '#475569' }}>
                    {row.gradesTaught.join(', ')}
                  </td>

                  <td style={{ padding: '14px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: row.overallScorePct >= 90 ? '#3B7E5E' : row.overallScorePct >= 80 ? '#1E40AF' : '#DC2626' }}>
                      {row.overallScorePct}%
                    </span>
                  </td>

                  <td style={{ padding: '14px' }}>
                    <span style={{
                      background: badge.bg,
                      color: badge.color,
                      border: `1px solid ${badge.border}`,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 700
                    }}>
                      {row.ratingTier}
                    </span>
                  </td>

                  <td style={{ padding: '14px', fontWeight: 700, color: '#0F172A' }}>
                    {row.studentPassPct}%
                  </td>

                  <td style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '50px', height: '5px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${row.syllabusCompletionPct}%`, height: '100%', background: row.syllabusCompletionPct >= 90 ? '#5FAF88' : '#F59E0B' }} />
                      </div>
                      <span style={{ fontWeight: 700, fontSize: '12px' }}>{row.syllabusCompletionPct}%</span>
                    </div>
                  </td>

                  <td style={{ padding: '14px', fontWeight: 800, color: '#F59E0B' }}>
                    ★ {row.studentRating}
                  </td>

                  <td style={{ padding: '14px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                      <button onClick={() => onViewDossier(row)} style={{ background: 'white', border: '1px solid #CBD5E1', padding: '5px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                        Dossier
                      </button>
                      <button onClick={() => onAuditPerformance(row)} style={{ background: '#EAF5F0', color: '#3B7E5E', border: 'none', padding: '5px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
                        Audit
                      </button>
                      <button onClick={() => onScheduleReview(row)} style={{ background: 'white', border: '1px solid #CBD5E1', padding: '5px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
                        Review
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
