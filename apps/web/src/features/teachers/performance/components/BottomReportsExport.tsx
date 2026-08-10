import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, FileSpreadsheet, FileCode } from 'lucide-react';

interface BottomReportsExportProps {
  onExport: (reportName: string, format: 'PDF' | 'Excel' | 'CSV') => void;
}

export const BottomReportsExport: React.FC<BottomReportsExportProps> = ({ onExport }) => {
  const reports = [
    { title: 'Annual Performance Appraisal Dossier (APAR)', desc: 'Official annual performance ratings, scores, and tier breakdown for all 86 faculty members.' },
    { title: 'CBSE / ICSE Faculty Compliance Audit', desc: 'Teacher qualification, workload hours, and syllabus coverage audit report.' },
    { title: 'Classroom Observation & Audit Ledger', desc: 'Pedagogy ratings, student engagement scores, and classroom management logs.' },
    { title: 'Evaluation Speed & Marking SLA Report', desc: 'Department-wise assignment and exam paper evaluation turnaround times.' },
    { title: 'Student & Parent Feedback Summary', desc: 'Aggregated quarterly ratings for clarity, discipline, and doubt resolution.' }
  ];

  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: '#EAF5F0',
            color: '#3B7E5E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileText size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
              Faculty Performance Reports & Institutional Exports
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Generate official PDF, Excel, and CSV supervisory performance reports for board compliance and HR reviews.
            </p>
          </div>
        </div>

        <div style={{ fontSize: '13px', fontWeight: 700, color: '#3B7E5E', background: '#EAF5F0', padding: '6px 14px', borderRadius: '20px' }}>
          CBSE Board Compliance Certified
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px'
      }}>
        {reports.map((rep) => (
          <div
            key={rep.title}
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                {rep.title}
              </h4>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                {rep.desc}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
              <button
                onClick={() => onExport(rep.title, 'PDF')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', background: 'white', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px', fontSize: '11px', fontWeight: 600, color: '#1E293B', cursor: 'pointer' }}
              >
                <Download size={12} /> PDF
              </button>

              <button
                onClick={() => onExport(rep.title, 'Excel')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', background: 'white', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px', fontSize: '11px', fontWeight: 600, color: '#1E293B', cursor: 'pointer' }}
              >
                <FileSpreadsheet size={12} color="#10B981" /> Excel
              </button>

              <button
                onClick={() => onExport(rep.title, 'CSV')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', background: 'white', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '6px', fontSize: '11px', fontWeight: 600, color: '#1E293B', cursor: 'pointer' }}
              >
                <FileCode size={12} color="#3B82F6" /> CSV
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
