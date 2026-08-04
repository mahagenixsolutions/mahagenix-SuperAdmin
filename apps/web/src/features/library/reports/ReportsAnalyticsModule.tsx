import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileText, TrendingUp, BarChart2, PieChart, CheckCircle2 } from 'lucide-react';
import { useLibraryStore } from '../shared/libraryStore';

export default function ReportsAnalyticsModule() {
  const { books, circulation, fines, reservations, members, digitalAssets, showToast } = useLibraryStore();
  const [selectedReport, setSelectedReport] = useState('Inventory Report');

  const triggerExport = (type: 'PDF' | 'Excel', reportName: string) => {
    showToast(`Exporting "${reportName}" as ${type}... File generated.`);
  };

  const reportsList = [
    { title: 'Book Inventory & Stock Report', desc: `${books.length} titles, ${books.reduce((acc, b) => acc + b.totalCopies, 0)} total copies` },
    { title: 'Circulation & Overdue Audit Report', desc: `${circulation.length} active loan records` },
    { title: 'Member Borrowing Activity Report', desc: `${members.length} registered members` },
    { title: 'Fine Collection & Waiver Log', desc: `₹${fines.reduce((sum, f) => sum + f.fineAmount, 0)} total fines tracked` },
    { title: 'Book Reservation Demand Report', desc: `${reservations.length} queued holds` },
    { title: 'Digital Repository Usage Report', desc: `${digitalAssets.length} e-resources uploaded` },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Reports Export Section */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Library Reports & Analytics Generator</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Generate PDF and Excel reports for accreditation, principal audit, and inventory reconciliation.</p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => triggerExport('PDF', selectedReport)} style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Download size={14} /> Export PDF
            </button>
            <button onClick={() => triggerExport('Excel', selectedReport)} style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileSpreadsheet size={14} /> Export Excel
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {reportsList.map((rep, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedReport(rep.title)}
              style={{
                padding: '14px', borderRadius: '10px',
                border: selectedReport === rep.title ? '2px solid #4F46E5' : '1px solid var(--border-subtle)',
                background: selectedReport === rep.title ? '#EEF2FF' : 'var(--bg-surface-raised)',
                display: 'flex', flexDirection: 'column', gap: '6px', cursor: 'pointer'
              }}
            >
              <FileText size={18} style={{ color: '#4F46E5' }} />
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{rep.title}</span>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{rep.desc}</span>
              <button
                onClick={(e) => { e.stopPropagation(); triggerExport('PDF', rep.title); }}
                style={{ border: 'none', background: 'transparent', color: '#4F46E5', fontSize: '11px', fontWeight: 700, cursor: 'pointer', textAlign: 'left', padding: 0, marginTop: '4px' }}
              >
                Download PDF →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Analytics Visualizations */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Monthly Circulation Analytics (2026)</h4>
          <div style={{ height: '140px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
            {[
              { m: 'Jan', v: 65 }, { m: 'Feb', v: 80 }, { m: 'Mar', v: 95 },
              { m: 'Apr', v: 70 }, { m: 'May', v: 85 }, { m: 'Jun', v: 110 }, { m: 'Jul', v: 130 }
            ].map((bar, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', height: `${bar.v}%`, background: '#4F46E5', borderRadius: '4px 4px 0 0' }} />
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{bar.m}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Category Distribution Share</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#4F46E5', fontWeight: 700 }}>● Science & Physics</span> <span>35%</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#10B981', fontWeight: 700 }}>● Literature & Fiction</span> <span>28%</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#F59E0B', fontWeight: 700 }}>● Mathematics & Stats</span> <span>18%</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#EC4899', fontWeight: 700 }}>● History & World Civ</span> <span>12%</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#8B5CF6', fontWeight: 700 }}>● Computer & Tech</span> <span>7%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
