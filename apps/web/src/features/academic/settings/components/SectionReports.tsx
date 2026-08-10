import React from 'react';
import { BarChart2 } from 'lucide-react';

export const SectionReports: React.FC = () => {
  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
        <BarChart2 size={20} color="#3B7E5E" />
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
            Section 13: Automated Reporting & Scheduled Analytics
          </h3>
          <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Schedule automated weekly & monthly PDF reports to be emailed to HODs and Principal.
          </p>
        </div>
      </div>

      <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '13px', color: '#334155' }}>
        <strong>Weekly Compliance Digest:</strong> Automatically emailed every Friday at 05:00 PM to Academic Coordinator & HODs.
      </div>
    </div>
  );
};
