import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, AlertTriangle, TrendingUp } from 'lucide-react';
import type { CurriculumProgress } from '../services/academicCommand.service';

interface Props {
  curriculum: CurriculumProgress[];
}

export default function CurriculumTrackerWidget({ curriculum }: Props) {
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
          <BookOpen size={18} color="var(--color-primary)" />
          Curriculum & Syllabus
        </h2>
        <button style={{
          background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: 12, fontWeight: 600, cursor: 'pointer'
        }}>
          View Master Plan →
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, overflowY: 'auto' }}>
        {curriculum.map((item, idx) => (
          <div key={idx} style={{
            background: 'var(--bg-primary)',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            borderLeft: `4px solid ${
              item.status === 'on-track' ? 'var(--color-success)' :
              item.status === 'at-risk' ? 'var(--color-warning)' : 'var(--color-danger)'
            }`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 14 }}>{item.grade}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                  {item.status === 'delayed' && <AlertTriangle size={12} color="var(--color-danger)" />}
                  {item.status === 'at-risk' && <AlertTriangle size={12} color="var(--color-warning)" />}
                  {item.status === 'on-track' && <TrendingUp size={12} color="var(--color-success)" />}
                  {item.chaptersPending} chapters pending
                </div>
              </div>
              <div style={{
                fontSize: 12, fontWeight: 700,
                padding: '4px 8px', borderRadius: 'var(--radius-full)',
                background: item.status === 'on-track' ? 'var(--color-success-surface)' :
                            item.status === 'at-risk' ? 'var(--color-warning-surface)' : 'var(--color-danger-surface)',
                color: item.status === 'on-track' ? 'var(--color-success)' :
                       item.status === 'at-risk' ? 'var(--color-warning)' : 'var(--color-danger)'
              }}>
                {item.progress}%
              </div>
            </div>

            <div style={{ width: '100%', height: 6, background: 'var(--bg-secondary)', borderRadius: 3, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.progress}%` }}
                transition={{ duration: 1, delay: idx * 0.1 }}
                style={{
                  height: '100%',
                  background: item.status === 'on-track' ? 'var(--color-success)' :
                              item.status === 'at-risk' ? 'var(--color-warning)' : 'var(--color-danger)',
                  borderRadius: 3
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
