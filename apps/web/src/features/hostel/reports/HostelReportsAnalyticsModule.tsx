import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileText, TrendingUp, BarChart2 } from 'lucide-react';
import { useHostelStore } from '../shared/hostelStore';

export default function HostelReportsAnalyticsModule() {
  const { buildings, students, attendance, messMenu, visitors, complaints, fees, medicalCases, incidents, showToast } = useHostelStore();
  const [selectedReport, setSelectedReport] = useState('Occupancy Report');

  const triggerExport = (type: 'PDF' | 'Excel', reportName: string) => {
    showToast(`Exporting "${reportName}" as ${type}... File generated.`);
  };

  const reportsList = [
    { title: 'Hostel Occupancy & Bed Census Report', desc: `${buildings.length} Blocks, ${students.length} Resident Students` },
    { title: 'Night Roll Call Attendance Audit', desc: `${attendance.length} attendance logs` },
    { title: 'Mess Consumption & Food Quality Report', desc: `${messMenu.length} daily menu plans` },
    { title: 'Visitor Log & Gate Pass Summary Report', desc: `${visitors.length} visitors logged` },
    { title: 'Room Complaints & Maintenance Report', desc: `${complaints.length} work orders` },
    { title: 'Hostel Fee Collection Audit Report', desc: `${fees.length} fee records` },
    { title: 'Medical Emergency Audit Report', desc: `${medicalCases.length} infirmary cases` },
    { title: 'Disciplinary Incident Summary Report', desc: `${incidents.length} violation records` },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Reports Export Bar */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Hostel Reports & Residency Analytics Generator</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Generate PDF and Excel reports for Principal audit, RTO/safety compliance, and fee reconciliation.</p>
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
                border: selectedReport === rep.title ? '2px solid #6366F1' : '1px solid var(--border-subtle)',
                background: selectedReport === rep.title ? '#EEF2FF' : 'var(--bg-surface-raised)',
                display: 'flex', flexDirection: 'column', gap: '6px', cursor: 'pointer'
              }}
            >
              <FileText size={18} style={{ color: '#6366F1' }} />
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

      {/* Analytics Charts Visualizations */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Monthly Hostel Occupancy Rate (2026)</h4>
          <div style={{ height: '140px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
            {[
              { m: 'Jan', v: 85 }, { m: 'Feb', v: 88 }, { m: 'Mar', v: 90 },
              { m: 'Apr', v: 78 }, { m: 'May', v: 92 }, { m: 'Jun', v: 95 }, { m: 'Jul', v: 93 }
            ].map((bar, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', height: `${bar.v}%`, background: '#6366F1', borderRadius: '4px 4px 0 0' }} />
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{bar.m}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Block Bed Occupancy Distribution</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#6366F1', fontWeight: 700 }}>● Tagore Senior Boys Block A</span> <span>93% Occupied (168/180 Beds)</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#EC4899', fontWeight: 700 }}>● Sarojini Girls Block B</span> <span>94.6% Occupied (142/150 Beds)</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#F59E0B', fontWeight: 700 }}>● Ramanujan Junior Block C</span> <span>91.6% Occupied (110/120 Beds)</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
