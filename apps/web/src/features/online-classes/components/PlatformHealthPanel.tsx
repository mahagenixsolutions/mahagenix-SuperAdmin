import React from 'react';
import { motion } from 'framer-motion';
import type { PlatformHealthItem } from '../types';
import { 
  Server, 
  CheckCircle2, 
  Activity, 
  Zap, 
  ShieldCheck,
  Globe
} from 'lucide-react';

interface PlatformHealthPanelProps {
  platforms: PlatformHealthItem[];
}

export const PlatformHealthPanel: React.FC<PlatformHealthPanelProps> = ({ platforms }) => {
  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid #F1F5F9'
      }}>
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
              Meeting Platform Health & Integrations
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Live telemetry monitoring for API status, latency, packet stability, and active session capacity.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontWeight: 700, fontSize: '13px' }}>
          <ShieldCheck size={16} /> 100% Platform Services Online
        </div>
      </div>

      {/* Grid of Providers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px'
      }}>
        {platforms.map((plat) => (
          <motion.div
            key={plat.id}
            whileHover={{ y: -2 }}
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '14px'
            }}
          >
            {/* Platform Icon & Name */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={plat.icon} alt={plat.name} style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                  {plat.name}
                </h4>
              </div>

              <span style={{
                background: '#ECFDF5',
                color: '#047857',
                border: '1px solid #A7F3D0',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <CheckCircle2 size={11} /> {plat.apiStatus}
              </span>
            </div>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ background: 'white', padding: '8px 10px', borderRadius: '8px', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Connection</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#3B7E5E', marginTop: '2px' }}>
                  {plat.connectionQuality}%
                </div>
              </div>

              <div style={{ background: 'white', padding: '8px 10px', borderRadius: '8px', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Latency</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Zap size={12} color="#F59E0B" /> {plat.latencyMs}ms
                </div>
              </div>
            </div>

            {/* Capacity Progress Bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>
                <span>Active Sessions</span>
                <span>{plat.activeSessions} / {plat.maxSimultaneousLimit} max</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                  width: `${(plat.activeSessions / plat.maxSimultaneousLimit) * 100}%`,
                  height: '100%',
                  background: '#5FAF88',
                  borderRadius: '3px'
                }} />
              </div>
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  );
};
