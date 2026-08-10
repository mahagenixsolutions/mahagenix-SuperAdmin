import React from 'react';
import { motion } from 'framer-motion';
import type { PlatformTelemetry } from '../types';
import { 
  Server, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Globe 
} from 'lucide-react';

interface ExamPlatformHealthProps {
  telemetry: PlatformTelemetry[];
}

export const ExamPlatformHealth: React.FC<ExamPlatformHealthProps> = ({ telemetry }) => {
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
            background: '#ECFDF5',
            color: '#10B981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Server size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Online Examination Engine & Server Telemetry
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Infrastructure load monitoring, proctoring stream bandwidth, and secure browser connectivity.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontWeight: 700, fontSize: '13px' }}>
          <ShieldCheck size={16} /> All Exam Engines Operational
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px'
      }}>
        {telemetry.map((t) => (
          <motion.div
            key={t.id}
            whileHover={{ y: -2 }}
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                {t.name}
              </h4>
              <span style={{ background: '#ECFDF5', color: '#047857', fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '10px' }}>
                {t.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ background: 'white', padding: '6px 8px', borderRadius: '6px', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '9px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Server Load</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#3B7E5E', marginTop: '2px' }}>{t.serverLoadPct}%</div>
              </div>

              <div style={{ background: 'white', padding: '6px 8px', borderRadius: '6px', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '9px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Latency</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Zap size={11} color="#F59E0B" /> {t.avgResponseTimeMs}ms
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748B', fontWeight: 500 }}>
              <span>Active: <strong>{t.activeSessions} sessions</strong></span>
              <span>Failures: <strong style={{ color: '#10B981' }}>{t.failedSessions}</strong></span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
