import React from 'react';
import { motion } from 'framer-motion';
import { 
  GitCommit, 
  CheckCircle2, 
  ArrowRight, 
  PlayCircle 
} from 'lucide-react';

export const AssignmentLifecycleTimeline: React.FC = () => {
  const stages = [
    { title: 'Teacher Creates Assignment', status: 'Completed', color: '#10B981', bg: '#ECFDF5' },
    { title: 'Coordinator Review', status: 'Approved', color: '#10B981', bg: '#ECFDF5' },
    { title: 'Published', status: 'Live', color: '#3B7E5E', bg: '#EAF5F0' },
    { title: 'Student Notification', status: 'Sent', color: '#10B981', bg: '#ECFDF5' },
    { title: 'Parent Notification', status: 'Sent', color: '#10B981', bg: '#ECFDF5' },
    { title: 'Students Submit', status: '93.4% Turn-in', color: '#3B82F6', bg: '#EFF6FF' },
    { title: 'Teacher Evaluation', status: 'In Marking', color: '#F59E0B', bg: '#FEF3C7', isLive: true },
    { title: 'Coordinator Monitoring', status: 'Active SLA', color: '#8B5CF6', bg: '#F3E8FF' },
    { title: 'Marks Published', status: 'Automated', color: '#475569', bg: '#F1F5F9' },
    { title: 'Reports Updated', status: 'Realtime', color: '#475569', bg: '#F1F5F9' }
  ];

  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)',
      overflowX: 'auto'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: '#EAF5F0',
            color: '#3B7E5E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <GitCommit size={20} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#0F172A' }}>
              Institutional Assignment Lifecycle Pipeline
            </h3>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              10-stage automated workflow tracking creation, notification broadcasts, turn-ins, and grading SLA.
            </p>
          </div>
        </div>

        <span style={{ fontSize: '12px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          Stage 7 Active (Teacher Evaluation Phase)
        </span>
      </div>

      {/* Horizontal Scrollable Pipeline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '1100px', padding: '10px 0' }}>
        {stages.map((stage, idx) => (
          <React.Fragment key={stage.title}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: idx * 0.03 }}
              style={{
                flex: 1,
                minWidth: '110px',
                background: stage.bg,
                border: `1.5px solid ${stage.isLive ? '#F59E0B' : 'transparent'}`,
                borderRadius: '12px',
                padding: '12px 10px',
                textAlign: 'center',
                boxShadow: stage.isLive ? '0 4px 14px rgba(245, 158, 11, 0.2)' : 'none'
              }}
            >
              <div style={{ fontSize: '10px', fontWeight: 800, color: stage.color, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Stage 0{idx + 1}
              </div>

              <div style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', marginTop: '4px', lineHeight: '1.3' }}>
                {stage.title}
              </div>

              <div style={{
                marginTop: '8px',
                fontSize: '11px',
                fontWeight: 800,
                color: stage.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}>
                {stage.isLive ? <PlayCircle size={12} /> : <CheckCircle2 size={12} />}
                {stage.status}
              </div>
            </motion.div>

            {idx < stages.length - 1 && (
              <ArrowRight size={14} color="#CBD5E1" style={{ flexShrink: 0 }} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
