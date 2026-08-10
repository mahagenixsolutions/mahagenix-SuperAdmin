import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, Activity, FileCheck } from 'lucide-react';

export const RightSidebarConfigHealth: React.FC = () => {
  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '12px', borderBottom: '1px solid #F1F5F9' }}>
        <ShieldCheck size={18} color="#3B7E5E" />
        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
          Configuration Health & Status
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#047857', textTransform: 'uppercase' }}>Configuration Health</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#047857', marginTop: '2px' }}>98% Optimal</div>
          <div style={{ fontSize: '10px', color: '#065F46', marginTop: '2px' }}>All 14 Settings Categories Validated</div>
        </div>

        <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '11px' }}>
          <span style={{ color: '#64748B' }}>Last Updated:</span> <strong style={{ color: '#0F172A' }}>Aug 05, 2026, 04:30 PM</strong>
        </div>

        <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '11px' }}>
          <span style={{ color: '#64748B' }}>Last Backup:</span> <strong style={{ color: '#0F172A' }}>Aug 06, 2026, 02:00 AM</strong>
        </div>

        <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '11px' }}>
          <span style={{ color: '#64748B' }}>Active Policies:</span> <strong style={{ color: '#3B7E5E' }}>14 Active Domains</strong>
        </div>

        <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '11px' }}>
          <span style={{ color: '#64748B' }}>Academic Session:</span> <strong style={{ color: '#3B7E5E' }}>Term 1 In Progress</strong>
        </div>
      </div>
    </div>
  );
};
