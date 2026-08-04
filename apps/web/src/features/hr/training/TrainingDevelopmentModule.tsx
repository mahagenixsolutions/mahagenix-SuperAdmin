import React, { useState } from 'react';
import { DataGrid } from '../../../components/erp/DataGrid';
import type { GridColumn } from '../../../components/erp/DataGrid';
import { StatusBadge } from '../../../components/erp/StatusBadge';
import { mockTrainingPrograms } from '../shared/mockHRData';
import type { TrainingProgram } from '../shared/types';
import { Award, BookOpen, Users, CheckCircle2 } from 'lucide-react';

export default function TrainingDevelopmentModule() {
  const [trainings, setTrainings] = useState<TrainingProgram[]>(mockTrainingPrograms);

  const columns: GridColumn<TrainingProgram>[] = [
    { key: 'title', title: 'Workshop / Program', render: (t) => <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{t.title}</span> },
    { key: 'trainer', title: 'Trainer / Institution', render: (t) => t.trainer },
    { key: 'startDate', title: 'Dates', render: (t) => `${t.startDate} to ${t.endDate}` },
    { key: 'enrolledCount', title: 'Enrolled Staff', render: (t) => <span style={{ fontWeight: 800, color: '#3B82F6' }}>{t.enrolledCount} Staff</span> },
    { key: 'completionRate', title: 'Completion Rate', render: (t) => <span style={{ fontWeight: 800, color: '#10B981' }}>{t.completionRate}%</span> },
    { key: 'skillsCovered', title: 'Skills Matrix', render: (t) => t.skillsCovered.join(', ') }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Staff Training & Professional Development</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Teacher workshops, skill upgrading seminars, certifications, and completion rates.</p>
        </div>
        <button style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#8B5CF6', color: '#FFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
          + Schedule Workshop
        </button>
      </div>

      <DataGrid columns={columns} data={trainings} />
    </div>
  );
}
