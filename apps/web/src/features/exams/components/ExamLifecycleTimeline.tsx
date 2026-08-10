import React from 'react';
import { motion } from 'framer-motion';
import { 
  GitCommit, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  PlayCircle 
} from 'lucide-react';

export const ExamLifecycleTimeline: React.FC = () => {
  const stages = [
    { title: 'Academic Planning', progress: '100%', status: 'Completed', color: '#10B981', bg: '#ECFDF5' },
    { title: 'Exam Created', progress: '100%', status: 'Completed', color: '#10B981', bg: '#ECFDF5' },
    { title: 'Subjects Assigned', progress: '100%', status: 'Completed', color: '#10B981', bg: '#ECFDF5' },
    { title: 'Q-Papers Uploaded', progress: '92%', status: 'In Progress', color: '#3B7E5E', bg: '#EAF5F0' },
    { title: 'Approval', progress: '82%', status: 'In Progress', color: '#3B82F6', bg: '#EFF6FF' },
    { title: 'Timetable Published', progress: '100%', status: 'Completed', color: '#10B981', bg: '#ECFDF5' },
    { title: 'Admit Cards Generated', progress: '94%', status: 'In Progress', color: '#8B5CF6', bg: '#F3E8FF' },
    { title: 'Exam Conducted', progress: '12 Live', status: 'Active Live', color: '#10B981', bg: '#D1FAE5', isLive: true },
    { title: 'Evaluation', progress: '61%', status: 'In Progress', color: '#F59E0B', bg: '#FEF3C7' },
    { title: 'Result Approval', progress: '40%', status: 'In Queue', color: '#475569', bg: '#F1F5F9' },
    { title: 'Result Published', progress: '25%', status: 'In Queue', color: '#475569', bg: '#F1F5F9' }
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
              Institutional Exam Lifecycle Workflow
            </h3>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              End-to-end 11-stage progress tracker from curriculum planning to final portal result publishing.
            </p>
          </div>
        </div>

        <span style={{ fontSize: '12px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          Stage 8 of 11 Active (Exam Conduct Phase)
        </span>
      </div>

      {/* Horizontal Scrollable Workflow Pipeline */}
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
                border: `1.5px solid ${stage.isLive ? '#10B981' : 'transparent'}`,
                borderRadius: '12px',
                padding: '12px 10px',
                textAlign: 'center',
                boxShadow: stage.isLive ? '0 4px 14px rgba(16, 185, 129, 0.2)' : 'none',
                position: 'relative'
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
                fontSize: '12px',
                fontWeight: 800,
                color: stage.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}>
                {stage.isLive ? <PlayCircle size={13} /> : <CheckCircle2 size={13} />}
                {stage.progress}
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
