import React from 'react';
import { motion } from 'framer-motion';
import { 
  GitCommit, 
  CheckCircle2, 
  ArrowRight, 
  PlayCircle 
} from 'lucide-react';

export const AuditWorkflowTimeline: React.FC = () => {
  const stages = [
    { title: 'Audit Scheduled', status: 'Completed', color: '#10B981', bg: '#ECFDF5' },
    { title: 'Evidence Collection', status: 'Completed', color: '#10B981', bg: '#ECFDF5' },
    { title: 'Department Review', status: 'Completed', color: '#10B981', bg: '#ECFDF5' },
    { title: 'Teacher Review', status: 'Completed', color: '#10B981', bg: '#ECFDF5' },
    { title: 'Classroom Audit', status: 'Completed', color: '#10B981', bg: '#ECFDF5' },
    { title: 'Findings Logged', status: 'Completed', color: '#10B981', bg: '#ECFDF5' },
    { title: 'Corrective Actions', status: 'Active Phase', color: '#F59E0B', bg: '#FEF3C7', isLive: true },
    { title: 'Follow-up Review', status: 'Pending', color: '#475569', bg: '#F1F5F9' },
    { title: 'Audit Closed', status: 'Scheduled', color: '#475569', bg: '#F1F5F9' }
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
              Institutional Academic Quality Assurance Workflow Pipeline
            </h3>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              9-stage audit lifecycle governing evidence gathering, classroom inspection, and corrective issue closure.
            </p>
          </div>
        </div>

        <span style={{ fontSize: '12px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          Stage 7 Active (Corrective Actions Phase)
        </span>
      </div>

      {/* Horizontal Pipeline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '1000px', padding: '10px 0' }}>
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
