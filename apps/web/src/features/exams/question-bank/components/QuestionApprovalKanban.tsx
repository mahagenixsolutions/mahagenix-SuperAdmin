import React from 'react';
import { motion } from 'framer-motion';
import type { QuestionItem, QuestionApprovalStatus } from '../types';
import { 
  CheckCircle2, 
  XCircle, 
  Eye, 
  MessageSquare, 
  Clock, 
  GitPullRequest 
} from 'lucide-react';

interface QuestionApprovalKanbanProps {
  questions: QuestionItem[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onRequestChanges: (q: QuestionItem) => void;
}

export const QuestionApprovalKanban: React.FC<QuestionApprovalKanbanProps> = ({
  questions,
  onApprove,
  onReject,
  onRequestChanges
}) => {
  const columns: QuestionApprovalStatus[] = ['Draft', 'Submitted', 'Under Review', 'Approved', 'Rejected', 'Archived'];

  const getColHeaderStyle = (col: QuestionApprovalStatus) => {
    switch (col) {
      case 'Draft':
        return { bg: '#F1F5F9', color: '#475569', border: '#CBD5E1' };
      case 'Submitted':
        return { bg: '#EFF6FF', color: '#1E40AF', border: '#BFDBFE' };
      case 'Under Review':
        return { bg: '#FEF3C7', color: '#B45309', border: '#FDE68A' };
      case 'Approved':
        return { bg: '#EAF5F0', color: '#3B7E5E', border: 'rgba(95, 175, 136, 0.4)' };
      case 'Rejected':
        return { bg: '#FEF2F2', color: '#DC2626', border: '#FCA5A5' };
      case 'Archived':
        return { bg: '#F3E8FF', color: '#6B21A8', border: '#DDD6FE' };
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
            <GitPullRequest size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Question Approval & Governance Workflow Board
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Multi-tier signoff pipeline between Subject Matter Experts, HODs, and the Academic Board.
            </p>
          </div>
        </div>

        <div style={{ fontSize: '13px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          245 Questions Under Review
        </div>
      </div>

      {/* Kanban Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, minmax(230px, 1fr))',
        gap: '14px',
        overflowX: 'auto',
        paddingBottom: '8px'
      }}>
        {columns.map((col) => {
          const colStyle = getColHeaderStyle(col);
          const colItems = questions.filter(q => q.status === col);

          return (
            <div
              key={col}
              style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                minHeight: '380px'
              }}
            >
              {/* Header */}
              <div style={{
                background: colStyle.bg,
                color: colStyle.color,
                border: `1px solid ${colStyle.border}`,
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 800,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>{col}</span>
                <span style={{ background: 'white', color: colStyle.color, padding: '1px 6px', borderRadius: '10px', fontSize: '11px', fontWeight: 800 }}>
                  {colItems.length}
                </span>
              </div>

              {/* Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {colItems.map((q) => (
                  <motion.div
                    key={q.id}
                    whileHover={{ y: -2 }}
                    style={{
                      background: 'white',
                      border: '1px solid #E2E8F0',
                      borderRadius: '10px',
                      padding: '14px',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#3B7E5E', background: '#EAF5F0', padding: '2px 6px', borderRadius: '4px' }}>
                          {q.subject}
                        </span>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B' }}>
                          {q.grade}
                        </span>
                      </div>

                      <p style={{ margin: '6px 0 0 0', fontSize: '13px', fontWeight: 600, color: '#0F172A', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        "{q.questionText}"
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src={q.teacherAvatar} alt={q.createdByTeacher} style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#334155' }}>
                        {q.createdByTeacher}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                      {col === 'Under Review' || col === 'Submitted' ? (
                        <>
                          <button
                            onClick={() => onApprove(q.id)}
                            style={{ background: '#3B7E5E', color: 'white', border: 'none', borderRadius: '6px', padding: '5px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}
                          >
                            <CheckCircle2 size={12} /> Approve
                          </button>

                          <button
                            onClick={() => onReject(q.id)}
                            style={{ background: '#FEF2F2', color: '#EF4444', border: '1px solid #FCA5A5', borderRadius: '6px', padding: '5px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}
                          >
                            <XCircle size={12} /> Reject
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => onRequestChanges(q)}
                          style={{ gridColumn: 'span 2', background: 'white', color: '#475569', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '5px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}
                        >
                          <MessageSquare size={12} /> Review Audit
                        </button>
                      )}
                    </div>

                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
