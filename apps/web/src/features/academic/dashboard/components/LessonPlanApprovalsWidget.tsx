import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSignature, Check, X } from 'lucide-react';
import type { LessonPlanApproval } from '../services/academicCommand.service';

interface Props {
  approvals: LessonPlanApproval[];
}

export default function LessonPlanApprovalsWidget({ approvals }: Props) {
  const [items, setItems] = React.useState(approvals);

  const handleAction = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

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
          <FileSignature size={18} color="var(--color-primary)" />
          Lesson Plan Approvals
          {items.length > 0 && (
            <span style={{
              background: 'var(--color-danger)', color: 'white', fontSize: 11, fontWeight: 800,
              padding: '2px 8px', borderRadius: 'var(--radius-full)'
            }}>
              {items.length} Pending
            </span>
          )}
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, overflowY: 'auto' }}>
        <AnimatePresence>
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, color: 'var(--text-muted)' }}
            >
              <Check size={32} color="var(--color-success)" style={{ marginBottom: 12, opacity: 0.5 }} />
              <div style={{ fontSize: 14, fontWeight: 600 }}>All caught up!</div>
              <div style={{ fontSize: 12 }}>No pending lesson plans to review.</div>
            </motion.div>
          ) : (
            items.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                style={{
                  background: 'var(--bg-primary)', padding: '16px', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{item.subject} • {item.grade}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
                    By <strong>{item.teacher}</strong> • Submitted {item.submittedAt}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => handleAction(item.id)}
                    style={{
                      width: 32, height: 32, borderRadius: '50%', border: 'none',
                      background: 'var(--color-danger-surface)', color: 'var(--color-danger)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.2s'
                    }}
                    title="Reject"
                  >
                    <X size={16} />
                  </button>
                  <button
                    onClick={() => handleAction(item.id)}
                    style={{
                      width: 32, height: 32, borderRadius: '50%', border: 'none',
                      background: 'var(--color-success-surface)', color: 'var(--color-success)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.2s'
                    }}
                    title="Approve"
                  >
                    <Check size={16} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
