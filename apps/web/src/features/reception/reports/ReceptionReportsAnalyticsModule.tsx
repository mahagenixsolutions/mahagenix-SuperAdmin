import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileText, TrendingUp, BarChart2 } from 'lucide-react';
import { useReceptionStore } from '../shared/receptionStore';

export default function ReceptionReportsAnalyticsModule() {
  const { enquiries, visitors, appointments, studentRequests, parentTickets, certificates, gatePasses, callLogs, communications, showToast } = useReceptionStore();
  const [selectedReport, setSelectedReport] = useState('Daily Visitor Report');

  const triggerExport = (type: 'PDF' | 'Excel', reportName: string) => {
    showToast(`Exporting "${reportName}" as ${type}... File generated.`);
  };

  const reportsList = [
    { title: 'Daily Visitor Footfall Audit Report', desc: `${visitors.length} Visitors logged today` },
    { title: 'Admission Enquiry Conversion Report', desc: `${enquiries.length} Admission Leads` },
    { title: 'Principal & Faculty Appointment Schedule', desc: `${appointments.length} Scheduled Meetings` },
    { title: 'Phone Call Telephony & Follow-Up Audit', desc: `${callLogs.length} Phone Calls` },
    { title: 'Official Certificate Issuance Audit', desc: `${certificates.length} Certificates generated` },
    { title: 'Gate Pass & Exit Permit Summary Report', desc: `${gatePasses.length} Gate passes` },
    { title: 'Student & Parent Help Desk Ticket Audit', desc: `${studentRequests.length + parentTickets.length} Support tickets` },
    { title: 'Multi-Channel Communication Summary', desc: `${communications.length} Broadcast messages` },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Reports Export Bar */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Reception Footfall & Lead Analytics Generator</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Generate PDF and Excel reports for Principal review, admissions auditing, and security compliance.</p>
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
                border: selectedReport === rep.title ? '2px solid #0284C7' : '1px solid var(--border-subtle)',
                background: selectedReport === rep.title ? '#E0F2FE' : 'var(--bg-surface-raised)',
                display: 'flex', flexDirection: 'column', gap: '6px', cursor: 'pointer'
              }}
            >
              <FileText size={18} style={{ color: '#0284C7' }} />
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{rep.title}</span>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{rep.desc}</span>
              <button
                onClick={(e) => { e.stopPropagation(); triggerExport('PDF', rep.title); }}
                style={{ border: 'none', background: 'transparent', color: '#0284C7', fontSize: '11px', fontWeight: 700, cursor: 'pointer', textAlign: 'left', padding: 0, marginTop: '4px' }}
              >
                Download PDF →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Charts Simulation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Daily Visitor Footfall Trends (July 2026)</h4>
          <div style={{ height: '140px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
            {[
              { m: 'Mon', v: 40 }, { m: 'Tue', v: 65 }, { m: 'Wed', v: 85 },
              { m: 'Thu', v: 70 }, { m: 'Fri', v: 90 }, { m: 'Sat', v: 95 }, { m: 'Sun', v: 20 }
            ].map((bar, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', height: `${bar.v}%`, background: '#0284C7', borderRadius: '4px 4px 0 0' }} />
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{bar.m}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Admission Enquiry Source Distribution</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#0284C7', fontWeight: 700 }}>● Walk-in Enquiries</span> <span>45% (89 Leads)</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#10B981', fontWeight: 700 }}>● Online Website Leads</span> <span>30% (60 Leads)</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#F59E0B', fontWeight: 700 }}>● Phone Enquiries</span> <span>15% (30 Leads)</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#EC4899', fontWeight: 700 }}>● Referral & Word of Mouth</span> <span>10% (20 Leads)</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
