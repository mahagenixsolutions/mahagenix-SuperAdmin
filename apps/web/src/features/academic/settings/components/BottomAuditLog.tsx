import React from 'react';
import { mockAuditLogs } from '../mockData';
import { History, ShieldCheck } from 'lucide-react';

export const BottomAuditLog: React.FC = () => {
  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <History size={18} color="#3B7E5E" />
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
            Configuration Audit Log & Change History
          </h3>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <th style={{ padding: '10px 12px', fontWeight: 700, color: '#64748B' }}>Timestamp</th>
              <th style={{ padding: '10px 12px', fontWeight: 700, color: '#64748B' }}>Setting Modified</th>
              <th style={{ padding: '10px 12px', fontWeight: 700, color: '#64748B' }}>Changed By</th>
              <th style={{ padding: '10px 12px', fontWeight: 700, color: '#64748B' }}>Previous Value</th>
              <th style={{ padding: '10px 12px', fontWeight: 700, color: '#64748B' }}>Updated Value</th>
            </tr>
          </thead>
          <tbody>
            {mockAuditLogs.map(log => (
              <tr key={log.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '10px 12px', color: '#64748B' }}>{log.timestamp}</td>
                <td style={{ padding: '10px 12px', fontWeight: 800, color: '#0F172A' }}>{log.settingName}</td>
                <td style={{ padding: '10px 12px', fontWeight: 600, color: '#3B7E5E' }}>{log.changedBy}</td>
                <td style={{ padding: '10px 12px', color: '#DC2626' }}>{log.oldValue}</td>
                <td style={{ padding: '10px 12px', fontWeight: 700, color: '#047857' }}>{log.newValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
