import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockCandidates } from '../shared/mockHRData';
import type { Candidate } from '../shared/types';
import { Star, Mail, Phone, FileText, CheckCircle2 } from 'lucide-react';

export default function CandidatesModule() {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);

  const columns: GridColumn<Candidate>[] = [
    { key: 'name', title: 'Candidate Name', render: (c) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{c.name}</span> },
    { key: 'position', title: 'Applied Position', render: (c) => c.position },
    { key: 'experienceYears', title: 'Experience', render: (c) => `${c.experienceYears} Years` },
    { key: 'rating', title: 'Interview Rating', render: (c) => <span style={{ fontWeight: 800, color: '#F59E0B' }}>⭐ {c.rating} / 5.0</span> },
    { key: 'appliedDate', title: 'Applied Date', render: (c) => c.appliedDate },
    { key: 'interviewStatus', title: 'Pipeline Status', render: (c) => <StatusBadge status={c.interviewStatus === 'Offered' ? 'success' : c.interviewStatus === 'Interviewing' ? 'info' : 'warning'} label={c.interviewStatus} /> }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Candidate Applications & Interview Pipeline</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Review resumes, panel ratings, interview feedback, and issue offer letters.</p>
        </div>
      </div>
      <DataGrid columns={columns} data={candidates} />
    </div>
  );
}
