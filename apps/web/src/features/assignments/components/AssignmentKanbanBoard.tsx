import React from 'react';
import { motion } from 'framer-motion';
import type { AssignmentItem, AssignmentStatus } from '../types';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  Eye, 
  BarChart3, 
  AlertTriangle 
} from 'lucide-react';

interface AssignmentKanbanBoardProps {
  assignments: AssignmentItem[];
  onOpen: (item: AssignmentItem) => void;
  onMonitor: (item: AssignmentItem) => void;
  onAnalytics: (item: AssignmentItem) => void;
}

export const AssignmentKanbanBoard: React.FC<AssignmentKanbanBoardProps> = ({
  assignments,
  onOpen,
  onMonitor,
  onAnalytics
}) => {
  const columns: AssignmentStatus[] = ['Draft', 'Scheduled', 'Published', 'Submission Open', 'Evaluation', 'Completed', 'Archived'];

  const getColHeaderStyle = (col: AssignmentStatus) => {
    switch (col) {
      case 'Draft':
        return { bg: '#F1F5F9', color: '#475569', border: '#CBD5E1' };
      case 'Scheduled':
        return { bg: '#EFF6FF', color: '#1E40AF', border: '#BFDBFE' };
      case 'Published':
        return { bg: '#F3E8FF', color: '#6B21A8', border: '#DDD6FE' };
      case 'Submission Open':
        return { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0' };
      case 'Evaluation':
        return { bg: '#FEF3C7', color: '#B45309', border: '#FDE68A' };
      case 'Completed':
        return { bg: '#EAF5F0', color: '#3B7E5E', border: 'rgba(95, 175, 136, 0.4)' };
      case 'Archived':
        return { bg: '#F1F5F9', color: '#475569', border: '#CBD5E1' };
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
              Assignment Status & Life-Cycle Kanban Board
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Institutional control board monitoring assignments from draft state to evaluation and archive.
            </p>
          </div>
        </div>

        <div style={{ fontSize: '13px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          124 Active Assignments Live
        </div>
      </div>

      {/* Kanban Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, minmax(230px, 1fr))',
        gap: '14px',
        overflowX: 'auto',
        paddingBottom: '8px'
      }}>
        {columns.map((col) => {
          const colStyle = getColHeaderStyle(col);
          const colItems = assignments.filter(a => a.status === col);

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
                {colItems.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -2 }}
                    style={{
                      background: 'white',
                      border: item.isOverdue ? '1.5px solid #FCA5A5' : '1px solid #E2E8F0',
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
                          {item.grade}-{item.section}
                        </span>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B' }}>
                          {item.subject}
                        </span>
                      </div>

                      <h4 style={{ margin: '6px 0 0 0', fontSize: '13px', fontWeight: 800, color: '#0F172A', lineHeight: '1.4' }}>
                        {item.title}
                      </h4>
                    </div>

                    {/* Teacher & Due */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <img src={item.teacherAvatar} alt={item.teacherName} style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }} />
                        <span style={{ fontSize: '11px', fontWeight: 600, color: '#334155' }}>{item.teacherName}</span>
                      </div>
                    </div>

                    {/* Rates */}
                    <div style={{ background: '#F8FAFC', padding: '6px 8px', borderRadius: '6px', fontSize: '11px', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Sub: <strong style={{ color: '#0F172A' }}>{item.submissionPercentage}%</strong></span>
                      <span>Eval: <strong style={{ color: '#3B7E5E' }}>{item.evaluationPercentage}%</strong></span>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
                      <button
                        onClick={() => onOpen(item)}
                        style={{ background: 'white', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '4px', fontSize: '10px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        Open
                      </button>

                      <button
                        onClick={() => onMonitor(item)}
                        style={{ background: 'white', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '4px', fontSize: '10px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        Monitor
                      </button>

                      <button
                        onClick={() => onAnalytics(item)}
                        style={{ background: 'white', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '4px', fontSize: '10px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        Stats
                      </button>
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
