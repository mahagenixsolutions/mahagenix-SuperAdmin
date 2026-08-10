import React from 'react';
import { motion } from 'framer-motion';
import type { AcademicNoticeItem } from '../types';
import { 
  Bell, 
  FileText, 
  Paperclip, 
  Eye, 
  Edit3, 
  Copy, 
  Archive, 
  BarChart2, 
  CheckCircle2 
} from 'lucide-react';

interface AcademicNoticeFeedProps {
  notices: AcademicNoticeItem[];
  onPreview: (n: AcademicNoticeItem) => void;
  onEdit: (n: AcademicNoticeItem) => void;
  onDuplicate: (n: AcademicNoticeItem) => void;
  onArchive: (n: AcademicNoticeItem) => void;
  onAnalytics: (n: AcademicNoticeItem) => void;
}

export const AcademicNoticeFeed: React.FC<AcademicNoticeFeedProps> = ({
  notices,
  onPreview,
  onEdit,
  onDuplicate,
  onArchive,
  onAnalytics
}) => {
  const getPriorityBadge = (priority: AcademicNoticeItem['priority']) => {
    switch (priority) {
      case 'Critical':
        return { bg: '#FEF2F2', color: '#DC2626', border: '#FCA5A5' };
      case 'High':
        return { bg: '#FFFBEB', color: '#B45309', border: '#FDE68A' };
      case 'Medium':
        return { bg: '#EFF6FF', color: '#1E40AF', border: '#BFDBFE' };
      case 'Low':
        return { bg: '#F8FAFC', color: '#475569', border: '#E2E8F0' };
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
            <Bell size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Academic Circular & Official Notice Stream
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Active institutional communications, exam timetables, syllabus updates, and PTM notices.
            </p>
          </div>
        </div>

        <span style={{ fontSize: '12px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          {notices.length} Notices Active
        </span>
      </div>

      {/* Feed Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {notices.map((n) => {
          const prio = getPriorityBadge(n.priority);

          return (
            <motion.div
              key={n.id}
              whileHover={{ y: -2 }}
              style={{
                background: '#F8FAFC',
                border: n.priority === 'Critical' ? '1.5px solid #FCA5A5' : '1px solid #E2E8F0',
                borderRadius: '14px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}
            >
              {/* Card Top Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ background: '#EAF5F0', color: '#3B7E5E', padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>
                    {n.category}
                  </span>

                  <span style={{ background: prio.bg, color: prio.color, border: `1px solid ${prio.border}`, padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>
                    {n.priority} Priority
                  </span>

                  <span style={{ background: n.status === 'Published' ? '#ECFDF5' : '#EFF6FF', color: n.status === 'Published' ? '#047857' : '#1E40AF', padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700 }}>
                    ● {n.status}
                  </span>
                </div>

                <div style={{ fontSize: '11px', color: '#64748B' }}>
                  Published: <strong>{n.publishDate}</strong> | Expires: <strong>{n.expiryDate}</strong>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                  {n.title}
                </h3>
                <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
                  {n.description}
                </p>
              </div>

              {/* Author & Audience */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', background: 'white', padding: '12px 14px', borderRadius: '10px', border: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src={n.creatorAvatar} alt={n.createdBy} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A' }}>{n.createdBy}</div>
                    <div style={{ fontSize: '10px', color: '#64748B' }}>{n.department}</div>
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: '#334155', fontWeight: 600 }}>
                  Audience: <span style={{ color: '#3B7E5E', fontWeight: 700 }}>{n.targetAudience}</span>
                </div>

                {/* Engagement telemetry */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px' }}>
                  <span>Read: <strong style={{ color: '#3B7E5E' }}>{n.readPercentage}%</strong></span>
                  <span>Ack: <strong style={{ color: '#10B981' }}>{n.acknowledgedPercentage}%</strong></span>
                </div>
              </div>

              {/* Attachments & Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                {/* Attachments Chips */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  {n.attachments.map((att, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'white', border: '1px solid #CBD5E1', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, color: '#1E293B' }}>
                      <Paperclip size={12} color="#3B7E5E" />
                      <span>{att.name} ({att.size})</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button onClick={() => onPreview(n)} style={{ background: 'white', border: '1px solid #CBD5E1', padding: '5px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Eye size={12} /> Preview
                  </button>
                  <button onClick={() => onEdit(n)} style={{ background: 'white', border: '1px solid #CBD5E1', padding: '5px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Edit3 size={12} /> Edit
                  </button>
                  <button onClick={() => onDuplicate(n)} style={{ background: 'white', border: '1px solid #CBD5E1', padding: '5px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Copy size={12} /> Duplicate
                  </button>
                  <button onClick={() => onAnalytics(n)} style={{ background: '#EAF5F0', color: '#3B7E5E', border: 'none', padding: '5px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <BarChart2 size={12} /> Analytics
                  </button>
                  <button onClick={() => onArchive(n)} style={{ background: 'white', border: '1px solid #CBD5E1', padding: '5px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, color: '#64748B', cursor: 'pointer' }}>
                    <Archive size={12} />
                  </button>
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
