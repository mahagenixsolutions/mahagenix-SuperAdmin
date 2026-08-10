import React from 'react';
import { Share2, CheckCircle2 } from 'lucide-react';

export const SectionIntegrations: React.FC = () => {
  const integrations = [
    { name: 'Google Workspace for Education', status: 'Connected', desc: 'Google Meet, Classroom & Drive Sync' },
    { name: 'Microsoft 365 Education', status: 'Connected', desc: 'MS Teams, OneDrive & Outlook Sync' },
    { name: 'Zoom Video Communications', status: 'Connected', desc: 'Pro Cloud Meeting License' }
  ];

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
        <Share2 size={20} color="#3B7E5E" />
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
            Section 14: Third-Party EdTech & Cloud Integrations
          </h3>
          <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Manage active cloud connections with Google Workspace, Microsoft 365, and Zoom.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {integrations.map(item => (
          <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>{item.name}</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>{item.desc}</div>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#047857', background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '4px 10px', borderRadius: '20px' }}>
              ✓ {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
