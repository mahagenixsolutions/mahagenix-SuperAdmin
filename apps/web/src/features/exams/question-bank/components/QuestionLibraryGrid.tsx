import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuestionItem } from '../types';
import { 
  Eye, 
  Edit3, 
  CheckCircle2, 
  XCircle, 
  Archive, 
  Copy, 
  Clock, 
  Award, 
  BookOpen, 
  HelpCircle, 
  Code, 
  Layers, 
  X 
} from 'lucide-react';

interface QuestionLibraryGridProps {
  questions: QuestionItem[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onArchive: (id: string) => void;
  onDuplicate: (q: QuestionItem) => void;
}

export const QuestionLibraryGrid: React.FC<QuestionLibraryGridProps> = ({
  questions,
  onApprove,
  onReject,
  onArchive,
  onDuplicate
}) => {
  const [selectedPreview, setSelectedPreview] = useState<QuestionItem | null>(null);

  const getStatusBadge = (status: QuestionItem['status']) => {
    switch (status) {
      case 'Approved':
        return { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0' };
      case 'Under Review':
      case 'Submitted':
        return { bg: '#FEF3C7', color: '#B45309', border: '#FDE68A' };
      case 'Draft':
        return { bg: '#F1F5F9', color: '#475569', border: '#CBD5E1' };
      case 'Rejected':
        return { bg: '#FEF2F2', color: '#DC2626', border: '#FCA5A5' };
      case 'Archived':
        return { bg: '#F3E8FF', color: '#6B21A8', border: '#DDD6FE' };
    }
  };

  const getDifficultyBadge = (diff: QuestionItem['difficulty']) => {
    switch (diff) {
      case 'Easy':
        return { bg: '#ECFDF5', color: '#047857' };
      case 'Medium':
        return { bg: '#EFF6FF', color: '#1D4ED8' };
      case 'Hard':
        return { bg: '#FEF3C7', color: '#B45309' };
      case 'HOTS':
        return { bg: '#F3E8FF', color: '#7E22CE' };
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
            <BookOpen size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Institutional Question Repository Library
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Showing {questions.length} questions matching your criteria.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Question Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '20px'
      }}>
        {questions.map((item) => {
          const statusBadge = getStatusBadge(item.status);
          const diffBadge = getDifficultyBadge(item.difficulty);

          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -2 }}
              style={{
                background: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '14px',
                padding: '20px',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px'
              }}
            >
              {/* Card Header: Type, Subject, Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ background: '#3B7E5E', color: 'white', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>
                    {item.type}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>
                    {item.subject} ({item.grade})
                  </span>
                </div>

                <span style={{
                  background: statusBadge.bg,
                  color: statusBadge.color,
                  border: `1px solid ${statusBadge.border}`,
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 700
                }}>
                  {item.status}
                </span>
              </div>

              {/* Question Text */}
              <div>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#1E293B', lineHeight: '1.45' }}>
                  "{item.questionText}"
                </p>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '6px' }}>
                  {item.chapter} • {item.topic}
                </div>
              </div>

              {/* Specs Bar */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                gap: '6px',
                background: '#F8FAFC',
                padding: '8px 10px',
                borderRadius: '8px',
                fontSize: '11px',
                textAlign: 'center'
              }}>
                <div>
                  <div style={{ color: '#94A3B8', fontWeight: 600 }}>Diff</div>
                  <div style={{ fontWeight: 800, color: diffBadge.color }}>{item.difficulty}</div>
                </div>

                <div>
                  <div style={{ color: '#94A3B8', fontWeight: 600 }}>Marks</div>
                  <div style={{ fontWeight: 800, color: '#0F172A' }}>{item.marks} M</div>
                </div>

                <div>
                  <div style={{ color: '#94A3B8', fontWeight: 600 }}>Used</div>
                  <div style={{ fontWeight: 800, color: '#3B7E5E' }}>{item.usageCount}x</div>
                </div>

                <div>
                  <div style={{ color: '#94A3B8', fontWeight: 600 }}>Quality</div>
                  <div style={{ fontWeight: 800, color: '#10B981' }}>{item.qualityScore}%</div>
                </div>
              </div>

              {/* Teacher Info */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src={item.teacherAvatar} alt={item.createdByTeacher} style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
                  <span style={{ fontWeight: 600, color: '#334155' }}>{item.createdByTeacher}</span>
                </div>
                <span style={{ color: '#94A3B8', fontSize: '11px' }}>{item.createdDate}</span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '4px', marginTop: '2px' }}>
                <button
                  onClick={() => setSelectedPreview(item)}
                  style={{ background: 'white', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Preview Question"
                >
                  <Eye size={13} />
                </button>

                <button
                  onClick={() => alert(`Editing Question #${item.id}`)}
                  style={{ background: 'white', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Edit Question"
                >
                  <Edit3 size={13} />
                </button>

                <button
                  onClick={() => onApprove(item.id)}
                  disabled={item.status === 'Approved'}
                  style={{ background: item.status === 'Approved' ? '#F1F5F9' : '#3B7E5E', color: item.status === 'Approved' ? '#94A3B8' : 'white', border: 'none', borderRadius: '6px', padding: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Approve Question"
                >
                  <CheckCircle2 size={13} />
                </button>

                <button
                  onClick={() => onReject(item.id)}
                  style={{ background: '#FEF2F2', color: '#EF4444', border: '1px solid #FCA5A5', borderRadius: '6px', padding: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Reject Question"
                >
                  <XCircle size={13} />
                </button>

                <button
                  onClick={() => onDuplicate(item)}
                  style={{ background: 'white', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Duplicate Item"
                >
                  <Copy size={13} />
                </button>

                <button
                  onClick={() => onArchive(item.id)}
                  style={{ background: 'white', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Archive Question"
                >
                  <Archive size={13} />
                </button>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedPreview && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: 'white',
                borderRadius: '16px',
                maxWidth: '600px',
                width: '100%',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
            >
              <div style={{ padding: '18px 24px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                    Question Preview (ID: {selectedPreview.id})
                  </h3>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                    {selectedPreview.subject} • {selectedPreview.grade} • {selectedPreview.marks} Marks
                  </div>
                </div>
                <button onClick={() => setSelectedPreview(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                  <X size={20} />
                </button>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', lineHeight: '1.5' }}>
                  "{selectedPreview.questionText}"
                </div>

                {selectedPreview.options && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: '#F8FAFC', padding: '14px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B' }}>MULTIPLE CHOICE OPTIONS:</div>
                    {selectedPreview.options.map(opt => (
                      <div key={opt} style={{ fontSize: '13px', fontWeight: 600, color: opt === selectedPreview.correctAnswer ? '#047857' : '#334155' }}>
                        {opt} {opt === selectedPreview.correctAnswer && '✓ (Correct)'}
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ fontSize: '12px', color: '#64748B', lineHeight: '1.5' }}>
                  <strong>Chapter:</strong> {selectedPreview.chapter}<br />
                  <strong>Bloom's Taxonomy:</strong> {selectedPreview.bloomsTaxonomy}<br />
                  <strong>Author:</strong> {selectedPreview.createdByTeacher} ({selectedPreview.createdDate})
                </div>
              </div>

              <div style={{ padding: '16px 24px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button onClick={() => setSelectedPreview(null)} style={{ background: '#3B7E5E', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
                  Close Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
