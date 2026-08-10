import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const MarkingSLATelemetry: React.FC = () => {
  const slaMetrics = [
    { department: 'Mathematics', avgDays: '1.2 Days', pendingScripts: 2, slaCompliance: '99.2%', status: 'Optimal', color: '#10B981' },
    { department: 'Physics', avgDays: '1.8 Days', pendingScripts: 9, slaCompliance: '96.5%', status: 'Optimal', color: '#10B981' },
    { department: 'Chemistry', avgDays: '3.5 Days', pendingScripts: 18, slaCompliance: '84.0%', status: 'Overdue', color: '#EF4444' },
    { department: 'Computer Science', avgDays: '1.4 Days', pendingScripts: 4, slaCompliance: '97.8%', status: 'Optimal', color: '#10B981' },
    { department: 'Social Studies', avgDays: '2.4 Days', pendingScripts: 17, slaCompliance: '88.5%', status: 'Warning', color: '#F59E0B' }
  ];

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
            <Clock size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Evaluation Speed & Marking SLA Telemetry
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Department-level turnaround speed for assignment & exam paper marking.
            </p>
          </div>
        </div>

        <div style={{ fontSize: '13px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          Overall SLA: 95.8%
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {slaMetrics.map((m) => (
          <div
            key={m.department}
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '160px' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>{m.department}</div>
            </div>

            <div style={{ fontSize: '12px', color: '#475569' }}>
              Avg Speed: <strong style={{ color: '#0F172A' }}>{m.avgDays}</strong>
            </div>

            <div style={{ fontSize: '12px', color: '#475569' }}>
              Pending Scripts: <strong style={{ color: m.pendingScripts > 10 ? '#DC2626' : '#0F172A' }}>{m.pendingScripts}</strong>
            </div>

            <span style={{ fontSize: '12px', fontWeight: 800, color: m.color }}>
              {m.slaCompliance} SLA
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
