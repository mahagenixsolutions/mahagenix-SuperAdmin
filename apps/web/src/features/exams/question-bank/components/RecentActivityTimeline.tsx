import React from 'react';
import { motion } from 'framer-motion';
import type { RecentQuestionActivity } from '../types';
import { 
  History, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Upload, 
  Archive 
} from 'lucide-react';

interface RecentActivityTimelineProps {
  activities: RecentQuestionActivity[];
}

export const RecentActivityTimeline: React.FC<RecentActivityTimelineProps> = ({ activities }) => {
  const getActionBadge = (action: RecentQuestionActivity['action']) => {
    switch (action) {
      case 'Approved':
        return { bg: '#ECFDF5', color: '#047857', icon: <CheckCircle2 size={12} /> };
      case 'Submitted':
        return { bg: '#EFF6FF', color: '#1E40AF', icon: <History size={12} /> };
      case 'AI Generated':
        return { bg: '#F3E8FF', color: '#6B21A8', icon: <Sparkles size={12} /> };
      case 'Imported':
        return { bg: '#FEF3C7', color: '#B45309', icon: <Upload size={12} /> };
      case 'Rejected':
        return { bg: '#FEF2F2', color: '#DC2626', icon: <XCircle size={12} /> };
      case 'Archived':
        return { bg: '#F1F5F9', color: '#475569', icon: <Archive size={12} /> };
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
            <History size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Recent Question Bank Activity Stream
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Real-time audit log of submissions, approvals, AI generations, and bulk imports.
            </p>
          </div>
        </div>
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {activities.map((act) => {
          const badge = getActionBadge(act.action);

          return (
            <div
              key={act.id}
              style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                padding: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={act.avatar} alt={act.user} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{act.user}</span>
                    <span style={{ background: badge.bg, color: badge.color, padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '3px' }}>
                      {badge.icon} {act.action}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>
                    {act.details}
                  </div>
                </div>
              </div>

              <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600, whiteSpace: 'nowrap' }}>
                {act.timestamp}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
