import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  FileSpreadsheet, 
  CheckCircle2, 
  BarChart, 
  Users, 
  Video 
} from 'lucide-react';

interface BottomReportsExportProps {
  onExportPDF: (reportName: string) => void;
  onExportExcel: (reportName: string) => void;
}

export const BottomReportsExport: React.FC<BottomReportsExportProps> = ({
  onExportPDF,
  onExportExcel
}) => {
  const reports = [
    { title: 'Daily Online Class Report', desc: 'Complete breakdown of today\'s 48 scheduled sessions & completion status.' },
    { title: 'Weekly Performance Audit', desc: 'Faculty teaching hours, audio/video telemetry, and student attendance averages.' },
    { title: 'Monthly Attendance Summary', desc: 'Grade-wise and section-wise virtual attendance log for academic compliance.' },
    { title: 'Teacher Utilization Scorecard', desc: 'Lectures delivered per instructor vs max capacity limits.' },
    { title: 'Platform Usage & License Audit', desc: 'Active concurrent licenses used across Google Meet, MS Teams, Zoom, Jitsi.' },
    { title: 'Student Participation Index', desc: 'Chat engagement, mic interaction, and assignment submission rates.' }
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
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid #F1F5F9'
      }}>
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
              Institutional Online Reports & Audits
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Generate comprehensive supervisory PDF/Excel reports for management review and compliance.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => onExportPDF('All Online Reports')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#3B7E5E',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Download size={14} /> Export PDF
          </button>

          <button
            onClick={() => onExportExcel('All Online Reports')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#ECFDF5',
              color: '#047857',
              border: '1px solid #A7F3D0',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <FileSpreadsheet size={14} /> Export Excel
          </button>
        </div>
      </div>

      {/* Grid of Report Cards */}
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
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                {rep.title}
              </h4>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                {rep.desc}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => onExportPDF(rep.title)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  background: 'white',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#1E293B',
                  cursor: 'pointer'
                }}
              >
                <Download size={13} /> PDF
              </button>

              <button
                onClick={() => onExportExcel(rep.title)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  background: 'white',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#1E293B',
                  cursor: 'pointer'
                }}
              >
                <FileSpreadsheet size={13} color="#10B981" /> Excel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
