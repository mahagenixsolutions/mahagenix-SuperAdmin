import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileText, TrendingUp, BarChart2, PieChart } from 'lucide-react';
import { useTransportStore } from '../shared/transportStore';

export default function TransportReportsAnalyticsModule() {
  const { buses, trips, fuelLogs, maintenanceLogs, students, incidents, showToast } = useTransportStore();
  const [selectedReport, setSelectedReport] = useState('Fleet Report');

  const triggerExport = (type: 'PDF' | 'Excel', reportName: string) => {
    showToast(`Exporting "${reportName}" as ${type}... File generated.`);
  };

  const reportsList = [
    { title: 'Fleet Utilization & Occupancy Report', desc: `${buses.length} registered vehicles, 92.4% utilization` },
    { title: 'Trip On-Time & Delay Audit Report', desc: `${trips.length} tracked trips` },
    { title: 'Fuel Consumption & Mileage Log Report', desc: `${fuelLogs.length} fuel logs recorded` },
    { title: 'Vehicle Maintenance Expenditure Report', desc: `${maintenanceLogs.length} servicing records` },
    { title: 'Student Transport Allocation Report', desc: `${students.length} students assigned to buses` },
    { title: 'Safety & Incident Audit Report', desc: `${incidents.length} safety alerts tracked` },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Reports Generator Bar */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Transport Fleet Reports & Analytics Generator</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Generate PDF and Excel reports for RTO compliance, Principal audit, and fuel reconciliation.</p>
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
                border: selectedReport === rep.title ? '2px solid #10B981' : '1px solid var(--border-subtle)',
                background: selectedReport === rep.title ? '#DCFCE7' : 'var(--bg-surface-raised)',
                display: 'flex', flexDirection: 'column', gap: '6px', cursor: 'pointer'
              }}
            >
              <FileText size={18} style={{ color: '#10B981' }} />
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{rep.title}</span>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{rep.desc}</span>
              <button
                onClick={(e) => { e.stopPropagation(); triggerExport('PDF', rep.title); }}
                style={{ border: 'none', background: 'transparent', color: '#059669', fontSize: '11px', fontWeight: 700, cursor: 'pointer', textAlign: 'left', padding: 0, marginTop: '4px' }}
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
          <h4 style={{ fontSize: '14px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Monthly Fuel Expenditure (2026)</h4>
          <div style={{ height: '140px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
            {[
              { m: 'Jan', v: 75 }, { m: 'Feb', v: 82 }, { m: 'Mar', v: 90 },
              { m: 'Apr', v: 65 }, { m: 'May', v: 88 }, { m: 'Jun', v: 98 }, { m: 'Jul', v: 105 }
            ].map((bar, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', height: `${bar.v}%`, background: '#10B981', borderRadius: '4px 4px 0 0' }} />
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{bar.m}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Fleet Occupancy Rate by Circuit Route</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#10B981', fontWeight: 700 }}>● North Circuit Express</span> <span>95% Occupancy (38/40 Seats)</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#3B82F6', fontWeight: 700 }}>● South City Commute</span> <span>92% Occupancy (42/45 Seats)</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#F59E0B', fontWeight: 700 }}>● East Campus Line</span> <span>88% Occupancy (32/36 Seats)</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#EC4899', fontWeight: 700 }}>● West Suburban Route</span> <span>In Servicing</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
