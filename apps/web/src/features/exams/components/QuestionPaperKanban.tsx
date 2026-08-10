import React from 'react';
import { motion } from 'framer-motion';
import type { QuestionPaperCard, PaperStatus } from '../types';
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  MessageSquare, 
  Lock, 
  Globe, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';

interface QuestionPaperKanbanProps {
  papers: QuestionPaperCard[];
  onPreview: (paper: QuestionPaperCard) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onRequestChanges: (paper: QuestionPaperCard) => void;
}

export const QuestionPaperKanban: React.FC<QuestionPaperKanbanProps> = ({
  papers,
  onPreview,
  onApprove,
  onReject,
  onRequestChanges
}) => {
  const columns: PaperStatus[] = ['Draft', 'Submitted', 'Pending Approval', 'Approved', 'Locked', 'Published'];

  const getColumnHeaderStyle = (col: PaperStatus) => {
    switch (col) {
      case 'Draft':
        return { bg: '#F1F5F9', color: '#475569', border: '#CBD5E1' };
      case 'Submitted':
        return { bg: '#EFF6FF', color: '#1E40AF', border: '#BFDBFE' };
      case 'Pending Approval':
        return { bg: '#FEF3C7', color: '#B45309', border: '#FDE68A' };
      case 'Approved':
        return { bg: '#EAF5F0', color: '#3B7E5E', border: 'rgba(95, 175, 136, 0.4)' };
      case 'Locked':
        return { bg: '#F3E8FF', color: '#6B21A8', border: '#DDD6FE' };
      case 'Published':
        return { bg: '#D1FAE5', color: '#065F46', border: '#A7F3D0' };
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
            <FileText size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Question Paper Review & Governance Kanban
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Supervise HOD approvals, cryptographic question paper locks, syllabus coverage audits, and release pipeline.
            </p>
          </div>
        </div>

        <div style={{ fontSize: '13px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          82% Papers Approved & Locked
        </div>
      </div>

      {/* Kanban Board Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, minmax(230px, 1fr))',
        gap: '14px',
        overflowX: 'auto',
        paddingBottom: '8px'
      }}>
        {columns.map((col) => {
          const colStyle = getColumnHeaderStyle(col);
          const colPapers = papers.filter(p => p.status === col);

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
                minHeight: '400px'
              }}
            >
              {/* Column Title Header */}
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
                <span style={{
                  background: 'white',
                  color: colStyle.color,
                  padding: '1px 6px',
                  borderRadius: '10px',
                  fontSize: '11px',
                  fontWeight: 800
                }}>
                  {colPapers.length}
                </span>
              </div>

              {/* Cards in this column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {colPapers.map((paper) => (
                  <motion.div
                    key={paper.id}
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
                          {paper.grade}
                        </span>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B' }}>
                          {paper.totalMarks} Marks
                        </span>
                      </div>

                      <h4 style={{ margin: '6px 0 0 0', fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                        {paper.subject}
                      </h4>
                    </div>

                    {/* Teacher & Reviewer */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src={paper.teacherAvatar} alt={paper.teacherName} style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#1E293B' }}>{paper.teacherName}</div>
                        <div style={{ fontSize: '10px', color: '#64748B' }}>Rev: {paper.reviewerName}</div>
                      </div>
                    </div>

                    {/* Quality Audit Score */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', background: '#F8FAFC', padding: '6px 8px', borderRadius: '6px' }}>
                      <span style={{ color: '#64748B' }}>Difficulty: <strong style={{ color: '#0F172A' }}>{paper.difficultyRating}</strong></span>
                      <span style={{ color: '#3B7E5E', fontWeight: 800 }}>Audit {paper.qualityScore}%</span>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                      <button
                        onClick={() => onPreview(paper)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          background: 'white',
                          border: '1px solid #CBD5E1',
                          borderRadius: '6px',
                          padding: '5px',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        <Eye size={12} /> Preview
                      </button>

                      {col === 'Pending Approval' ? (
                        <button
                          onClick={() => onApprove(paper.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            background: '#3B7E5E',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '5px',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          <CheckCircle2 size={12} /> Approve
                        </button>
                      ) : (
                        <button
                          onClick={() => onRequestChanges(paper)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            background: 'white',
                            color: '#475569',
                            border: '1px solid #CBD5E1',
                            borderRadius: '6px',
                            padding: '5px',
                            fontSize: '11px',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          <MessageSquare size={12} /> Review
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
