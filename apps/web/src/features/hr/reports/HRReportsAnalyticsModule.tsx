import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileText, TrendingUp, BarChart2, PieChart } from 'lucide-react';

export default function HRReportsAnalyticsModule() {
  const [toast, setToast] = useState<string | null>(null);

  const triggerExport = (type: string) => {
    setToast(`📥 Exporting HR ${type} Summary Report...`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      {toast && (
        <div style={{ padding: '12px 18px', borderRadius: '10px', background: 'var(--bg-surface-raised)', border: '1px solid #3B82F6', fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>
          {toast}
        </div>
      )}

      {/* Reports Export Section */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>HR Reports & Analytics Center</h3>
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
            'Employee Census Report', 'Monthly Attendance & Overtime', 'Leave Utilization Audit',
            'Recruitment Pipeline Stats', 'Performance Ratings Distribution', 'Training Completion Summary'
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
          <h4 style={{ fontSize: '14px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Hiring vs Attrition Growth Trends (2026)</h4>
          <div style={{ height: '140px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
            {[
              { m: 'Jan', v: 45 }, { m: 'Feb', v: 60 }, { m: 'Mar', v: 75 },
              { m: 'Apr', v: 55 }, { m: 'May', v: 80 }, { m: 'Jun', v: 95 }, { m: 'Jul', v: 110 }
            ].map((bar, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', height: `${bar.v}%`, background: '#3B82F6', borderRadius: '4px 4px 0 0' }} />
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{bar.m}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Department Headcount Distribution</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#3B82F6', fontWeight: 700 }}>● Academic & Faculty</span> <span>61% (42 Staff)</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#10B981', fontWeight: 700 }}>● Administration & HR</span> <span>17% (12 Staff)</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#F59E0B', fontWeight: 700 }}>● IT & Technical</span> <span>9% (6 Staff)</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#EC4899', fontWeight: 700 }}>● Finance & Accounts</span> <span>7% (5 Staff)</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#8B5CF6', fontWeight: 700 }}>● Library & Others</span> <span>6% (4 Staff)</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
