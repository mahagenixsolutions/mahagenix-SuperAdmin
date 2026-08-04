import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileText, TrendingUp, BarChart2 } from 'lucide-react';

export default function SecurityReportsAnalyticsModule() {
  const [toast, setToast] = useState<string | null>(null);

  const triggerExport = (type: string) => {
    setToast(`📥 Exporting Campus Security ${type} Summary Report...`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      {toast && (
        <div style={{ padding: '12px 18px', borderRadius: '10px', background: 'var(--bg-surface-raised)', border: '1px solid #10B981', fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>
          {toast}
        </div>
      )}

      {/* Reports Export Section */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Security Audit Reports & Gate Telematics</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => triggerExport('PDF')} style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Download size={14} /> Export PDF
            </button>
            <button onClick={() => triggerExport('Excel')} style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileSpreadsheet size={14} /> Export Excel
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {[
            'Daily Gate Entry & Exit Audit', 'Visitor Registration & Pass Summary', 'Student Early Exit & Guardian Log',
            'Guard Patrol & Checkpoint Compliance', 'Security Incident & Evidence Log', 'Emergency Alert & Response Log'
          ].map((rep, idx) => (
            <div key={idx} style={{ padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <FileText size={18} style={{ color: '#3B82F6' }} />
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{rep}</span>
              <button onClick={() => triggerExport(rep)} style={{ border: 'none', background: 'transparent', color: '#3B82F6', fontSize: '11px', fontWeight: 700, cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                Generate Report →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Charts Simulation */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Peak Gate Entry Volume by Hour (July 2026)</h4>
          <div style={{ height: '140px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
            {[
              { m: '07:00 AM', v: 45 }, { m: '08:00 AM', v: 95 }, { m: '09:00 AM', v: 60 },
              { m: '10:00 AM', v: 30 }, { m: '01:00 PM', v: 40 }, { m: '03:00 PM', v: 90 }, { m: '04:00 PM', v: 75 }
            ].map((bar, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', height: `${bar.v}%`, background: '#3B82F6', borderRadius: '4px 4px 0 0' }} />
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{bar.m}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Campus Incident Hotspot Distribution</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#F59E0B', fontWeight: 700 }}>● Playground & Sports Complex</span> <span>40% (4 Incidents)</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#3B82F6', fontWeight: 700 }}>● Gate 1 Parking Area</span> <span>30% (3 Incidents)</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#10B981', fontWeight: 700 }}>● Senior Academic Block B</span> <span>20% (2 Incidents)</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#EC4899', fontWeight: 700 }}>● Hostel Perimeter Wall</span> <span>10% (1 Incident)</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
