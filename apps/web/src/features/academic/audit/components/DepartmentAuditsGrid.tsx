import React from 'react';
import { motion } from 'framer-motion';
import type { DepartmentAuditItem } from '../types';
import { Building2, Eye, Play, AlertTriangle } from 'lucide-react';

interface DepartmentAuditsGridProps {
  departments: DepartmentAuditItem[];
  onViewDepartment: (dept: DepartmentAuditItem) => void;
  onStartReview: (dept: DepartmentAuditItem) => void;
}

export const DepartmentAuditsGrid: React.FC<DepartmentAuditsGridProps> = ({
  departments,
  onViewDepartment,
  onStartReview
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
            <Building2 size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Academic Department Quality Audits & Inspections
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Compliance scores, pending issues, and critical findings per academic department.
            </p>
          </div>
        </div>

        <span style={{ fontSize: '13px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          6/6 Departments Audited
        </span>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {departments.map((dept) => (
          <motion.div
            key={dept.id}
            whileHover={{ y: -2 }}
            style={{
              background: '#F8FAFC',
              border: dept.status === 'At Risk' ? '1.5px solid #FCA5A5' : '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '14px'
            }}
          >
            {/* Top Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                  {dept.departmentName}
                </h4>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                  Last Audited: {dept.auditDate}
                </div>
              </div>

              <span style={{
                background: dept.status === 'Healthy' ? '#ECFDF5' : dept.status === 'Advisory' ? '#FEF3C7' : '#FEF2F2',
                color: dept.status === 'Healthy' ? '#047857' : dept.status === 'Advisory' ? '#B45309' : '#DC2626',
                border: `1px solid ${dept.status === 'Healthy' ? '#A7F3D0' : dept.status === 'Advisory' ? '#FDE68A' : '#FCA5A5'}`,
                padding: '3px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700
              }}>
                {dept.status}
              </span>
            </div>

            {/* HOD Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src={dept.headAvatar} alt={dept.headName} style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>HOD: {dept.headName}</span>
            </div>

            {/* Specs Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', background: 'white', padding: '10px', borderRadius: '8px', border: '1px solid #F1F5F9', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600 }}>Score</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#3B7E5E' }}>{dept.auditScore}%</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600 }}>Pending</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>{dept.pendingIssuesCount}</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600 }}>Critical</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: dept.criticalFindingsCount > 0 ? '#DC2626' : '#0F172A' }}>{dept.criticalFindingsCount}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <button
                onClick={() => onViewDepartment(dept)}
                style={{ background: 'white', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
              >
                <Eye size={12} /> View Audit
              </button>

              <button
                onClick={() => onStartReview(dept)}
                style={{ background: '#3B7E5E', color: 'white', border: 'none', borderRadius: '6px', padding: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
              >
                <Play size={12} /> Start Review
              </button>
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  );
};
