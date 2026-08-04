import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockJobOpenings } from '../shared/mockHRData';
import type { JobOpening } from '../shared/types';
import { Briefcase, Plus, Users, Calendar } from 'lucide-react';

export default function JobOpeningsModule() {
  const [openings, setOpenings] = useState<JobOpening[]>(mockJobOpenings);

  const columns: GridColumn<JobOpening>[] = [
    { key: 'positionTitle', title: 'Position Title', render: (j) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{j.positionTitle}</span> },
    { key: 'department', title: 'Department', render: (j) => <StatusBadge status="info" label={j.department} /> },
    { key: 'requiredExperience', title: 'Experience Req.', render: (j) => j.requiredExperience },
    { key: 'salaryRange', title: 'Offered Salary', render: (j) => <span style={{ fontWeight: 700, color: '#10B981' }}>{j.salaryRange}</span> },
    { key: 'applicationsCount', title: 'Applications', render: (j) => <span style={{ fontWeight: 800, color: '#3B82F6' }}>{j.applicationsCount} Candidates</span> },
    { key: 'deadline', title: 'Deadline', render: (j) => j.deadline },
    { key: 'status', title: 'Status', render: (j) => <StatusBadge status={j.status === 'Open' ? 'success' : 'warning'} label={j.status} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Job Openings & Vacancy Registry</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Post new hiring vacancies, manage salary ranges, and track applicant deadlines.</p>
        </div>
        <button style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#3B82F6', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
          + Post New Vacancy
        </button>
      </div>

      <DataGrid columns={columns} data={openings} />
    </div>
  );
}
