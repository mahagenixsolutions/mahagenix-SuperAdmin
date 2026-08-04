import React from 'react';
import { FileText, ShieldAlert, CheckCircle2, UserCheck, Settings } from 'lucide-react';
import type { ExamReadiness } from '../services/academicCommand.service';

interface Props {
  exams: ExamReadiness[];
}

export default function ExamCommandWidget({ exams }: Props) {
  return (
    <div style={{
      background: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border-color)',
      padding: '24px',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
          <FileText size={18} color="var(--color-primary)" />
          Examination Command Center
        </h2>
        <button style={{
          background: 'var(--color-primary-surface)', border: '1px solid var(--color-primary)', color: 'var(--color-primary)',
          fontSize: 12, fontWeight: 600, cursor: 'pointer', padding: '4px 12px', borderRadius: 'var(--radius-md)'
        }}>
          Manage Exams
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
        {exams.map((exam, idx) => {
          const isReady = exam.questionPaperReady && exam.invigilatorsAssigned && exam.hallTicketsGenerated;
          return (
            <div key={idx} style={{
              background: 'var(--bg-primary)', padding: '16px', borderRadius: 'var(--radius-md)',
              border: `1px solid ${isReady ? 'var(--color-success)' : 'var(--border-color)'}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{exam.examName}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{exam.date}</div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', padding: '8px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                  {exam.questionPaperReady ? <CheckCircle2 size={16} color="var(--color-success)" /> : <ShieldAlert size={16} color="var(--color-warning)" />}
                  <span style={{ fontSize: 11, textAlign: 'center', color: 'var(--text-muted)' }}>Question Papers</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', padding: '8px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                  {exam.invigilatorsAssigned ? <CheckCircle2 size={16} color="var(--color-success)" /> : <UserCheck size={16} color="var(--color-warning)" />}
                  <span style={{ fontSize: 11, textAlign: 'center', color: 'var(--text-muted)' }}>Invigilators</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', padding: '8px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                  {exam.hallTicketsGenerated ? <CheckCircle2 size={16} color="var(--color-success)" /> : <Settings size={16} color="var(--color-warning)" />}
                  <span style={{ fontSize: 11, textAlign: 'center', color: 'var(--text-muted)' }}>Hall Tickets</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
